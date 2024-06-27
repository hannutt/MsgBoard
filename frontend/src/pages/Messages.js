import { React, useState, useEffect } from "react";
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

    const DoCensor = (id)=>{
        
        setSencored(!censored)
    }
   
       
    
   

    return (

        <div>
            <UsersPresent/>
            <Logout />
            {/*välitetään timedlogout komponentille timedlogout funktio, eli käytetään
            messages komponentissa olevaa funktiota toisesta funktiosta*/}
            <TimedLogout timedLogout={timedLogout}/>
            {/*message komponentin statemuuttujan välitys dropmenu komponentille*/}
            <DropMenu setHideIdAndDate={setHideIdAndDate} hideidAndDate={hideidAndDate} setHoverOff={setHoverOff} hoverOff={hoverOff} />
            <label htmlFor="hoverOff">{lbltext}</label>
            <input id="hoverOff" type="checkbox" onClick={changeHoverStatus} onChange={() => setHoverStatus(!hoverStatus)}></input>


            <div className="msg">

                {/*map metodilla käytään listan alkiot läpi* message on toistomuuttuja samalla
                lailla kuin esim i for loopissa*/}
                {messages.map(message => (
                    //divin classnamea voidaan muuttaa state-muuttujan avulla.
                    <div className={hoverOff} key={message.id}>
                        {/*ikoneita pystyy käyttämään silmukassa*/}

                        <img src={msgIcon} alt="icon"></img>
                        <p hidden={hideidAndDate}>Message id: {message.id}</p>
                        <p className="messageText"hidden={censored}>{message.msgtxt}</p>
                        <p hidden={hideidAndDate} className="msgTime">Posting time: <b>{message.txtposttime}</b></p>
                        <p hidden={hideidAndDate}>Likes: {message.likes}</p>
                        <p hidden={hideidAndDate}>Unlikes: {message.unlike}</p>

                        
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