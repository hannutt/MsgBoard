import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from 'axios';
import Logout from "../pages/LogOut";
import Popup from 'reactjs-popup';

import 'reactjs-popup/dist/index.css';
import apikey from "../pages/apikey.txt"
//dotenv.config({ path: '../backend/.env' })
const Add = () => {
    var [profanity, setProfanity] = useState(false)
    var [OpenPopup,setOpenPopup]=useState(false)
    var [apk,setApk]=useState('')
    fetch(apikey)
    .then(r => r.text())
    .then(text => {
        setApk(apk=text)
       
    });
    
    
    
   
    //päivämääräolio asetetaan value komennolla automaattisesti
    //input kenttään. readOnly eli ajankohtaa ei pysty muokkaamaan input kentässä.
    let date = new Date().toLocaleDateString("fi-FI");

    const [message, setMessage] = useState({
        message: '',
        //postdate arvo asetetaan valmiiksi.
        postDate: date

    })
    const [redirectTime, setredirectTime] = useState(10000)
    const [disabledSt, setDisabled] = useState(true)
    const [countChars, setCountChars] = useState(0)
    const [hidePattern, setHidePattern] = useState(false)
  
    const navigate = useNavigate()
    const location = useLocation()
    //haetaaan osoitekentässä näkyvä käyttäjänimi katkaisemalla merkkijono / merkistä eli
    //localhost:8800/profile/user osoitteesta talletetaan viimeinen alkio eli user tähän
    //muuttujaan.
    const userName = location.pathname.split("/")[2]

  

    const backToFrontpage = () => {
        navigate("/")
    }

    const wordCheck = () => {
        
        var text = document.getElementById("msg").value
        let options = {
            method: 'GET',
            headers: { 'x-api-key': apk }
        }

        let url = `https://api.api-ninjas.com/v1/profanityfilter?text=${text}`
        fetch(url, options)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
                setProfanity(profanity = data.has_profanity)
              
            })
            .catch(err => {
                console.log(`error ${err}`)
            });

    }


    //kun syötekentissä tapahtuu muutos e.target.name eli input kentän nimi ja input kenttää
    //syötetty teksti yhdistetään eli message kentän arvo ja teksti jne.
    const handleChange = (e) => {
        setMessage((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        //lasketaan syötekentään syötettyjen merkkien määrä
        setCountChars(e.target.value.length)
        console.log(countChars)
    }
    const Modal = () => (
        <Popup open={OpenPopup} position={"top left"} modal>
            
            <div className="header">WARNING</div>
          <div className="content">You use swear words in your message.</div>
          
        </Popup>
      );
    const handleClick = async e => {

        //estetään default toiminnallisuus eli tässä tapauksessa painikkeen klikkaaminen päivittäisi sivun.
        e.preventDefault();
        try {
            //post kutsun mukana lähetetään message state muuttuja, joka sisältää input kenttien arvot.
            await axios.post("http://localhost:8800/messages", message)
            //navigate siirtää ohjelman etusivulle
            navigate("/messages")
        } catch (err) {
            console.log(err)

        }
    }
    if (profanity) {
        setOpenPopup(OpenPopup=true)
        setProfanity(!profanity)
      


    } else {
        console.log(message)
    }
    return (
        <div className="addForm">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#"><Link to="/messages">Messages</Link></a></li>
                    <li class="breadcrumb-item"><a href="#"><Link to="/Add">Add</Link></a></li>
                </ol>
            </nav>
            <Logout />
          

            <center>
            <h3>Send a new message as {userName}</h3>
            </center>

            <center>
            <div class="mb-3 w-25">
               
                
                <input type="text" id="postDate" readOnly value={date} name="postDate" size={11} onChange={handleChange}></input>
                <hr></hr>
                <textarea class="form-control" placeholder="Your message" id="msg" name="message" rows={3} maxLength={255} onChange={handleChange} onBlur={wordCheck}></textarea>
                <hr></hr>

                <button class="btn btn-secondary" onClick={handleClick} >Save message</button><br></br>
                <p> Message length: {countChars}</p>
                {OpenPopup&&<Modal/>}
            </div>
            </center>
            <br></br>



        </div>
    )
  

}






export default Add;