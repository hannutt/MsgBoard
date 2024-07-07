import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams,Link } from "react-router-dom";

const MyProfile=()=>{
    var user = localStorage.getItem("present")
    //talletetaan statemuuttujaan user id input kentän arvo
    const [currentUserName,setCurrentUsername]=useState('')
    const [oldPsw,setOldPsw]=useState({
        oldPsw:''
    })
    //state olio, jolla on newpsw niminen ominaisuus
    const [newPsw,setNewPsw]=useState({
        newPsw:''
    })
    const [pswStrength,setPswStrength]=useState('')
    const [colorStyle,setColorStyle]=useState('')
    const location = useLocation()
    //haetaaan osoitekentässä näkyvä käyttäjänimi katkaisemalla merkkijono / merkistä eli
    //localhost:8800/profile/user osoitteesta talletetaan viimeinen alkio eli user tähän
    //muuttujaan.
    const userName =location.pathname.split("/")[2]
    var specialsExist=false
    const specials=["!","#","?","%","&","/"]
    console.log(userName)

   

    //useeffect toteuttaa staten päivityksen eli tallettaa user-kentän merkkijonon
    //muuttujaan heti sivun latautuessa, näin saadaan changepsw funktio toimimaan
    //siten että käyttäjänimi saadaan jo ensimäisellä painikkeen klikkauksella
    useEffect(()=>{
        setCurrentUsername(document.getElementById("user").value)

    })


   const checkPsw=()=>{
    specialsExist=specials.some(item =>newPsw.newPsw.toLowerCase().includes(item));
    console.log(specialsExist)
    if (newPsw.newPsw.length>=1 && newPsw.newPsw.length<=5)
        {
            setPswStrength("Password strength weak")
            setColorStyle("weak")
        }
        else if (newPsw.newPsw.length>5 && newPsw.newPsw.length<=8)
            {
                setPswStrength("Password strength moderate")
                setColorStyle("moderate")
            }
            else if (newPsw.newPsw.length>8 && !specialsExist)
                {
                    setPswStrength("Password strength strong")
                    setColorStyle("strong")
                }
            
                else if (newPsw.newPsw.length>8 && specialsExist)
                    {
                        setPswStrength("Password strength very strong")
                        setColorStyle("strong")
                    }
            else{
                setPswStrength("")
            }

   }
  

    const changePsw= async (e)=>{
        console.log(currentUserName)
        console.log(newPsw)
        try {
            await axios.put("http://localhost:8800/updatepsw/"+userName,newPsw)

        }catch(err){
            console.log(err)
        }  
     
}
   
    return(
        <div>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#"><Link to="/messages">Messages</Link></a></li>
                    <li class="breadcrumb-item"><a href="#"><Link to={{pathname:"/profile/"+user}}>My profile</Link></a></li> 
                </ol>
            </nav>
            <h4>My profile</h4>
            <p>Password changed times</p>
            <p>Your username</p>
            
            <input name="user" id="user" type="text" value={localStorage.getItem("present")}></input>
            <h4>Change your password</h4>
            
            <input name="oldPsw" id="oldPsw" type="text" placeholder="current psw" onChange={e=>setOldPsw((prev)=>({...prev,[e.target.name]:e.target.value}))}></input><br></br> 
            {/* huomaa onchangessa 2 eventtiä syötteen talleennus stateen ja funktiokutsu*/}
            <input name="newPsw" id="newPsw" type="text" placeholder="New psw" onChange={e=>{setNewPsw((prev)=>({...prev,[e.target.name]:e.target.value}));checkPsw()}}></input>
            <p className={colorStyle}><b>{pswStrength}</b></p>
            
            <button onClick={changePsw}>Change</button>
            
            
            
          
        </div>
    )
}
export default MyProfile;