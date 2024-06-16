import { useState } from "react"

const TimedLogout = (props) => {
    const [selectedTime,setSelectedTime]=useState()
    return (
        <div>
            <select class="timedLogoutSelect" style={{width:140+'px'}} aria-label="Small select example" onChange={e=>setSelectedTime(e.target.value)}>
                <option selected>Select logout time</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>
            <br></br>
            
            <input className="timelogoutCB" type="checkbox" id="timed" onChange={()=>props.timedLogout(selectedTime)}></input>
        </div>
    )
}
export default TimedLogout