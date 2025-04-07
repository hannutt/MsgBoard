import { useState } from "react"

const TimedLogout = (props) => {
    const [selectedTime, setSelectedTime] = useState()
    return (
        <div>
            <select class="timedLogoutSelect" style={{ width: 140 + 'px' }} aria-label="Small select example" onChange={e => setSelectedTime(e.target.value)}>
                <option selected>Select logout time</option>
                <option value="5">5 seconds</option>
                <option value="10">10 seconds</option>
                <option value="20">20 seconds</option>
                <option value="30">30 seconds</option>
            </select>
            <br></br>
            <span className="timedlogoutlbl">
            <div class="form-check">
                
                     {/*onchangessa lähetetään selectedtime eli valittu aika timedLogout funktiolle*/}
                <input class="form-check-input" type="checkbox" value="" id="timed" onClick={() => props.timedLogout(selectedTime)}></input>
                    <label class="form-check-label" for="timed">Verify timed logout</label>
            </div>
  
            </span>
           
          
        </div>
    )
}
export default TimedLogout