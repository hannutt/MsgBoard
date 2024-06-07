import { Outlet,Navigate } from "react-router-dom";

const PrivateRoutes=()=>{

    //muutetaan tokenin arvo localstoragesta haettuun arvoon eli true, jonka jälkeen autentikointi
    //on onnistunut ja pääsy muille sivulle avautuu.
    let auth = {'token':localStorage.getItem("auth")}
    return(
        auth.token ? <Outlet/>:<Navigate to="/"/>
    )
}

export default PrivateRoutes;