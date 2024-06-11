import axios from "axios";
import { useState } from "react";

const MailSender=()=>{
    const [emailAdd,setEmailAdd]=useState("")
    const [user,setUser]=useState("")
    const [results,setResults]=useState([])
    const check= async()=>{
        await axios.post("http://localhost:8800/check/",{emailAdd,user})
        .then(res=>{
            if (res.data.length>0)
                {
                    
                    setResults(res.data)
                 
                    
                }
        
        })

    }
    return(
        <div>
        <input type="text" placeholder="your@mail.com" onChange={e=>setEmailAdd(e.target.value)}></input>
        <br></br>
        <input type="text" placeholder="your username" onChange={e=>setUser(e.target.value)}></input>
        <button onClick={check}>Check</button>
        {results.map(result=>(
            <p> username <b>{user}</b> password is: <b>{result.psw}</b></p>
        ))}
        
      
        
        </div>
    )
}
export default MailSender;