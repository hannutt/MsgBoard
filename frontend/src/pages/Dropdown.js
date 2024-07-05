import { useState } from "react";
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
            <a class="dropdown-item" href="#">Show message text only <input type="checkbox" onChange={() => props.setHideIdAndDate(!props.hideidAndDate)}></input></a>
            <a class="dropdown-item" href="#">Align text to the center<input type="checkbox" onChange={() => props.setHoverOff("messageCenter")}></input></a>
            <a class="dropdown-item" href="#">Align text to the left<input type="checkbox" onChange={() => props.setHoverOff("message")}></input></a>
            <a class="dropdown-item" href="#">Go to the end of the page<input type="checkbox" onChange={props.endOfPage}></input></a>
            <a class="dropdown-item" href="#"><Link to="/profile">My profile</Link></a>

        </div>
    </div>
    )
}
export default DropMenu;