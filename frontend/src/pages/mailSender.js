import axios from "axios";
import { useState } from "react";

const MailSender=()=>{
    const [emailAdd,setEmailAdd]=useState("")
    const [results,setResults]=useState([])
    const check= async()=>{
        await axios.post("http://localhost:8800/check/"+emailAdd)
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
        
        <button onClick={check}>Check</button>
       
        
      
        
        </div>
    )
}
export default MailSender;