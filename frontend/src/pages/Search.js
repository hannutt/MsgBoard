import { useRef, useState } from "react"
import axios from "axios"
import Logout from "../pages/LogOut";
import SrcDrop from "./SearchDropDown";

const Search = () => {
    const [results,setResults]=useState([])
    const [ByDate,setByDate]=useState(false)
    const [Byid,setById]=useState(false)
    const [hideId,setHideId]=useState(false)
    const [CBhide,setCBhide] = useState(true)
    const [Bykeyword,setByKeyword]=useState(false)
  
    //userefin avulla saadaan haku toimimaan käyttäjän antamalla syötteellä.
    //kontroillamaton komponentti
    const keywordRef = useRef()
    const handleSearch = async (event) => {
        if (ByDate)
            {
                
                event.preventDefault();
                const res = await axios.get("http://localhost:8800/searchByDate/"+keywordRef.current.value)
                setResults(res.data)
                //checkbox tulee hakutulosten myötä näkyväksi
                setCBhide(!CBhide)

            }
        else if (Byid) {
            //funktion täytyy olla asynkroonien ja axios kutsun await, että haku toimii
            event.preventDefault();
           
            const res = await axios.get("http://localhost:8800/searchById/"+keywordRef.current.value)
            console.log(res)
            setResults(res.data)
            setCBhide(!CBhide)  
        }
        else if (Bykeyword) {
            event.preventDefault();
           
            const res = await axios.get("http://localhost:8800/searchByKeyWord/"+keywordRef.current.value)
            console.log(res)
            setResults(res.data)
            setCBhide(!CBhide)  
        }
      

    }
    return(
        <div>
            <Logout/>
            {/*state-muuttujien lähetys srcDrop komponentille */}
            <SrcDrop Byid={Byid} setById={setById} ByDate={ByDate} setByDate={setByDate} ByKeyword={Bykeyword} setByKeyword={setByKeyword}/>
         
            <form onSubmit={handleSearch}>
            <input type="text" ref={keywordRef} placeholder="Id, date or keyword"/>
            <button type="submit">Search</button>
            </form>
            <label hidden={CBhide} htmlFor="hideId">Hide id</label>
            <input hidden={CBhide} type="checkbox" id="hideId" onChange={()=>setHideId(!hideId)}></input>
            {results.map(result=>(
                <div className="searchView" key={result.id}>
                <p hidden={hideId}>Message id: {result.id}</p>
                <p>Message text: {result.msgtxt}</p>
                <p>Message post date: {result.txtposttime}</p>
                </div>
            ))}
         
            {/*ehdollinen renderöinti jos results muuttujassa on enemmän kuin 0 merkkiä
             results.length>0 &&<Translate/>*/}
            
        </div>
    )
}
export default Search;