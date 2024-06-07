import { useEffect, useState } from "react";
import axios from "axios";
const CreateAccount = ()=>{
    const [username,setusername]=useState('')
    const [password,setPassword]=useState('')
    const [verifyPassword,setVerifyPassword]=useState('')
    const [email,setEmail]=useState('')
    const [match,setMatch]=useState('')
    const [btnDisable,setBtnDisable]=useState(true)
    //reali-aikainen tarkastus, onko password ja verifypassword samat
    useEffect(()=>{
        if (password===verifyPassword && password.length>0 && username.length>0 && email.length>0 )
            {
                setMatch("password OK")
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
    return(
        <div>
            <div>
            <h2>Create account</h2>
            </div>
            <form onSubmit={handleRegister}>
            <input type="text" placeholder="email" onChange={e=>(setEmail(e.target.value))}></input>
            <input type="text" placeholder="Username" onChange={e=>setusername(e.target.value)}></input>
            <br></br>
            <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}></input>
            <input type="password" placeholder="password again"onChange={e=>setVerifyPassword(e.target.value)}></input>
            <br></br>
            <button disabled={btnDisable}>Register</button>
            </form>
            <p className="matchCheck">{match}</p>
        </div>
    )
}
export default CreateAccount;