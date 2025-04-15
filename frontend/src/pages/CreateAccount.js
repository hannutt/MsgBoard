import { useEffect, useState } from "react";
import axios from "axios";
import checked from "../icons/checked.png";
const CreateAccount = () => {
    const [username, setusername] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const [email, setEmail] = useState('')
    const [match, setMatch] = useState()
    const [btnDisable, setBtnDisable] = useState(true)
    const [type, setType] = useState('password')
    var [emailUsed, setEmailUsed] = useState('')
    //reali-aikainen tarkastus, onko password ja verifypassword samat
    useEffect(() => {
        if (password === verifyPassword && password.length > 0 && username.length > 0 && email.length > 0) {
            //stateen voi asettaa myös kuvatiedoston
            setMatch(checked)
            setBtnDisable(false)

        }
        else {
            setMatch("")

        }
        //useeffectille parametrina annettavat muuttujan määritellään tässä.
    }, [password, verifyPassword])
    const handleRegister = async (event) => {
        event.preventDefault()
        const res = await axios.post("http://localhost:8800/register/", { username, password, email })
        setEmailUsed(emailUsed = res.data)

    }
    /*letters-parametri saa arvon onchange eventissää, 8 tai 10*/
    const generatePassword = (letters) => {
        let pass = '';
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
            'abcdefghijklmnopqrstuvwxyz0123456789@#$';

        for (let i = 1; i <= letters; i++) {
            let char = Math.floor(Math.random()
                * str.length + 1);

            pass += str.charAt(char)
        }
        console.log(pass)
        setType('text')
        document.getElementById("psw").value = pass
        document.getElementById("verifypsw").value = pass
        setPassword(pass)
        setVerifyPassword(verifyPassword)


    }
    return (
        <div>
            <div>
                <h2>Create account</h2>
            </div>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="email" onChange={e => (setEmail(e.target.value))}></input>
                <input type="text" placeholder="Username" onChange={e => setusername(e.target.value)}></input>
                <br></br>
                <input type={type} id="psw" placeholder="password" onChange={e => setPassword(e.target.value)}></input>
                {console.log("psw state ", password)}
                <input type={type} id="verifypsw" placeholder="password again" onChange={e => setVerifyPassword(e.target.value)}></input>
                <br></br>
                <p className="emailUsed">{emailUsed}</p>
                <button class="btn btn-dark" disabled={btnDisable}>Register</button>
            </form>
            <br></br>
            <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="cb8" onChange={() => generatePassword(8)}></input>
            <label class="form-check-label" for="cb8">Generate password with 8 letters</label>
            </div>
            <div class="form-check">
                <label class="form-check-label" for="cb10">Generate password with 10 letters</label>
                <input class="form-check-input" type="checkbox" value="" id="cb10" onChange={() => generatePassword(10)}></input>
            </div>
            <br></br>
            <p className="matchCheck"><img src={match} alt="success-icon"></img></p>
        </div>
    )
}
export default CreateAccount;