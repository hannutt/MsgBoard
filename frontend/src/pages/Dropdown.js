import { Link } from "react-router-dom";
const DropMenu =(props)=>{
    return(
        <div class="dropdown show">
        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Functions
        </a>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a class="dropdown-item" href="#"><Link to="/Add">New post</Link></a>
            <a class="dropdown-item" href="#"><Link to="/Search">Search from post</Link></a>
            <a class="dropdown-item" href="#">Show message text only &ensp;<input type="checkbox" onChange={() => props.setHideIdAndDate(!props.hideidAndDate)}></input></a>
            <a class="dropdown-item" href="#">Align text to the center&ensp;<input type="checkbox" onChange={() => props.setHoverOff("messageCenter")}></input></a>
            <a class="dropdown-item" href="#">Align text to the left&ensp; &ensp;<input type="checkbox" onChange={() => props.setHoverOff("message")}></input></a>
        </div>
    </div>
    )
}
export default DropMenu;