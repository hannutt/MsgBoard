const SrcDrop=(props)=>{
    return(
        <div class="dropdown show">
        <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Search
        </a>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a class="dropdown-item" href="#">Search by id <input id="byid" type="checkbox" onClick={()=>props.setById(!props.Byid)}></input></a>
            <a class="dropdown-item" href="#">Search by date <input id="bydate" type="checkbox" onClick={()=>props.setByDate(!props.ByDate)}></input></a>
            <a class="dropdown-item" href="#">Search by keyword <input id="byKeyword" type="checkbox" onClick={()=>props.setByKeyword(!props.Bykeyword)}></input></a>
        </div>
    </div>
    )
}
export default SrcDrop;