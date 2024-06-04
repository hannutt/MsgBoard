import { useRef, useState } from "react"
import axios from "axios"

const Search = () => {
    const [ByDate,setByDate]=useState(false)
    const [Byid,setById]=useState(false)
    //userefin avulla saadaan haku toimimaan käyttäjän antamalla syötteellä.
    //kontroillamaton komponentti
    const keywordRef = useRef()
    const handleSearch = (event) => {
        if (ByDate)
            {
                event.preventDefault();
                axios.get("http://localhost:8800/searchByDate/"+keywordRef.current.value)
                .then(res=>console.log(res.data))

            }
        else if (Byid) {
            
            event.preventDefault();
            axios.get("http://localhost:8800/searchById/"+keywordRef.current.value)
            .then(res=>console.log(res.data))

        }
      

    }
    return(
        <div>
            <label htmlForfor="bydate">Search by date</label>
            {/*()=> onclickissä estää too many re-renders virheen*/}
            <input id="bydate" type="checkbox" onClick={()=>setByDate(!ByDate)}></input>
            <br></br>
            <label htmlForfor="byid">Search by id</label>
            {/*()=> onclickissä estää too many re-renders virheen*/}
            <input id="byid" type="checkbox" onClick={()=>setById(!Byid)}></input>
            <form onSubmit={handleSearch}>
            <input type="text" ref={keywordRef}/>
            <button type="submit">Search</button>
            </form>
            
        </div>
    )
}
export default Search;