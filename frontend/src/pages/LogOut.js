import { useNavigate } from "react-router-dom"
const Logout = ()=>{
    const navigate = useNavigate()

    const logOut=()=>{
      localStorage.clear()
      navigate("/")
    }
    return(
        <div className="logout">
            <button  onClick={logOut} class="btn btn-outline-warning">Log out</button>
        </div>
    )
}
export default Logout;
