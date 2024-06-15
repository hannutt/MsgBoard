import { useRef, useState } from "react"
import axios from "axios"
import Logout from "../pages/LogOut";
import SrcDrop from "./SearchDropDown";
import zoom from "../icons/zoom.png";
import {Chart as ChartJS} from "chart.js/auto";
import {Bar,Doughnut} from "react-chartjs-2";
import DatePicker from "react-datepicker";
import Carousel from "react-multi-carousel";


import "react-datepicker/dist/react-datepicker.css";
const Search = (props) => {
    const [results,setResults]=useState([])
    const [ByDate,setByDate]=useState(false)
    const [Byid,setById]=useState(false)
    const [hideId,setHideId]=useState(false)
    const [CBhide,setCBhide] = useState(true)
    const [Bykeyword,setByKeyword]=useState(false)
    const [dataInTable,setDataInTable]=useState(true)
    const [dataInDiv,setDataInDiv]=useState(false)
    const [searches,setSearches]=useState([])
    const [showStats,setSHowStats]=useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const [dateToText,setDateToText]=useState("")
    const [dg,setdg]=useState(false)
    const [bar,setBar]=useState(false)
    const [chartTxt,setChartTxt]= useState("Show in Doughnut")
    const [selection,setSelection]=useState("")
    
    
    //userefin avulla saadaan haku toimimaan käyttäjän antamalla syötteellä.
    //kontroillamaton komponentti
    const keywordRef = useRef()
    const handleSearch = async (event) => {
        if (ByDate)
            {
                
                event.preventDefault();
                //tämä on get-kutsu eli se hakee tiedon
                const res = await axios.get("http://localhost:8800/searchByDate/"+keywordRef.current.value)
                //put kutsu päivittää tietokannan taulua
                const res2 = await axios.put("http://localhost:8800/postbydate")
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
            const res2 = await axios.put("http://localhost:8800/postbykeyword")
           
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
        setSHowStats(!showStats)
    
    }
    const datePick=()=>{
        var input = document.querySelector("#src")
        input.value="date"
    }
    //vaihdetaan bar ja dougnut chartin väillä, kumpi näytetään
    const changeChart=()=>{
        //jos bar chart näkyy
        if (bar==false)
            {
                setBar(!bar)
                setdg(!dg)
                setChartTxt("Show in Bar chart")
            }
        else{
            setBar(!bar)
            setdg(!dg)
            setChartTxt("Show in Donut")
        }
    }

    const changeBarColors=()=>{
        //katkaistaan merkkijono aina pilkun kohdalta, niin saadaan tehtyä 3 väriarvosta lista.
        //eli yhdistä merkkijonosta tulee kolme eri merkkijonoa.
       setSelection(selection.split(","))
        
    }
    return(
        <div>
            <Logout/>
            <h3>Search options</h3>
            {/*state-muuttujien lähetys srcDrop komponentille */}
            <SrcDrop Byid={Byid} setById={setById} ByDate={ByDate} setByDate={setByDate} ByKeyword={Bykeyword} setByKeyword={setByKeyword}/>
            {ByDate && <DatePicker dateFormat={"dd.MM.yyyy"} draggable={true} selected={startDate} onChange={(date) => setStartDate(date)} />}
                {/*onChange={(date) => setStartDate(date)} */}
        
            
            <br></br>
            <form onSubmit={handleSearch}>
            <input id="src" type="text" ref={keywordRef} placeholder="Id, date or keyword"/>
            <div className="srcBtn">
            <button class="btn btn-primary btn-sm" type="submit">Search <span class="badge text-bg-secondary"><img src={zoom}></img></span></button>
            </div>
            </form>
            <br></br>
            <div className="statsBtn">
            <button class="btn btn-primary btn-sm" onClick={statistics}> Show search statistics</button>
            </div>
            <label hidden={CBhide} htmlFor="hideId">Hide id</label>
            <input hidden={CBhide} type="checkbox" id="hideId" onChange={()=>setHideId(!hideId)}></input>
            <div>
      
        
        </div>
            {searches.map(s=>(
                <div hidden={showStats} className="stats">
                <p>Searches by ID: {s.byid}</p>
                <p>Searches by date: {s.bydate}</p>
                <p>Searches by Keyword: {s.bykeyword}</p>
                {/*bar chartin piirto*/}
            <label htmlFor="dg">{chartTxt}</label>
            <input type="checkbox" id="dg" onChange={changeChart}></input>
     
        <select class="form-select form-select-sm" aria-label="Small select example"onChange={e=>setSelection(e.target.value)}>
        <option selected value="x">Change bar colors</option>
        <option value="red,green,blue">Red/Green/Blue</option>
        <option value="yellow,black,pink">Yellow/Black/Pink</option>
        <option value="blue">Blue</option>
        </select>
        <button onClick={changeBarColors}>Change colors</button>
            
                <Bar hidden={bar} 
                
               
                options={{
                    //kokosuhde
                    aspectRatio: 3,  // this would be a 1:1 aspect ratio
                }}
                data={{
                    labels:["By id","By date","By keyword"],
                    datasets:[
                        {
                            label:"Searches by",
                            data:[s.byid,s.bydate,s.bykeyword],
                            backgroundColor:[selection[0],selection[1],selection[2]]
                            
                        },
                    ],
                }}
                
                />
                {dg &&<Doughnut
                  options={{
                    //kokosuhde
                    aspectRatio: 3,  // this would be a 1:1 aspect ratio
                }}
                  data={{
                    labels:["By id","By date","By keyword"],
                    datasets:[
                        {
                            label:"Searches by",
                            data:[s.byid,s.bydate,s.bykeyword]
                        },
                    ],
                }}/>}
             
              
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