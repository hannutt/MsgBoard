import { useRef, useState } from "react"
import axios from "axios"

const Search = () => {
    const [ByDate,setByDate]=useState(false)
    //userefin avulla saadaan haku toimimaan käyttäjän antamalla syötteellä.
    const keywordRef = useRef()
    const handleSearch = (event) => {
        if (ByDate)
            {
                event.preventDefault();
                axios.get("http://localhost:8800/searchByDate/"+keywordRef.current.value)
                .then(res=>console.log(res.data))

            }
        else {
            
            event.preventDefault();
            axios.get("http://localhost:8800/searchById/"+keywordRef.current.value)
            .then(res=>console.log(res.data))

        }
      

    }
    return(
        <div>
            <input type="checkbox" onClick={()=>setByDate(!ByDate)}></input>
            <form onSubmit={handleSearch}>
            <input type="text" ref={keywordRef}/>
            <button type="submit">Search</button>
            </form>
            
        </div>
    )
}
export default Search;