import { useEffect, useState } from "react";
import axios from "axios";
import checked from "../icons/checked.png";
const CreateAccount = ()=>{
    const [username,setusername]=useState('')
    const [password,setPassword]=useState('')
    const [verifyPassword,setVerifyPassword]=useState('')
    const [email,setEmail]=useState('')
    const [match,setMatch]=useState()
    const [btnDisable,setBtnDisable]=useState(true)
    //reali-aikainen tarkastus, onko password ja verifypassword samat
    useEffect(()=>{
        if (password===verifyPassword && password.length>0 && username.length>0 && email.length>0 )
            {
                //stateen voi asettaa myös kuvatiedoston
                setMatch(checked)
                setBtnDisable(false)
                
            }
            else{
                setMatch("")
                
            }
            //useeffectille parametrina annettavat muuttujan määritellään tässä.
    },[password,verifyPassword])
    const handleRegister = (event) => {
        event.preventDefault()
        axios.post("http://localhost:8800/register/",{username,password,email})
        
    }
    const generatePassword=()=>{
        let pass = '';
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789@#$';

    for (let i = 1; i <= 10; i++) {
        let char = Math.floor(Math.random()
            * str.length + 1);

        pass += str.charAt(char)
    }
    console.log(pass)
    document.getElementById("psw").value=pass
    document.getElementById("verifypsw").value=pass
    setPassword(pass)
    setVerifyPassword(pass)

    }
    return(
        <div>
            <div>
            <h2>Create account</h2>
            </div>
            <form onSubmit={handleRegister}>
            <input type="text" placeholder="email" onChange={e=>(setEmail(e.target.value))}></input>
            <input type="text" placeholder="Username" onChange={e=>setusername(e.target.value)}></input>
            <br></br>
            <input type="password" id="psw" placeholder="password" onChange={e=>setPassword(e.target.value)}></input>
            {console.log("psw state ",password)}
            <input type="password" id="verifypsw" placeholder="password again"onChange={e=>setVerifyPassword(e.target.value)}></input>
            <br></br>
            <button disabled={btnDisable}>Register</button>
            </form>
            <button onClick={generatePassword}>Generate password</button>
            <p className="matchCheck"><img src={match} alt="success-icon"></img></p>
        </div>
    )
}
export default CreateAccount;