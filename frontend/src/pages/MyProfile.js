import { useState } from "react";

const MyProfile=()=>{
    //talletetaan statemuuttujaan user id input kentän arvo
    //const [currentUserName,setCurrentUsername]=useState(document.getElementById("user").value)
    const [oldPsw,setOldPsw]=useState('')
    const [newPsw,setNewPsw]=useState('')
    const [pswStrength,setPswStrength]=useState('')
    const [colorStyle,setColorStyle]=useState('')
    var specialsExist=false
    const specials=["!","#","?","%","&","/"]


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

    }
   
  
    return(
        <div>
            <h4>My profile</h4>
            <p>Password changed times</p>
            <p>Your username</p>
            <input name="user" id="user" type="text" value={localStorage.getItem("present")}></input>
            <h4>Change your password</h4>
            <input name="oldPsw" id="oldPsw" type="text" onChange={e=>setOldPsw(e.target.value)}></input><br></br>
            {/* huomaa onchangessa 2 eventtiä syötteen talleennus stateen ja funktiokutsu*/}
            <input name="newPsw" id="newPsw" type="text" onChange={e=>{setNewPsw(e.target.value);checkPsw()}}></input>
            <p className={colorStyle}><b>{pswStrength}</b></p>
            
            <button onClick={changePsw}>Change</button>
            
          
        </div>
    )
}
export default MyProfile;