import { useRef, useState } from "react"
import axios from "axios"
import Logout from "../pages/LogOut";
import SrcDrop from "./SearchDropDown";
import zoom from "../icons/zoom.png";
import {Chart as ChartJS} from "chart.js/auto";
import {Bar} from "react-chartjs-2";
const Search = () => {
    const [results,setResults]=useState([])
    const [ByDate,setByDate]=useState(false)
    const [Byid,setById]=useState(false)
    const [hideId,setHideId]=useState(false)
    const [CBhide,setCBhide] = useState(true)
    const [Bykeyword,setByKeyword]=useState(false)
    const [dataInTable,setDataInTable]=useState(true)
    const [dataInDiv,setDataInDiv]=useState(false)
    const [searches,setSearches]=useState([])
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
           //toteutetaan 2 axios kutsuta get ja post. toinen hakee tiedot ja toinen tallentaa.
            const res = await axios.get("http://localhost:8800/searchById/"+keywordRef.current.value)
            const res2 = await axios.put("http://localhost:8800/postbyid")
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
    const handleTable=()=>{
        setDataInDiv(!dataInDiv)
        setDataInTable(!dataInTable)
    }
    const statistics= async ()=>{
        const res = await axios.get("http://localhost:8800/searches")
        console.log(res)
        setSearches(res.data)

    }
    return(
        <div>
            <Logout/>
            {/*state-muuttujien lähetys srcDrop komponentille */}
            <SrcDrop Byid={Byid} setById={setById} ByDate={ByDate} setByDate={setByDate} ByKeyword={Bykeyword} setByKeyword={setByKeyword}/>
         
            <form onSubmit={handleSearch}>
            <input type="text" ref={keywordRef} placeholder="Id, date or keyword"/>
            <div className="srcBtn">
            <button class="btn btn-primary btn-sm" type="submit">Search <span class="badge text-bg-secondary"><img src={zoom}></img></span></button>
            </div>
            </form>
            <button onClick={statistics}>Search statistics</button>
            <label hidden={CBhide} htmlFor="hideId">Hide id</label>
            <input hidden={CBhide} type="checkbox" id="hideId" onChange={()=>setHideId(!hideId)}></input>
            {searches.map(s=>(
                <div className="stats">
                <p>Searches by ID: {s.byid}</p>
                <p>Searches by date: {s.bydate}</p>
                <p>Searches by Keyword: {s.bykeyword}</p>
                <Bar
                data={{
                    labels:["By id","By date","By keyword"],
                    datasets:[
                        {
                            label:"Searches by",
                            data:[s.byid,s.bydate,s.bykeyword]
                        },
                    ],
                }}
                />
                </div>

            ))}
            {results.map(result=>(
                <div className="searchView" hidden={dataInDiv} key={result.id}>
                <p hidden={hideId}>Message id: {result.id}</p>
                <p>Message text: {result.msgtxt}</p>
                <p>Message post date: {result.txtposttime}</p>
                <label htmlFor="inTable">Show data in table</label>
                <input id="inTable" type="checkbox" onClick={handleTable}></input>
                </div>
            ))}
          
        
                 {results.map(message => (
                    <div>
                <table className="tableMessages" hidden={dataInTable}>
                    <tr>
                        <td>ID</td>
                        <td>Message</td>
                        <td>Posted</td>
                        <td>Likes</td>
                        <td>Unlikes</td>
                    </tr>
                    <tr>
                        <td>{message.id}</td>
                        <td>{message.msgtxt}</td>
                        <td>{message.txtposttime}</td>
                        <td>{message.likes}</td>
                        <td>{message.unlikes}</td>
                    </tr>
                </table>
                <label htmlFor="inTable">Show data in div</label>
                <input id="inTable" type="checkbox" onClick={handleTable}></input>
                </div>
                ))}
               
         
            {/*ehdollinen renderöinti jos results muuttujassa on enemmän kuin 0 merkkiä
             results.length>0 &&<Translate/>*/}
            
        </div>
    )
}
export default Search;