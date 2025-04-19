import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams, Link } from "react-router-dom";
import account from "../icons/account.png"
const MyProfile = () => {
    var user = localStorage.getItem("present")
    const [results, setResults] = useState([])
    const [userMessages, setUserMessages] = useState([])
    //talletetaan statemuuttujaan user id input kentän arvo
    const [currentUserName, setCurrentUsername] = useState('')
    const [oldPsw, setOldPsw] = useState({
        oldPsw: ''
    })
    //state olio, jolla on newpsw niminen ominaisuus
    const [newPsw, setNewPsw] = useState({
        newPsw: ''
    })
    const [pswStrength, setPswStrength] = useState('')
    const [colorStyle, setColorStyle] = useState('')
    const location = useLocation()
    var [userid, setUserId] = useState(0)
    //haetaaan osoitekentässä näkyvä käyttäjänimi katkaisemalla merkkijono / merkistä eli
    //localhost:8800/profile/user osoitteesta talletetaan viimeinen alkio eli user tähän
    //muuttujaan.
    const userName = location.pathname.split("/")[2]
    var specialsExist = false
    const specials = ["!", "#", "?", "%", "&", "/"]
    console.log(userName)
    var uid = localStorage.getItem('userid')



    //useeffect toteuttaa staten päivityksen eli tallettaa user-kentän merkkijonon
    //muuttujaan heti sivun latautuessa, näin saadaan changepsw funktio toimimaan
    //siten että käyttäjänimi saadaan jo ensimäisellä painikkeen klikkauksella

    useEffect(() => {
        setCurrentUsername(document.getElementById("user").value)
        const getData = async () => {
            const res = await axios.get("http://localhost:8800/changes/" + uid)
            const resmsg = await axios.get("http://localhost:8800/usermessages/" + uid)
            setResults(res.data)
            setUserMessages(resmsg.data)

        }

        //funktiokutsu
        getData()
    }, [])


    const checkPsw = () => {
        specialsExist = specials.some(item => newPsw.newPsw.toLowerCase().includes(item));
        console.log(specialsExist)
        if (newPsw.newPsw.length >= 1 && newPsw.newPsw.length <= 5) {
            setPswStrength("Password strength weak")
            setColorStyle("weak")
        }
        else if (newPsw.newPsw.length > 5 && newPsw.newPsw.length <= 8) {
            setPswStrength("Password strength moderate")
            setColorStyle("moderate")
        }
        else if (newPsw.newPsw.length > 8 && !specialsExist) {
            setPswStrength("Password strength strong")
            setColorStyle("strong")
        }

        else if (newPsw.newPsw.length > 8 && specialsExist) {
            setPswStrength("Password strength very strong")
            setColorStyle("strong")
        }
        else {
            setPswStrength("")
        }

    }


    const changePsw = async (e) => {
        setUserId(userid = parseInt(localStorage.getItem('userid')))

        console.log(currentUserName)
        console.log(newPsw)
        try {
            await axios.put("http://localhost:8800/updatepsw/" + userName, newPsw)
            await axios.put("http://localhost:8800/changedtimes/" + userid)


        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div>
            <center>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#"><Link to="/messages">Messages</Link></a></li>
                    <li class="breadcrumb-item"><a href="#"><Link to={{ pathname: "/profile/" + user }}>My profile</Link></a></li>
                </ol>
            </nav>
            
            <h2>My profile <img src={account} width={50}></img> </h2> 
            {results.map(result => (
                <p>Password changed <b>{result.times}</b> times</p>
            ))}
            <p>Your username: <b>{user}</b></p>


            <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item" style={{ backgroundColor: "#8eb3ed", width: 35 + "%" }}>
                    <h2 class="accordion-header"  >
                        <button class="accordion-button collapsed" style={{ backgroundColor: "#8eb3ed", border: 2 + "px solid black" }} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Show messages you have posted to the forum
                        </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body" style={{ backgroundColor: "#8eb3ed" }}>
                            <ul className="usrMsg">
                                {userMessages.map(m => (
                                    <li>{m.msgtxt} {m.txtposttime}</li>
                                ))}
                            </ul>


                        </div>
                    </div>
                </div>
                <br></br>



                <input hidden name="user" id="user" type="text" value={localStorage.getItem("present")}></input>
          
                <div class="accordion accordion-flush" id="accordionFlushExample2">
                    <div class="accordion-item" style={{ backgroundColor: "#8eb3ed", width: 35 + "%" }}>
                        <h2 class="accordion-header"  >
                            <button class="accordion-button collapsed" style={{ backgroundColor: "#8eb3ed"  ,border: 2 + "px solid black"}} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseOne">
                                Change your password
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample2">
                            <div class="accordion-body" style={{ backgroundColor: "#8eb3ed" }}>
                                <input name="oldPsw" id="oldPsw" type="text" placeholder="current psw" onChange={e => setOldPsw((prev) => ({ ...prev, [e.target.name]: e.target.value }))}></input><br></br>
                                {/* huomaa onchangessa 2 eventtiä syötteen talleennus stateen ja funktiokutsu*/}
                                <input name="newPsw" id="newPsw" type="text" placeholder="New psw" onChange={e => { setNewPsw((prev) => ({ ...prev, [e.target.name]: e.target.value })); checkPsw() }}></input>
                                <p className={colorStyle}><b>{pswStrength}</b></p>

                                <button class="btn btn-dark" onClick={changePsw}>Change</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            </center>
        </div>
        
    )
}
export default MyProfile;