import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const ErrorPage=(props)=>{
    //näillä saadaan käyttöön navigate yhteydessä login.js:ssä välitetty state-muuttuja
    const location = useLocation();
    const data = location.state;
    

    const backLoginPage=()=>{
        //navigate("/")
    }
    return(
        <div>
            <center>
            <h3>{data}</h3>
            <h3>{props.sqlErr}</h3>
            <button onClick={backLoginPage}>Back</button>
            </center>
        </div>
    )
}
export default ErrorPage;