import axios from "axios";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import eye from "../icons/eye.png"
import hide from "../icons/hide.png";
import Messages from "./Messages";
import PrivateRoutes from "./PrivateRoutes";
import ErrorPage from "./ErrorPage";
import account from "../icons/account.png"
import MailSender from "./mailSender";
const Login = () => {

    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [psw, setPsw] = useState('')
    const [caps, setCaps] = useState('')
    const [eyeIcon, setEyeicon] = useState(eye)
    const [forgetPsw, setForgetPsw] = useState(false)
    const [type, setType] = useState('password')
    const [credentialError, SetCredentialError] = useState('Username or password is wrong')
    var [userId,setUserid]=useState(0)
    var [deviceName,setDeviceName]=useState('')
  

    const rememberMe = async () => {
        localStorage.setItem('username', userName)
        localStorage.setItem('psw', psw)
    }

    /*
    const saveDeviceName= async () =>{
        const res = await axios("http://localhost:8800/devicename")
        setDeviceName(deviceName=res.data)
        localStorage.setItem("devicename",deviceName.device)
        console.log(deviceName.device)

    }*/


    const handleSubmit = (event) => {

        event.preventDefault();
        //käyttäjätunnus ja salasana on tallennettu statemuuttujiin username&psw
        axios.post("http://localhost:8800/login/", { userName, psw })
            .then(res => {
                console.log(res.data)
                //jos backendin lähettämä vastaus on login ok, siirrytään navigaten avulla etusivulle.
                if (res.data.length >0) {
                    //talletetaan true arvo localstorageen. arvoa käyttää PriveateRoutes komponentti, jonka
                    //token arvo on oletusarvoisesti false, eli routeja/sivuja ei pääse käyttämään ellei
                    //arvo ole true.
                    setUserid(userId=res.data[0].id)
                    localStorage.setItem("auth", true)
                    localStorage.setItem("present", userName)
                    localStorage.setItem("userid",userId)
                    navigate("/messages")

                }
                //jos backendin lähettämä vastaus on mikä tahansa muu, navigoidaan erros sivulle
                //state:credentialerror = välitetään error-komponentille state-muuttuja
                else {
                    navigate("/error", { state: credentialError })

                }

            })
            .catch(err => console.log(err))

    }
    //TARKASTETAAN ONKO CAPS LOCK PÄÄLLÄ
    const handleKeyPress = (e) => {
        const capsLockOn = e.getModifierState('CapsLock');
        if (capsLockOn) {
            setCaps("CAPSLOCK IS ON")
        }
        else {
            setCaps("")
        }
    }

    const showPsw = () => {
        if (type === 'password') {
            setType('text')
            //state-muuttujan ikonin vaihto hide/eye
            setEyeicon(hide)
            console.log(type)
        }
        else {
            setType('password')
            setEyeicon(eye)
            console.log(type)
        }

    }
    const checkLocalStorage = () => {
        //ilman tätä ehtoa showpsw funktio ei toimi kuten pitää.
        if (document.getElementById("user") == null && document.getElementById("psw" == null)) {
            document.getElementById("user").value = localStorage.getItem("username")
            document.getElementById("psw").value = localStorage.getItem("psw")

        }
        else {
            console.log("fields not null")
        }



    }
    const voiceLogin=(event)=>{
        event.preventDefault();
        console.log("listening")
        var seconds = 20
     
        //vähennetään seconds muuttujasta luku 1 joka sekunti ja näytetän muuttuva luku html-elementissä
        var interval= setInterval(() => {
            seconds=seconds-1
            console.log(seconds)
           
          
            if (seconds===0)
            {
                clearInterval(interval)
              
            }
            
        }, 1000);
    
        const recognitionSvc = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new recognitionSvc();
        var resList = []
        recognition.lang = 'en-GB';
        // Start the speech recognition
        recognition.start();
        recognition.onresult = (event) => {
            // iterate through speech recognition results
            for (const result of event.results) {
                // Print the transcription to the console
                console.log(`${result[0].transcript}`);
                //talleteaan lausutut sanat listaan, että niitä voidan hyödyntää input-kenttiin sijoittamisessa
                resList.push(result[0].transcript)
    
    
            }
            document.getElementById("user").value = resList[0]
            //listan viimeinen elementti
            var lastItem = resList.pop()
            document.getElementById("psw").value = lastItem
            console.log(resList)
    
    
    
            setTimeout(() => {
                recognition.stop();
                console.log("stopped")
                resList = []
    
            }, 20000);
    
         
        }
    }
    
    return (

        <div onLoad={checkLocalStorage} className="loginDiv">




            {/*onchange eli kun syötekentän sisältö muuttuu, sisältö talletetaan state muuttujaan (e.target.value
            )*/}
            <form>

                <p>{caps}</p>

              
               
                <div className="loginBtnDiv">
                    <img src={account}></img>
                    <h3>Login Page</h3>

                    <br></br>
                    <input type="text"  name="user" id="user" className="user" placeholder="username" onChange={e => setUserName(e.target.value)} onKeyUp={(e) => handleKeyPress(e)}></input>
                    <input id="psw" name="psw" type={type} placeholder="password" value={psw} onChange={e => setPsw(e.target.value)} onKeyUp={(e) => handleKeyPress(e)} ></input>
                    <button style={{ marginLeft: 5 + "px" }} class="btn btn-light btn-sm p-0" onClick={showPsw}><img src={eyeIcon} alt="eye/hide"></img></button>
                    <br></br><br></br>
                    <span className="loginButton">
                    <button class="btn btn-primary btn-sm" onClick={handleSubmit}>Login</button>
                    </span>
                    <button class="btn btn-info btn-sm">
                        <Link to="/create" className="createLink">Create account</Link></button>
                        <span className="voiceLoginButton">
                        <button class="btn btn-primary btn-sm" onClick={voiceLogin}>Voice Login</button>
                        </span>
                    <br></br><br></br>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="forgotPsw" onChange={() => setForgetPsw(!forgetPsw)}></input>
                        <label class="form-check-label" for="forgotPsw">Forgot password?</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="remMe" onClick={rememberMe}></input>
                        <label class="form-check-label" for="remMe">Remember me?</label>
                    </div>
                    {/*jos forget on true eli checkboksia klikattu navigoidaan /mail eli näyteään mailsender komp.*/}
                    {forgetPsw && <MailSender/>}

                </div>
            </form>




        </div>

    )
}

export default Login;