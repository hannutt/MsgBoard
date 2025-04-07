const ColorSelect=(props)=>{
    
    return(
        <center>
        <div className="colSelect">
            {/*valittu väriyhdistelmä lähetetään takaisin changebarcolor funktiolle*/}
        <select class="form-select form-select-sm" aria-label="Small select example"onChange={e=>props.changeBarColors(e.target.value)}>
        <option selected value="x">Change bar colors</option>
        <option value="red,green,blue,lightblue">Red/Green/Blue/Lightblue</option>
        <option value="yellow,violet,gray,lightgray">Yellow/Violet/Gray/Lightgray</option>
        <option value="turquoise,palegreen,orange,blue">Turquoise/Pale green/Orange/Blue</option>
        </select>
        </div>
        </center>
    )
}
export default ColorSelect;