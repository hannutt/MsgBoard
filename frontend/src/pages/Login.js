import axios from "axios";
import {React,useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Messages from "./Messages";


const Login = ()=>{
   
    const navigate = useNavigate()
    const [userName,setUserName]=useState('')
    const [psw,setPsw]=useState('')
    const [delBtnDisable,setDelBtnDisable]=useState(true)
    const handleSubmit = (event) => {
        
        event.preventDefault();
        //käyttäjätunnus ja salasana on tallennettu statemuuttujiin username&psw
        axios.post("http://localhost:8800/login/",{userName,psw})
        .then (res=>{
            //jos backendin lähettämä vastaus on login ok, siirrytään navigaten avulla etusivulle.
            if (res.data==="login ok") { 
                navigate("/messages")
            
            }
        })
        .catch(err=>console.log(err))

    }
    return(
        
        <div className="loginDiv">
            <h2>Login Page</h2>
            
            {/*onchange eli kun syötekentän sisältö muuttuu, sisältö talletetaan state muuttujaan (e.target.value
            )*/}
            <form onSubmit={handleSubmit}>
            
            <input type="text" name="user" placeholder="username" onChange={e=>setUserName(e.target.value)}></input>
            <input type="password" name="psw" placeholder="password" onChange={e=>setPsw(e.target.value)}></input>
            <br></br>
            <button>Login</button>
            </form>
            <button>
                <Link to="/create">Create account</Link></button>
        </div>
    )
}

export default Login;