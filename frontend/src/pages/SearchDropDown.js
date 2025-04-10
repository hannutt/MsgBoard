const SrcDrop=(props)=>{
    return(
        <div class="dropdown show" style={{ marginLeft: 10 + "px" }}>
        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Search filters
        </a>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a class="dropdown-item" href="#">Search by id <input id="byid" type="checkbox" onClick={()=>props.setById(!props.Byid)}></input></a>
            <a class="dropdown-item" href="#">Search by date <input id="bydate" type="checkbox" onClick={()=>props.setByDate(!props.ByDate)}></input></a>
            <a class="dropdown-item" href="#">Search by keyword <input id="byKeyword" type="checkbox" onClick={()=>props.setByKeyword(!props.Bykeyword)}></input></a>
            <a class="dropdown-item" href="#">Most liked & least liked posts <input id="mostliked" type="checkbox" onClick={()=>props.setMostLikes(!props.mostLikes)}></input></a>
        </div>
    </div>
    )
}
export default SrcDrop;