import axios from "axios";
import {React,useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import eye from "../icons/eye.png"
import hide from "../icons/hide.png";
import Messages from "./Messages";
import PrivateRoutes from "./PrivateRoutes";
import ErrorPage from "./ErrorPage";

const Login = ()=>{
   
    const navigate = useNavigate()
    const [userName,setUserName]=useState('')
    const [psw,setPsw]=useState('')
    const [caps,setCaps]=useState('')
    const [eyeIcon,setEyeicon]=useState(eye)
    const [forgetPsw,setForgetPsw]=useState(false)
    const [type,setType]=useState('password')
    const [credentialError,SetCredentialError]=useState('Username or password is wrong')

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
                localStorage.setItem("present",userName) 
                navigate("/messages")   
            
            }
            //jos backendin lähettämä vastaus on mikä tahansa muu, navigoidaan erros sivulle
            //state:credentialerror = välitetään error-komponentille state-muuttuja
            else{
                navigate("/error",{state:credentialError})
                
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
    
    const showPsw=()=>{
        if (type==='password')
            {
                setType('text')
                //state-muuttujan ikonin vaihto hide/eye
                setEyeicon(hide)
                console.log(type)               
            } 
            else{
                setType('password')
                setEyeicon(eye)
                console.log(type)
            }
        
    }
    const checkLocalStorage=()=>{
        //ilman tätä ehtoa showpsw funktio ei toimi kuten pitää.
        if (document.getElementById("user")==null && document.getElementById("psw"==null))
            {
                document.getElementById("user").value=localStorage.getItem("username")
                document.getElementById("psw").value=localStorage.getItem("psw")

            }
            else{
                console.log("fields not null")
            }
       
        
        
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
            <input  id="psw" name="psw" type={type} placeholder="password" value={psw} onChange={e=>setPsw(e.target.value)} onKeyUp={(e)=>handleKeyPress(e)} ></input>
           
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
            <button className="showBtn" onClick={showPsw}><img src={eyeIcon} alt="eye/hide"></img></button>
            <label htmlFor="remMe">Remember me?</label>
            <input type="checkbox" id="remMe" onClick={rememberMe}></input>
           
            <br></br>
          
            <div className="createBtn">
            <button class="btn btn-info">
                <Link to="/create" className="createLink">Create account</Link></button>
                </div>
        
        </div>
        
    )
}

export default Login;