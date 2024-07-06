import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import msgIcon from "../icons/messenger.png"
import likeIcon from "../icons/like.png";
import binIcon from "../icons/bin.png";
import reset from "../icons/reset.png"
import { Link } from "react-router-dom";
import unlikeIcon from "../icons/unlike.png"
import Logout from "../pages/LogOut";
import DropMenu from "./Dropdown";
import updateIcon from "../icons/update.png"
import TimedLogout from "./TimedLogout";
import alertIcon from "../icons/alert.png";
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
    const [timedLogOff, setTimedLogOff] = useState(false)
    const [alignText, setAlingText] = useState("message")
    const [censored, setSencored] = useState(false)
    const [showInCards, setShowInCards] = useState(false)
    const [hideMsgDiv, setHideMsgDiv] = useState(false)
    const [stars, setStars] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [hideTopPage,setHideTopPage]=useState(true)
    var first="";

    let date = new Date().toLocaleDateString("fi-FI");
    var repDateNow=date.replace(".","/").replace(".","/")
    var dateDiff;
    var finalDiff;
    
    
  

    const navigate = useNavigate()
    
    
    const monitoreScroll=()=>{
        //jos ikkunaa on skrollattu y-suunassa yli 200 pikseliä muutetan staten arvoa
        //eli tässä näytetään button elementti.
        if (window.scrollY>200)
            {
                setHideTopPage(false)
            }
        else{
            setHideTopPage(true)
        }
           
    }
    //kutsutaan monitorescroll funktiota 0,1 sekunnin välein että buttonin näyttö
    //ja piilotus toimii ylläolevan ehdon mukaan
    window.setInterval(monitoreScroll,100)


    //timevar parametri saadan timedlogout komponentista
    const timedLogout = (timevar) => {
        console.log("selected " + timevar)
        setTimeout(() => {
            navigate("/")
            //aika annetaan millisekunteina, joten sekuntiarvo täytyy kertoa tuhannella
        }, timevar * 1000);


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



    const handleDelete = async (id, txt) => {
        //vahvistusikkuna
        var text = "This will delete a message with ID " + id + "and text " + txt + " are you sure?"
        window.confirm(text)
        if (window.confirm() == true) {
            try {
                await axios.delete("http://localhost:8800/messages/" + id)
                window.location.reload();

            } catch (err) {

                console.log(err)


            }

        }








    }

    //funktio saa parametrina klikatun viestin id:n. p-tagi, jossa teksti näytetään on nimetty m+id
    //yhdistelmällä. näin saadaan ainoastaan valitun viestin tekstiosio piiloon vaihtamassa luokka
    //m+id:stä censored luokkaan.
    const DoCensor = (id) => {
        setSencored(!censored)
        if (censored) {

            document.getElementById("m" + id).setAttribute("class", "censored")
            document.getElementById("c" + id).innerHTML = "CENSORED"


        }
        else {
            document.getElementById("m" + id).setAttribute("class", "notCensored")
            document.getElementById("c" + id).innerHTML = ""
        }
    }
    //tämä funktio vaihtaa viestien esitystapaa divin ja BS5 korttien välillä.
    const changeViews = () => {
        setHideMsgDiv(!hideMsgDiv)
        setShowInCards(!showInCards)

    }

    var clicks = 0
    //star-rating funktio, joka muuttaa tähden värin mustasta punaiseen
    //clicks muuttujana avulla siirrytyään star1->eteenpäin ja id:n avulla
    //päivitetään aina yhden viestiosion arvostelua.
    const rate = (id) => {

        clicks += 1

        document.getElementById("star" + clicks + id).setAttribute("class", "fa fa-star checked")

        if (clicks == 5) {
            clicks = 0
        }


    }

    //tähtien resetointi
    const resetStars = (id) => {
        console.log(id)

        document.getElementById("star1" + id).setAttribute("class", "fa fa-star")
        document.getElementById("star2" + id).setAttribute("class", "fa fa-star")
        document.getElementById("star3" + id).setAttribute("class", "fa fa-star")
        document.getElementById("star4" + id).setAttribute("class", "fa fa-star")
        document.getElementById("star5" + id).setAttribute("class", "fa fa-star")
    }

    const starsSelected = () => {
        setStars(!stars)


    }

    const endOfPage = () => {
        const scrollingElement = (document.scrollingElement || document.body);
        scrollingElement.scrollTop = scrollingElement.scrollHeight;

    }

    const startOfPage=()=>{
        const scrollingElement = (document.scrollingElement || document.body);
        scrollingElement.scrollTop = 0;
        
    }
    return (

        <div className="firstMsgDiv" ononline={monitoreScroll} >
            <UsersPresent />
            <Logout />
            {/*välitetään timedlogout komponentille timedlogout funktio, eli käytetään
            messages komponentissa olevaa funktiota toisesta funktiosta*/}
            <TimedLogout timedLogout={timedLogout} />
            {/*message komponentin statemuuttujan välitys dropmenu komponentille*/}
            <DropMenu setHideIdAndDate={setHideIdAndDate} hideidAndDate={hideidAndDate} setHoverOff={setHoverOff} hoverOff={hoverOff} endOfPage={endOfPage} />
            <span className="changeCB">
                <label htmlFor="hoverOff" className="hoverOff">{lbltext}</label>
                <input id="hoverOff" type="checkbox" onClick={changeHoverStatus} onChange={() => setHoverStatus(!hoverStatus)}></input><br></br>
                <label className="bscardslbl" htmlFor="bscards">Show messages in Bootstrap cards</label>
                <input id="bscards" type="checkbox" onChange={changeViews}></input>
            </span>
            <span className="topOfPage">
            <button hidden={hideTopPage} class="btn btn-info" onClick={startOfPage}>Top of the page</button>
            </span>



            {showInCards && <MessageCards messages={messages} msgIcon={msgIcon} />}


            <div className="msg" hidden={hideMsgDiv}>

                {/*map metodilla käytään listan alkiot läpi* message on toistomuuttuja samalla
                lailla kuin esim i for loopissa*/}
                {messages.map(message => (
                    //divin classnamea voidaan muuttaa state-muuttujan avulla.
                    <div className={hoverOff} key={message.id} onMouseEnter={() => starsSelected(message.id)} >
                       {/*talletetaan msgtxt:n ensimmäinen kirjain muuttujaan*/}
                        <p hidden>{first=message.msgtxt[0]}</p>
                         {/*ikoneita pystyy käyttämään silmukassa*/}
                        <img src={msgIcon} alt="icon"></img>
                        <p hidden={hideidAndDate}>Message id: {message.id}</p>
                        <p id={"c" + message.id}></p>
                        {/*jokaisen viestin ensimmäinen kirjain first-muuttujassa ja kirjain näytetään 200% suurempana kuin muut replacella korvataan
                        ensimmäinen kirjain tyhjällä koska muuten eka kirjain näytettäisiin kahdesti*/}
                        <p id={"m" + message.id} className={"m" + message.id}><p className="firstletter">{first}</p>{message.msgtxt.replace(first,"")}</p>
                        <p hidden={hideidAndDate} className="msgTime">Posting time: <b>{message.txtposttime}</b></p>
                        <p hidden={hideidAndDate}>Likes: {message.likes}</p>
                        <p hidden={hideidAndDate}>Unlikes: {message.unlike}</p>
                        <p>Characters: {message.msgtxt.length}</p>
                        {/*dd-mm-yyy formaatti saadaan vaihtamalla split komennolla / merkin jälkeisiä merkkijonoja
                        tässä lasketaan montako päivää viestin postauksesta on kulunut repDatenow on aina meneillään
                        oleva päivä message.txtpostime on silmukassa vaihtuva postauspäivä*/}
                        <p hidden > {dateDiff=new Date(repDateNow.split('/')[2], repDateNow.split('/')[1] - 1, repDateNow.split('/')[0]).getTime() - new Date(message.txtposttime.split('.')[2], message.txtposttime.split('.')[1] - 1, message.txtposttime.split('.')[0]).getTime()}
                        {finalDiff = Math.round (dateDiff / (1000 * 3600 * 24))}</p>
                        <p>Posted: {finalDiff} days ago</p>
                       
                        




                        {/*yksilöidään span elementit message.id:n avulla että voidaan päivittää
                       aina vain halutun viestin ratingia*/}
                        <span id={"star1" + message.id} class="fa fa-star" onClick={() => rate(message.id)} ></span>
                        <span id={"star2" + message.id} class="fa fa-star" onClick={() => rate(message.id)} ></span>
                        <span id={"star3" + message.id} class="fa fa-star" onClick={() => rate(message.id)} ></span>
                        <span id={"star4" + message.id} class="fa fa-star" onClick={() => rate(message.id)} ></span>
                        <span id={"star5" + message.id} class="fa fa-star" onClick={() => rate(message.id)} ></span>



                        <div className="crudBtns">
                            {/*lähetetään postauksen id numero handleDelete fuktiolle*/}
                            <button disabled={props.delBtnDisable} onClick={() => handleDelete(message.id, message.msgtxt)}>
                                <img className="alarm" src={alertIcon} ></img>
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
                            <button className="censor" onClick={() => DoCensor(message.id)}>
                                <img src={censor}></img>
                            </button>
                            <button onClick={() => resetStars(message.id)}><img src={reset}></img></button>
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