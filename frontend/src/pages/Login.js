import axios from "axios";
import {React,useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import eye from "../icons/eye.png"
import hide from "../icons/hide.png";
import Messages from "./Messages";
import PrivateRoutes from "./PrivateRoutes";


const Login = ()=>{
   
    const navigate = useNavigate()
    const [userName,setUserName]=useState('')
    const [psw,setPsw]=useState('')
    const [caps,setCaps]=useState('')
    const [eyeIcon,setEyeicon]=useState(eye)
    const [forgetPsw,setForgetPsw]=useState(false)

    const rememberMe=()=>{
        localStorage.setItem('username',userName)
        localStorage.setItem('psw',psw)
    }
  
   
    const handleSubmit = (event) => {
        
        event.preventDefault();
        //käyttäjätunnus ja salasana on tallennettu statemuuttujiin username&psw
        axios.post("http://localhost:8800/login/",{userName,psw})
        .then (res=>{
            //jos backendin lähettämä vastaus on login ok, siirrytään navigaten avulla etusivulle.
            if (res.data==="login ok") {
                //talletetaan true arvo localstorageen. arvoa käyttää PriveateRoutes komponentti, jonka
                //token arvo on oletusarvoisesti false, eli routeja/sivuja ei pääse käyttämään ellei
                //arvo ole true.
                localStorage.setItem("auth",true) 
                navigate("/messages")
                
                
            
            }
        })
        .catch(err=>console.log(err))

    }
    //TARKASTETAAN ONKO CAPS LOCK PÄÄLLÄ
    const handleKeyPress = (e)=>{
        const capsLockOn = e.getModifierState('CapsLock');
        if (capsLockOn)
            {
                setCaps("CAPSLOCK IS ON")
            }
        else{
            setCaps("")
        }
    }
    var clicks = 0;
    const showPsw=()=>{
        clicks+=1
         var input = document.querySelector("#psw")
        if (clicks %1===0)
            {
                input.type="text"
                //state-muuttujan ikonin vaihto hide/eye
                setEyeicon(hide)               
            }
        if (clicks %2===0)
            {
                input.type="password"
                setEyeicon(eye)
            }
       
        
    }
    const checkLocalStorage=()=>{
        document.getElementById("user").value=localStorage.getItem("username")
        document.getElementById("psw").value=localStorage.getItem("psw")
        
        
    }
    return(
      
        <div onLoad={checkLocalStorage} className="loginDiv">
          
            
            <h2>Login Page</h2>
            
            {/*onchange eli kun syötekentän sisältö muuttuu, sisältö talletetaan state muuttujaan (e.target.value
            )*/}
            <form onSubmit={handleSubmit}>
            <p>{caps}</p>
            <div className="fields">
            <input type="text" name="user" id="user" placeholder="username" onChange={e=>setUserName(e.target.value)}onKeyUp={(e)=>handleKeyPress(e)}></input>
            <input type="password" id="psw" name="psw" placeholder="password" onChange={e=>setPsw(e.target.value)} onKeyUp={(e)=>handleKeyPress(e)}></input>
            </div>
            <br></br><br></br>
            <div className="loginBtnDiv">
            <button class="btn btn-primary">Login</button>
            <br></br>
            <label htmlFor="forgotPsw">Forget password?</label>
            <input type="checkbox" id="forgotPsw" onChange={()=>setForgetPsw(!forgetPsw)}></input>
            <br></br>
           
           
            {/*jos forget on true eli checkboksia klikattu navigoidaan /mail eli näyteään mailsender komp.*/}
            {forgetPsw && navigate("/mail")}
            
            </div>
            </form>
            <label htmlFor="remMe">Remember me?</label>
            <input type="checkbox" id="remMe" onClick={rememberMe}></input>
            <button className="showBtn" onClick={showPsw}><img src={eyeIcon} alt="eye/hide"></img></button>
            <br></br>
          
            <div className="createBtn">
            <button class="btn btn-info">
                <Link to="/create" className="createLink">Create account</Link></button>
                </div>
        
        </div>
        
    )
}

export default Login;