import axios from "axios";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import eye from "../icons/eye.png"
import hide from "../icons/hide.png";
import Messages from "./Messages";
import PrivateRoutes from "./PrivateRoutes";
import ErrorPage from "./ErrorPage";
import account from "../icons/account.png"
const Login = () => {

    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [psw, setPsw] = useState('')
    const [caps, setCaps] = useState('')
    const [eyeIcon, setEyeicon] = useState(eye)
    const [forgetPsw, setForgetPsw] = useState(false)
    const [type, setType] = useState('password')
    const [credentialError, SetCredentialError] = useState('Username or password is wrong')

    const rememberMe = () => {
        localStorage.setItem('username', userName)
        localStorage.setItem('psw', psw)
    }


    const handleSubmit = (event) => {

        event.preventDefault();
        //käyttäjätunnus ja salasana on tallennettu statemuuttujiin username&psw
        axios.post("http://localhost:8800/login/", { userName, psw })
            .then(res => {
                //jos backendin lähettämä vastaus on login ok, siirrytään navigaten avulla etusivulle.
                if (res.data === "login ok") {
                    //talletetaan true arvo localstorageen. arvoa käyttää PriveateRoutes komponentti, jonka
                    //token arvo on oletusarvoisesti false, eli routeja/sivuja ei pääse käyttämään ellei
                    //arvo ole true.
                    localStorage.setItem("auth", true)
                    localStorage.setItem("present", userName)
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
    return (

        <div onLoad={checkLocalStorage} className="loginDiv">




            {/*onchange eli kun syötekentän sisältö muuttuu, sisältö talletetaan state muuttujaan (e.target.value
            )*/}
            <form onSubmit={handleSubmit}>

                <p>{caps}</p>

                <div className="fields">


                </div>
                <br></br><br></br>
                <div className="loginBtnDiv">
                    <img src={account}></img>
                    <h2>Login Page</h2>

                    <br></br>
                    <input type="text"  name="user" id="user" placeholder="username" style={{ marginRight: 10 + "px" }} onChange={e => setUserName(e.target.value)} onKeyUp={(e) => handleKeyPress(e)}></input>
                    <input id="psw" name="psw" type={type} placeholder="password" value={psw} onChange={e => setPsw(e.target.value)} onKeyUp={(e) => handleKeyPress(e)} ></input>
                    <button style={{ marginLeft: 5 + "px" }} class="btn btn-light btn-sm" onClick={showPsw}><img src={eyeIcon} alt="eye/hide"></img></button>
                    <br></br><br></br>
                    <button class="btn btn-primary btn-sm" style={{ marginRight: 15 + "px" }}>Login</button>
                    <button class="btn btn-info btn-sm">
                        <Link to="/create" className="createLink">Create account</Link></button>
                        <button class="btn btn-primary btn-sm" style={{ marginLeft: 15 + "px" }}>Voice Login</button>
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
                    {forgetPsw && navigate("/mail")}

                </div>
            </form>




        </div>

    )
}

export default Login;