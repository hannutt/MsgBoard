import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import msgIcon from "../icons/messenger.png"
import likeIcon from "../icons/like.png";
import binIcon from "../icons/bin.png";
import { Link } from "react-router-dom";
import unlikeIcon from "../icons/unlike.png"
import Logout from "../pages/LogOut";
import DropMenu from "./Dropdown";
import updateIcon from "../icons/update.png"
import TimedLogout from "./TimedLogout";
import alert from "../icons/alert.png";
import UsersPresent from "./usersPresent";
import censor from "../icons/censor.png";
import MessageCards from "./MessageCards"

const Messages = (props) => {

    //tähän statemuuttuja listaan talletetaan kannasta haettu data
    const [messages, setMessages] = useState([])
    const [hoverOff, setHoverOff] = useState('message')
    const [lbltext, setLblText] = useState('Disable hover effect')
    const [hoverStatus, setHoverStatus] = useState(true)
    const [hideidAndDate, setHideIdAndDate] = useState(false)
    const [timedLogOff,setTimedLogOff] = useState(false)
    const [alignText,setAlingText]=useState("message")
    const [censored,setSencored]=useState(false)
    const [showInCards,setShowInCards]=useState(false)
    const [hideMsgDiv,setHideMsgDiv]=useState(false)
    const [msgId,setMsgid]=useState(0)
    const previousId=useRef()
    const navigate = useNavigate()
   

 
    
    //timevar parametri saadan timedlogout komponentista
    const timedLogout = (timevar) =>{
        console.log("selected "+timevar)
        setTimeout(() => {
            navigate("/")
            //aika annetaan millisekunteina, joten sekuntiarvo täytyy kertoa tuhannella
          }, timevar*1000);
           
            
    }
     //tämä funktio vaihtaa divin tyylimäärittelyä.
    const changeHoverStatus = () => {

        console.log(hoverStatus)

        if (hoverStatus) {
            setHoverOff("messageNoHover")
            setLblText("Enable hover effect")
        }
        else {
            setHoverOff("message")
            setLblText("Disable hover effect")
        }
    }

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                //axios get kutsu suluissa oleva endpoint on index.js tiedostossa määritelty
                const res = await axios.get("http://localhost:8800/messages")
                console.log(res)
                //res.data talletetaan statemuuttujaan.
                setMessages(res.data)

            } catch (err) {
                console.log(err)

            }
        }
        //funktiokutsu
        fetchAllData()
    }, [])

    const handleLike = async (id) => {
        try {
            await axios.put("http://localhost:8800/like/" + id)
            //sivun uudelleen lataus
            window.location.reload()

        } catch (err) {
            console.log(err)

        }
    }



    const handleUnLike = async (id) => {
        try {
            await axios.put("http://localhost:8800/unlike/" + id)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8800/messages/" + id)
            window.location.reload();

        } catch (err) {
            console.log(err)

        }

    }

    //funktio saa parametrina klikatun viestin id:n. p-tagi, jossa teksti näytetään on nimetty m+id
    //yhdistelmällä. näin saadaan ainoastaan valitun viestin tekstiosio piiloon vaihtamassa luokka
    //m+id:stä censored luokkaan.
    const DoCensor = (id)=>{
        setSencored(!censored)
        if (censored)
            {
                
                document.getElementById("m"+id).setAttribute("class","censored")
                document.getElementById("c"+id).innerHTML="CENSORED"
               

            }
        else {
            document.getElementById("m"+id).setAttribute("class","notCensored")
            document.getElementById("c"+id).innerHTML=""
        }
    }
    //tämä funktio vaihtaa viestien esitystapaa divin ja BS5 korttien välillä.
    const changeViews=()=>{
        setHideMsgDiv(!hideMsgDiv)
        setShowInCards(!showInCards)

    }

    var clicks = 0
    //star-rating funktio, joka muuttaa tähden värin mustasta punaiseen
    //clicks muuttujana avulla siirrytyään star1->eteenpäin ja id:n avulla
    //päivitetään aina yhden viestiosion arvostelua.
    const rate = (id)=>{
        console.log("message selected ",id)
        clicks+=1
       
        document.getElementById("star"+clicks+id).setAttribute("class","fa fa-star checked")
        if (clicks==5)
            {
                clicks=0
            }    
       
        }

        const mouseChange=(id)=>{
            setMsgid(id)
            console.log(msgId)

        }

       
    
   

    return (

        <div className="firstMsgDiv" >
             
            <UsersPresent/>
            <Logout />
            
            {/*välitetään timedlogout komponentille timedlogout funktio, eli käytetään
            messages komponentissa olevaa funktiota toisesta funktiosta*/}
            <TimedLogout timedLogout={timedLogout}/>
            {/*message komponentin statemuuttujan välitys dropmenu komponentille*/}
            <DropMenu setHideIdAndDate={setHideIdAndDate} hideidAndDate={hideidAndDate} setHoverOff={setHoverOff} hoverOff={hoverOff} />
            <label htmlFor="hoverOff">{lbltext}</label>
            <input id="hoverOff" type="checkbox" onClick={changeHoverStatus} onChange={() => setHoverStatus(!hoverStatus)}></input><br></br>
            <label htmlFor="bscards">Show messages in Bootstrap cards</label>
            <input id="bscards" type="checkbox" onChange={changeViews}></input>

            {showInCards && <MessageCards messages={messages} msgIcon={msgIcon}/>}


            <div className="msg" hidden={hideMsgDiv}>

                {/*map metodilla käytään listan alkiot läpi* message on toistomuuttuja samalla
                lailla kuin esim i for loopissa*/}
                {messages.map(message => (
                    //divin classnamea voidaan muuttaa state-muuttujan avulla.
                    <div className={hoverOff} key={message.id} onMouseEnter={()=>mouseChange(message.id)} >
                        {/*ikoneita pystyy käyttämään silmukassa*/}

                        <img src={msgIcon} alt="icon"></img>
                        <p hidden={hideidAndDate}>Message id: {message.id}</p>
                        <p id={"c"+message.id}></p>
                        <p id={"m"+message.id} className={"m"+message.id}>{message.msgtxt}</p>
                        <p hidden={hideidAndDate} className="msgTime">Posting time: <b>{message.txtposttime}</b></p>
                        <p hidden={hideidAndDate}>Likes: {message.likes}</p>
                        <p hidden={hideidAndDate}>Unlikes: {message.unlike}</p>
                       {/*yksilöidään span elementit message.id:n avulla että voidaan päivittää
                       aina vain halutun viestin ratingia*/}
                        <span id={"star1"+message.id} class="fa fa-star" onClick={()=>rate(message.id)} ></span>
                        <span id={"star2"+message.id} class="fa fa-star" onClick={()=>rate(message.id)} ></span>
                        <span id={"star3"+message.id} class="fa fa-star" onClick={()=>rate(message.id)} ></span>
                        <span id={"star4"+message.id} class="fa fa-star" onClick={()=>rate(message.id)} ></span>
                        <span id={"star5"+message.id} class="fa fa-star" onClick={()=>rate(message.id)} ></span>
                       

                        
                        <div className="crudBtns">
                            {/*lähetetään postauksen id numero handleDelete fuktiolle*/}
                            <button disabled={props.delBtnDisable} onClick={() => handleDelete(message.id)}>
                            <img className="alarm" src={alert} ></img>
                               <img src={binIcon} alt="remove icon"></img>
                            </button>
                            <button onClick={() => handleLike(message.id)}>
                                {/*png kuvan sisällytys button elementtiin.*/}
                                <img src={likeIcon} alt="like icon"></img>
                            </button>
                           
                            <button className="delbtn" onClick={() => handleUnLike(message.id)}>
                                <img src={unlikeIcon}></img>
                            </button>
                            <button className="updateBtn">
                                {/*huomaa ikonia käyttäessä, että img tagin täytyy olla link tagin
                            sisällä, että linkitys toimii klikattaessa*/}
                                <Link to={`/update/${message.id}`}><img src={updateIcon}></img></Link>
                            </button>
                            <button className="censor" onClick={()=>DoCensor(message.id)}>
                                <img src={censor}></img>
                            </button>
                        </div>

                    </div>


                ))}
             


                {/*viestien kokonaismäärä näytetään map silmukan ulkopuolella, muuten se tulostuisi
                jokaisen viestin yhteydessä erikseen*/}
                <p className="msgTotal">Total messages: {messages.length}</p>
            </div>



        </div>
    )

}
export default Messages;