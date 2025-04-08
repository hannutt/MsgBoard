import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from 'axios';
import Logout from "../pages/LogOut";
const Add = () => {
    var [profanity, setProfanity] = useState()
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
    const [random1, setRandom1] = useState(0)
    const [random2, setRandom2] = useState(0)
    const navigate = useNavigate()
    const location = useLocation()
    //haetaaan osoitekentässä näkyvä käyttäjänimi katkaisemalla merkkijono / merkistä eli
    //localhost:8800/profile/user osoitteesta talletetaan viimeinen alkio eli user tähän
    //muuttujaan.
    const userName = location.pathname.split("/")[2]

    const randNums = () => {
        setRandom1(Math.floor(Math.random() * 11))
        setRandom2(Math.floor(Math.random() * 11))


    }


    const doMath = () => {
        const expression = document.getElementById("pattern").innerHTML
        const answer = document.getElementById("res").value
        const result = eval(expression)
        if (result == answer) {
            setDisabled(!disabledSt)
            setHidePattern(!hidePattern)
        }
        else {
            setDisabled(true)
        }


    }

    const backToFrontpage = () => {
        navigate("/")
    }

    const wordCheck = () => {
        var text = document.getElementById("msg").value
        let options = {
            method: 'GET',
            headers: { 'x-api-key': `${process.env.REACT_APP_apk}`}
        }

        let url = `https://api.api-ninjas.com/v1/profanityfilter?text=${text}`
        fetch(url, options)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
                setProfanity(profanity = data.has_profanity)
                console.log(profanity)
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
        //palsutetaan banned komponentti ja ja navigaten avulla palataan etusivulle 5 sekunin kuluttua
        setTimeout(() => {
            navigate('/messages')
        }, redirectTime)

        return (
            //statemuuttujan välitys banned komponentille
            <Banned time={redirectTime} />


        )


    } else {
        console.log(message)
        return (
            <div className="addForm">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#"><Link to="/messages">Messages</Link></a></li>
                        <li class="breadcrumb-item"><a href="#"><Link to="/Add">Add</Link></a></li>
                    </ol>
                </nav>
                <Logout />

                <h3>Send a new message as {userName}</h3>

                <div class="mb-3">
                    <label for="postDate" class="form-label">Message sent date: </label>
                    <input type="text" id="postDate"   readOnly value={date} name="postDate" size={11} onChange={handleChange}></input>
                    <hr></hr>
                    <textarea class="form-control" placeholder="Your message" id="msg" name="message" maxLength={255} onChange={handleChange} onBlur={wordCheck}></textarea>
                    <hr></hr>
                    
                    <button class="btn btn-secondary" onClick={handleClick} >Save message</button><br></br>
                    <p> Message length:{countChars}/255</p>
                </div>
                <br></br>
                


            </div>
        )

    }



}
const Banned = (props) => {
    return (
    

        
        <div className="banned">
            
            <h2 >You try to use a Banned words! You will be
                {/*statemuuttujan jako tuhannella eli millisekunnit sekunneiksi*/}
                automatically redirected to the home page after {props.time / 1000} seconds.</h2>
                
                </div>
            
        

    )
}

export default Add;