import { useState } from "react"
import axios from "axios"

const Search = () => {
    const [keywords,setKeyWords]=useState(1)
    const handleSearch = () => {
        axios.get("http://localhost:8800/search/"+keywords)
        .then(res=>console.log(res))

    }
    return(
        <div>
          
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}
export default Search;