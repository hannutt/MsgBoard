import axios from "axios";
import {React,useState} from "react";
import { useNavigate } from "react-router-dom";
import Messages from "./Messages";


const Login = ()=>{
   
    const navigate = useNavigate()
    const [userName,setUserName]=useState('')
    const [psw,setPsw]=useState('')
    const [delBtnDisable,setDelBtnDisable]=useState(true)
    const handleSubmit = (event) => {
        
        event.preventDefault();
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
            
            {/*onchange eli kun syötekentän sisältö muuttuu, sisältö talletetaan state muuttujaan (e.target.value
            )*/}
            <form onSubmit={handleSubmit}>
            
            <input type="text" name="user" placeholder="username" onChange={e=>setUserName(e.target.value)}></input>
            <input type="password" name="psw" placeholder="password" onChange={e=>setPsw(e.target.value)}></input>
            {console.log(userName)}
            <br></br>
            <button>Login</button>
            </form>
        </div>
    )
}

export default Login;