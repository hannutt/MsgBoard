import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Logout from "../pages/LogOut";
const Add = ()=>{
    //päivämääräolio asetetaan value komennolla automaattisesti
    //input kenttään. readOnly eli ajankohtaa ei pysty muokkaamaan input kentässä.
    
    const banned =['idiot','jerk','moron','pinhead']
    let date = new Date().toLocaleDateString("fi-FI");
    const [message,setMessage]=useState({
        message:'',
        //postdate arvo asetetaan valmiiksi.
        postDate:date

    })
    const [redirectTime,setredirectTime]=useState(3000)
    const [disabledSt,setDisabled]=useState(true)
    const [countChars,setCountChars]=useState(0)
    const [hidePattern,setHidePattern]=useState(false)
    const navigate = useNavigate()

    const random1 = Math.floor(Math.random() * 11)
    const random2 = Math.floor(Math.random() * 11)

    const doMath=()=>{
        const expression = document.getElementById("pattern").innerHTML
        const answer = document.getElementById("res").value
        const result = eval(expression)
        if (result==answer)
            {
                setDisabled(!disabledSt)
                setHidePattern(!hidePattern)
            }
        else{
            setDisabled(true)
        }
       

    }
   
    const backToFrontpage = () =>{
        navigate("/")
    }

   
     //kun syötekentissä tapahtuu muutos e.target.name eli input kentän nimi ja input kenttää
    //syötetty teksti yhdistetään eli message kentän arvo ja teksti jne.
    const handleChange = (e)=>{
        setMessage((prev)=>({...prev,[e.target.name]:e.target.value}))
        //lasketaan syötekentään syötettyjen merkkien määrä
        setCountChars(e.target.value.length)
        console.log(countChars)
    }
    const handleClick = async e =>{
        //estetään default toiminnallisuus eli tässä tapauksessa painikkeen klikkaaminen päivittäisi sivun.
        e.preventDefault();
        try {
            //post kutsun mukana lähetetään message state muuttuja, joka sisältää input kenttien arvot.
            await axios.post("http://localhost:8800/messages",message)
            //navigate siirtää ohjelman etusivulle
            navigate("/")
        } catch(err){
            console.log(err)

        }
    }
    //käydään syötekentän teksti läpi, jos tekstissä on banned listalla olevia
    //sanoja, toteutetaan if lauseen ehto. eli palautetaan vain banned komponentti
    //muussa tapauksessa viestin voi tallentaa.
    const bannedExist=banned.some(item => message.message.toLowerCase().includes(item));
    if (bannedExist) {
        //palsutetaan banned komponentti ja ja navigaten avulla palataan etusivulle 5 sekunin kuluttua
            setTimeout(() => {
              navigate('/messages')
            }, redirectTime)
        
        return(
            //statemuuttujan välitys banned komponentille
            <Banned time={redirectTime}/>
            
            
        )
       

    } else {
        console.log(message)
        return (
            
            <div className="addForm">
                <Logout/>
                <p>Banned words, do not use, the program will check your message automatically</p>
                {/*banned listan läpikäynti ja sanojen tulostus html-elementtiin*/}
                {banned.map(item=>(
                    <li id="bannedWords" className="bannedWords">{item}</li>

                ))}
                
                <h3>Send a new message</h3>
                <p className="count">{countChars}/255</p>
                <input type="text" placeholder="Your message" id="msg" name="message" maxLength={255} onChange={handleChange}></input>
                <br></br><br></br>
                <div className="postDateField">
                <input type="text" readOnly value={date} name="postDate" onChange={handleChange}></input>
                </div>
                <br></br><br></br>
                <div className="math">
                <span id="pattern" hidden={hidePattern}>{random1} + {random2}</span> = <input type="text" size={11} onChange={doMath} id="res"></input>
                 {/*}
                 <button onClick={doMath}>do math</button>*/}
                 </div>
                <div className="saveBtn">
                <button class="btn btn-secondary" disabled={disabledSt} onClick={handleClick} >Save</button><br></br>
                </div>
                <div className="BackToBtn">
                <button class="btn btn-secondary" onClick={backToFrontpage}>Back to frontpage</button>
                </div>
            </div>
        )

    }
  

  
}
const Banned = (props) =>{
    return(
        <div>
            <p>You try to use a Banned words! You will be 
                {/*statemuuttujan jako tuhannella eli millisekunnit sekunneiksi*/}
            automatically redirected to the home page after {props.time/1000} seconds.</p>
        </div>
        
    )
}

export default Add;