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
import Popup from 'reactjs-popup';
import sentiment from "../icons/sentiment.png"
import apikey from "../pages/apikey.txt"
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
    const [hideTopPage, setHideTopPage] = useState(true)
    var [showModal, setShowModal] = useState(false)
    var [modalText, setModalText] = useState('')
    var [msgID, setMsgID] = useState(0)
    var [okDisabled, setOkDisabled] = useState(false)
    var [apk, setApk] = useState('')
    var first = "";

    let date = new Date().toLocaleDateString("fi-FI");
    var repDateNow = date.replace(".", "/").replace(".", "/")
    var dateDiff;
    var finalDiff;
    fetch(apikey)
        .then(r => r.text())
        .then(text => {
            setApk(apk = text)

        });




    const navigate = useNavigate()


    const monitoreScroll = () => {
        //jos ikkunaa on skrollattu y-suunassa yli 200 pikseliä muutetan staten arvoa
        //eli tässä näytetään button elementti.
        if (window.scrollY > 300) {
            setHideTopPage(false)
        }
        else {
            setHideTopPage(true)
        }

    }
    //kutsutaan monitorescroll funktiota 0,1 sekunnin välein että buttonin näyttö
    //ja piilotus toimii ylläolevan ehdon mukaan
    window.setInterval(monitoreScroll, 100)


    //timevar parametri saadan timedlogout komponentista
    const timedLogout = (timevar) => {
        console.log("selected " + timevar)
        setTimeout(() => {
            navigate("/")
            //aika annetaan millisekunteina, joten sekuntiarvo täytyy kertoa tuhannella
        }, timevar * 1000);


    }
    const Modal = () => (
        <Popup open={showModal} position={"top left"} modal>

            <div className="header">WARNING</div>
            <div className="content">{modalText}
                <br></br>
                <button disabled={okDisabled} onClick={actualDelete}>OK</button>
                <button onClick={() => setShowModal(!showModal)}>Close</button>
            </div>

        </Popup>
    );
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
        console.log(id)
        try {
            await axios.put("http://localhost:8800/unlike/" + id)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }



    const handleDelete = async (id, txt, written) => {

        var user = localStorage.getItem("present")
        if (user === written) {
            setModalText(modalText = "This will delete a message with ID " + id + "and text " + txt + " are you sure?")
            setShowModal(showModal = true)
            setMsgID(msgID = id)
        }
        else {
            setModalText(modalText = 'You are trying to delete a message written by another user. You can only delete messages that you have written yourself.')
            setShowModal(showModal = true)
            setOkDisabled(okDisabled = true)


        }


    }
    const actualDelete = async () => {
        try {
            await axios.delete("http://localhost:8800/messages/" + msgID)
            window.location.reload();

        } catch (err) {

            console.log(err)
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

    const startOfPage = () => {
        const scrollingElement = (document.scrollingElement || document.body);
        scrollingElement.scrollTop = 0;

    }
    const sentimentAnalys = (id) => {
        var text = document.getElementById("m" + id).innerText
        let options = {
            method: 'GET',
            headers: { 'x-api-key': apk }
        }

        let url = `https://api.api-ninjas.com/v1/sentiment?text=${text}`
        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                document.getElementById("analysResult" + id).innerText = "Sentiment analysis: " + data.sentiment

            })
            .catch(err => {
                console.log(`error ${err}`)
            });

    }


    return (

        <div className="firstMsgDiv" ononline={monitoreScroll} >
            <h2 className='title'>Message Board</h2>
            <UsersPresent />
            <p className="title">Total messages: {messages.length}</p>
            <Logout />
            {/*välitetään timedlogout komponentille timedlogout funktio, eli käytetään
            messages komponentissa olevaa funktiota toisesta funktiosta*/}
            <TimedLogout timedLogout={timedLogout} />
            {/*message komponentin statemuuttujan välitys dropmenu komponentille*/}
            <span className="dropMenu">
                <DropMenu setHideIdAndDate={setHideIdAndDate} hideidAndDate={hideidAndDate} setHoverOff={setHoverOff} hoverOff={hoverOff} endOfPage={endOfPage} />
                {showModal && <Modal />}

                <div class="form-check">
                    <input class="form-check-input" value="" id="hoverOff" type="checkbox" onClick={changeHoverStatus} onChange={() => setHoverStatus(!hoverStatus)}></input>
                    <label class="form-check-label" for="hoverOff">{lbltext}</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="bscards" onChange={changeViews} ></input>
                    <label class="form-check-label" for="bscards">Show messages in Bootstrap cards</label>
                </div>
            </span>



            <span className="topOfPage">
                <button hidden={hideTopPage} class="btn btn-info" onClick={startOfPage}>Top of the page</button>
            </span>



            {showInCards && <MessageCards messages={messages} msgIcon={msgIcon} handleLike={handleLike} likeIcon={likeIcon} handleDelete={handleDelete} alertIcon={alertIcon} handleUnLike={handleUnLike} unlikeIcon={unlikeIcon} updateIcon={updateIcon} DoCensor={DoCensor} censor={censor} />}


            <div className="msg" hidden={hideMsgDiv}>

                {/*map metodilla käytään listan alkiot läpi* message on toistomuuttuja samalla
                lailla kuin esim i for loopissa*/}
                {messages.map(message => (
                    //divin classnamea voidaan muuttaa state-muuttujan avulla.
                    <div className={hoverOff} key={message.id} onMouseEnter={() => starsSelected(message.id)} >
                        {/*talletetaan msgtxt:n ensimmäinen kirjain muuttujaan*/}
                        <p hidden>{first = message.msgtxt[0]}</p>
                        {/*ikoneita pystyy käyttämään silmukassa*/}
                        <img src={msgIcon} alt="icon"></img>
                        <p hidden={hideidAndDate}>id: {message.id}</p>
                        <p id={"c" + message.id}></p>
                        {/*jokaisen viestin ensimmäinen kirjain first-muuttujassa ja kirjain näytetään 200% suurempana kuin muut replacella korvataan
                        ensimmäinen kirjain tyhjällä koska muuten eka kirjain näytettäisiin kahdesti*/}
                        <p id={"m" + message.id} className={"m" + message.id}><p className="firstletter">{first}</p>{message.msgtxt.replace(first, "")}</p>
                        <p hidden={hideidAndDate} className="msgTime">Posting time: <b>{message.txtposttime}</b></p>
                        {/*dd-mm-yyy formaatti saadaan vaihtamalla split komennolla / merkin jälkeisiä merkkijonoja
                        tässä lasketaan montako päivää viestin postauksesta on kulunut repDatenow on aina meneillään
                        oleva päivä message.txtpostime on silmukassa vaihtuva postauspäivä*/}
                        <p hidden > {dateDiff = new Date(repDateNow.split('/')[2], repDateNow.split('/')[1] - 1, repDateNow.split('/')[0]).getTime() - new Date(message.txtposttime.split('.')[2], message.txtposttime.split('.')[1] - 1, message.txtposttime.split('.')[0]).getTime()}
                            {finalDiff = Math.round(dateDiff / (1000 * 3600 * 24))}</p>
                        <p className="posted"> | {finalDiff} days ago</p>
                        <br></br><br></br>
                        <p>Message was written by: <b><span id={"written" + message.id}>{message.username}</span></b></p>

                        <div class="w3-hidden w3-round">
                            <div class="w3-container w3-green w3-round" style={{width:message.likes+"%"}}><span className="likes">Likes:{message.likes}</span></div>
                        </div>
                        <br></br>
                        <div class="w3-hidden w3-round">
                            <div class="w3-container w3-red w3-round" style={{width:message.unlike+"%"}}><span className="unlikes">Unlikes:{message.unlike}</span></div>
                        </div>
                       
                      
                        <br></br><br></br>
                        <div className="chars">Characters in the message: {message.msgtxt.length}</div>
                       


                        <p id={"analysResult" + message.id}></p>

                        {/*yksilöidään span elementit message.id:n avulla että voidaan päivittää
                       aina vain halutun viestin ratingia*/}
                        < span id={"star1" + message.id} class="fa fa-star" onClick={() => rate(message.id)} ></span>
                        <span id={"star2" + message.id} class="fa fa-star" onClick={() => rate(message.id)} ></span>
                        <span id={"star3" + message.id} class="fa fa-star" onClick={() => rate(message.id)} ></span>
                        <span id={"star4" + message.id} class="fa fa-star" onClick={() => rate(message.id)} ></span>
                        <span id={"star5" + message.id} class="fa fa-star" onClick={() => rate(message.id)} ></span>

                        <div class="accordion accordion-flush" id={"accordionFlushExample" + message.id}>
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" style={{ backgroundColor: "#8eb3ed", height: 20 + "px", border: 1 + "px solid black" }} type="button" data-bs-toggle="collapse" data-bs-target={"#flush-collapse" + message.id} aria-expanded="false" aria-controls="flush-collapseOne">
                                        Function buttons |
                                    </button>
                                </h2>

                                <div id={"flush-collapse" + message.id} class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body" style={{ backgroundColor: "#8eb3ed" }}>
                                        <span className="crudBtns">
                                            <button class="btn btn-danger btn-sm" disabled={props.delBtnDisable} onClick={() => handleDelete(message.id, message.msgtxt, document.getElementById("written" + message.id).innerText)}>
                                                <img className="alarm" src={alertIcon} ></img>
                                                <img src={binIcon} alt="remove icon"></img>
                                            </button>
                                            <button class="btn btn-primary btn-sm" onClick={() => handleLike(message.id)}>

                                                <img src={likeIcon} alt="like icon"></img>
                                            </button>
                                            <button class="btn btn-primary btn-sm" onClick={() => handleUnLike(message.id)}>
                                                <img src={unlikeIcon}></img>
                                            </button>
                                            <button class="btn btn-primary btn-sm">

                                                <Link to={`/update/${message.id}`}><img src={updateIcon}></img></Link>
                                            </button>
                                            <button class="btn btn-warning btn-sm" onClick={() => DoCensor(message.id)}>
                                                <img src={censor}></img>
                                            </button>
                                            <button class="btn btn-primary btn-sm" onClick={() => resetStars(message.id)}><img src={reset}></img></button>

                                            <button class="btn btn-info btn-sm" onClick={() => sentimentAnalys(message.id)}><img src={sentiment}></img></button>
                                        </span>
                                    </div>

                                </div>

                            </div>


                            {/*
                            <div className="crudBtns">
                                lähetetään postauksen id numero handleDelete fuktiolle
                                <button class="btn btn-danger btn-sm" disabled={props.delBtnDisable} onClick={() => handleDelete(message.id, message.msgtxt)}>
                                    <img className="alarm" src={alertIcon} ></img>
                                    <img src={binIcon} alt="remove icon"></img>
                                </button>
                                <button class="btn btn-primary btn-sm" onClick={() => handleLike(message.id)}>
                                    png kuvan sisällytys button elementtiin.
                                    <img src={likeIcon} alt="like icon"></img>
                                </button>

                                <button class="btn btn-primary btn-sm" onClick={() => handleUnLike(message.id)}>
                                    <img src={unlikeIcon}></img>
                                </button>
                                <button class="btn btn-primary btn-sm">
                          
                                    <Link to={`/update/${message.id}`}><img src={updateIcon}></img></Link>
                                </button>
                                <button class="btn btn-warning btn-sm" onClick={() => DoCensor(message.id)}>
                                    <img src={censor}></img>
                                </button>
                                <button class="btn btn-primary btn-sm" onClick={() => resetStars(message.id)}><img src={reset}></img></button>

                                <button class="btn btn-info btn-sm" onClick={() => sentimentAnalys(message.id)}><img src={sentiment}></img></button>
                            </div> */}

                        </div>
                    </div>


                ))
                }
            </div >




        </div >
    )

}
export default Messages;