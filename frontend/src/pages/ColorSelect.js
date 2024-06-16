const ColorSelect=(props)=>{
    return(
        <div className="colSelect">
        <select class="form-select form-select-sm" aria-label="Small select example"onChange={e=>props.setSelection(e.target.value)}>
        <option selected value="x">Change bar colors</option>
        <option value="red,green,blue">Red/Green/Blue</option>
        <option value="yellow,violet,gray">Yellow/Violet/Gray</option>
        <option value="turquoise,palegreen,orange">Turquoise/Pale green/Orange</option>
        </select>
        </div>
    )
}
export default ColorSelect;