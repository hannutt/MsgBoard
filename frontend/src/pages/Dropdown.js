import { Link } from "react-router-dom";
const DropMenu =()=>{
    return(
        <div class="dropdown show">
        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Functions
        </a>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a class="dropdown-item" href="#"><Link to="/Add">New</Link></a>
            <a class="dropdown-item" href="#"><Link to="/Search">Search</Link></a>
            <a class="dropdown-item" href="#">Something else here</a>
        </div>
    </div>
    )
}
export default DropMenu;