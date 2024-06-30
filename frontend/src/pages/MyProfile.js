import { useEffect, useState } from "react";
import axios from "axios";

const MyProfile=()=>{
    //talletetaan statemuuttujaan user id input kentän arvo
    const [currentUserName,setCurrentUsername]=useState('')
    const [oldPsw,setOldPsw]=useState('')
    const [newPsw,setNewPsw]=useState('')
    const [pswStrength,setPswStrength]=useState('')
    const [colorStyle,setColorStyle]=useState('')
    var specialsExist=false
    const specials=["!","#","?","%","&","/"]

    //useeffect toteuttaa staten päivityksen eli tallettaa user-kentän merkkijonon
    //muuttujaan heti sivun latautuessa, näin saadaan changepsw funktio toimimaan
    //siten että käyttäjänimi saadaan jo ensimäisellä painikkeen klikkauksella
    useEffect(()=>{
        setCurrentUsername(document.getElementById("user").value)

    })


   const checkPsw=()=>{
    specialsExist=specials.some(item =>newPsw.toLowerCase().includes(item));
    console.log(specialsExist)
    if (newPsw.length>=1 && newPsw.length<=5)
        {
            setPswStrength("Password strength weak")
            setColorStyle("weak")
        }
        else if (newPsw.length>5 && newPsw.length<=8)
            {
                setPswStrength("Password strength moderate")
                setColorStyle("moderate")
            }
            else if (newPsw.length>8 && !specialsExist)
                {
                    setPswStrength("Password strength strong")
                    setColorStyle("strong")
                }
            
                else if (newPsw.length>8 && specialsExist)
                    {
                        setPswStrength("Password strength very strong")
                        setColorStyle("strong")
                    }
            else{
                setPswStrength("")
            }

   }
  

    const changePsw=()=>{
      
        console.log(currentUserName)
        console.log(newPsw)
        axios.put("http://localhost:8800/updatepsw/"+newPsw)
        
     
}
   
  
    return(
        <div>
            <h4>My profile</h4>
            <p>Password changed times</p>
            <p>Your username</p>
            <form onSubmit={changePsw}>
            <input name="user" id="user" type="text" value={localStorage.getItem("present")}></input>
            <h4>Change your password</h4>
            <input name="oldPsw" id="oldPsw" type="text" placeholder="current psw" onChange={e=>setOldPsw(e.target.value)}></input><br></br>
            {/* huomaa onchangessa 2 eventtiä syötteen talleennus stateen ja funktiokutsu*/}
            <input name="newPsw" id="newPsw" type="text" placeholder="New psw" onChange={e=>{setNewPsw(e.target.value);checkPsw()}}></input>
            <p className={colorStyle}><b>{pswStrength}</b></p>
            
            <button>Change</button>
            </form>
            
            
          
        </div>
    )
}
export default MyProfile;