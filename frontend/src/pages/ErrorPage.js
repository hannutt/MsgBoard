import { useNavigate } from "react-router-dom";

const ErrorPage=()=>{
    const navigate = useNavigate()
    const backLoginPage=()=>{
        navigate("/")
    }
    return(
        <div>
            <center>
            <h3>Something went wrong</h3>
            <button onClick={backLoginPage}>Back</button>
            </center>
        </div>
    )
}
export default ErrorPage;