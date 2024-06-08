import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Logout from "../pages/LogOut";
const Add = ()=>{
    //päivämääräolio asetetaan value komennolla automaattisesti
    //input kenttään. readOnly eli ajankohtaa ei pysty muokkaamaan input kentässä.
    
    const banned =['idiot','jerk','moron']
    let date = new Date().toLocaleDateString("fi-FI");
    const [message,setMessage]=useState({
        message:'',
        //postdate arvo asetetaan valmiiksi.
        postDate:date

    })
    const [redirectTime,setredirectTime]=useState(3000)
    const [disabledSt,setDisabled]=useState(false)
    const navigate = useNavigate()
   
    const backToFrontpage = () =>{
        navigate("/")
    }
     //kun syötekentissä tapahtuu muutos e.target.name eli input kentän nimi ja input kenttää
    //syötetty teksti yhdistetään eli message kentän arvo ja teksti jne.
    const handleChange = (e)=>{
        setMessage((prev)=>({...prev,[e.target.name]:e.target.value}))
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
              navigate('/')
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
                    <p id="bannedWords" className="bannedWords">{item}</p>

                ))}
                
                <h3>Send a new message</h3>
              
                <input type="text" placeholder="Your message" id="msg" name="message" onChange={handleChange}></input>
                <input type="text" readOnly value={date} name="postDate" onChange={handleChange}></input>
                <button onClick={handleClick} >Save</button><br></br>
                <button onClick={backToFrontpage}>Back to frontpage</button>
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