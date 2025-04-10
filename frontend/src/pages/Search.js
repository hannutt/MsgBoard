import { useRef, useState } from "react"
import axios from "axios"
import Logout from "../pages/LogOut";
import SrcDrop from "./SearchDropDown";
import zoom from "../icons/zoom.png";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import Carousel from "react-multi-carousel";
import ColorSelect from "./ColorSelect";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigation } from "react-router-dom";
import ErrorPage from "./ErrorPage";
const Search = () => {

    const [results, setResults] = useState([])
    const [ByDate, setByDate] = useState(false)
    const [Byid, setById] = useState(false)
    const [hideId, setHideId] = useState(false)
    const [CBhide, setCBhide] = useState(true)
    const [Bykeyword, setByKeyword] = useState(false)
    const [dataInTable, setDataInTable] = useState(true)
    const [dataInDiv, setDataInDiv] = useState(false)
    const [searches, setSearches] = useState([])
    const [showStats, setSHowStats] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const [mostLikes, setMostLikes] = useState(false)
    const [dg, setdg] = useState(false)
    const [bar, setBar] = useState(false)
    const [chartTxt, setChartTxt] = useState("Show in Doughnut")
    const [selection, setSelection] = useState("")
    const [likeData, setLikeData] = useState([])
    const [unLikeData, setUnlikeData] = useState([])
    const [noMatches, setNoMatches] = useState(false)
    const [sqlErr, setSqlErr] = useState("NO MATCHES")


    //userefin avulla saadaan haku toimimaan käyttäjän antamalla syötteellä.
    //kontroillamaton komponentti
    const keywordRef = useRef()
    const handleSearch = async (event) => {
        if (ByDate) {

            event.preventDefault();
            //tämä on get-kutsu eli se hakee tiedon
            const res = await axios.get("http://localhost:8800/searchByDate/" + keywordRef.current.value)
            //put kutsu päivittää tietokannan taulua eli tallentaa hakukerran tauluun
            const res2 = await axios.put("http://localhost:8800/postbydate")
            setResults(res.data)
            //checkbox tulee hakutulosten myötä näkyväksi
            setCBhide(!CBhide)
            console.log(res)
            if (res.data.length == 0) {
                setNoMatches(!noMatches)
            }


        }
        else if (Byid) {
            //funktion täytyy olla asynkroonien ja axios kutsun await, että haku toimii
            event.preventDefault();
            //toteutetaan 2 axios kutsuta get ja post. toinen hakee tiedot ja toinen tallentaa.
            const res = await axios.get("http://localhost:8800/searchById/" + keywordRef.current.value)
            const res2 = await axios.put("http://localhost:8800/postbyid")
            console.log(res)
            setResults(res.data)
            setCBhide(!CBhide)
            if (res.data.length == 0) {
                setNoMatches(!noMatches)
            }
        }
        else if (Bykeyword) {
            event.preventDefault();

            const res = await axios.get("http://localhost:8800/searchByKeyWord/" + keywordRef.current.value)
            const res2 = await axios.put("http://localhost:8800/postbykeyword")

            console.log(res)
            setResults(res.data)
            setCBhide(!CBhide)
            if (res.data.length == 0) {

                setNoMatches(!noMatches)
            }
        }
        else if (mostLikes) {
            event.preventDefault();
            const res = await axios.get("http://localhost:8800/mostliked")
            const res2 = await axios.get("http://localhost:8800/leastliked")
            const res3 = await axios.put("http://localhost:8800/postbylikes")
            setLikeData(res.data)
            setUnlikeData(res2.data)

        }


    }
    const handleTable = () => {
        setDataInDiv(!dataInDiv)
        setDataInTable(!dataInTable)
    }
    const statistics = async () => {

        const res = await axios.get("http://localhost:8800/searches")
        console.log(res)
        setSearches(res.data)
        setSHowStats(!showStats)

    }

    //vaihdetaan bar ja dougnut chartin väillä, kumpi näytetään
    const changeChart = () => {
        //jos bar chart näkyy
        if (bar == false) {
            setBar(!bar)
            setdg(!dg)
            setChartTxt("Show in Bar chart")
        }
        else {
            setBar(!bar)
            setdg(!dg)
            setChartTxt("Show in Donut chart")
        }
    }

    //values sisältää valitun väriyhdistelmän joka valitaan colorselect komponentissa
    //eli tässä se otetaan vastaan.
    const changeBarColors = (values) => {
        //katkaistaan merkkijono aina pilkun kohdalta, niin saadaan tehtyä 3 väriarvosta lista.
        //eli yhdistä merkkijonosta tulee kolme eri merkkijonoa.
        setSelection(values.split(","))

        //document.querySelector(".changeBarColorBtn").click()


    }

    return (
        <div>
            <nav aria-label="breadcrumb"style={{ marginLeft: 10 + "px" }}>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#"><Link to="/messages">Messages</Link></a></li>
                    <li class="breadcrumb-item"><a href="#"><Link to="/search">Search</Link></a></li>

                </ol>
            </nav>
            <Logout />
            <h3 style={{ marginLeft: 10 + "px" }}>Search options</h3>
            {/*state-muuttujien lähetys srcDrop komponentille */}
            <SrcDrop  Byid={Byid} setById={setById} ByDate={ByDate} setByDate={setByDate} ByKeyword={Bykeyword} setByKeyword={setByKeyword} mostLikes={mostLikes} setMostLikes={setMostLikes} />
            {ByDate && <DatePicker dateFormat={"dd.MM.yyyy"} selected={startDate} onChange={(date) => setStartDate(date)} />}
            {/*onChange={(date) => setStartDate(date)} */}


            <br></br>
            <div className="flex-search">
                <form onSubmit={handleSearch}>
                    <div>
                        <input id="src" type="text" ref={keywordRef} placeholder="Id, date or keyword" style={{ marginLeft: 10 + "px" }} />

                        <button class="btn btn-primary btn-sm" style={{ marginLeft: 10 + "px" }} type="submit">Search</button>
                    </div>

                </form>


                <button class="btn btn-primary btn-sm" style={{ marginLeft: 10 + "px" }} onClick={statistics}> Show search statistics</button>



            </div>

            {searches.map(s => (
                <div hidden={showStats} className="stats">
                    <p>Searches by ID: {s.byid}</p>
                    <p>Searches by date: {s.bydate}</p>
                    <p>Searches by Keyword: {s.bykeyword}</p>
                    <p>Searches by likes: {s.byliked}</p>

                    <label htmlFor="dg">{chartTxt}</label>
                    <input type="checkbox" id="dg" onChange={changeChart}></input>


                    {/*colorselect komponentti muuttaa propsina saamansa staten arvoa
       state on määritelty Search komponentissa mutta sen arvoa voi muuttaa toisessa*/}
                    <br></br>
                    <ColorSelect setSelection={setSelection} selection={selection} changeBarColors={changeBarColors} />
                    <br></br>
                    {/*}
        <button id="changeBarColorBtn" class="btn btn-primary btn-sm" onClick={changeBarColors}>Change colors</button>*/}

                    {/*bar chartin piirto*/}
                    <Bar hidden={bar} style={{ width: 800 + "px", height: 40 + "px" }}


                        options={{
                            //kokosuhde
                            aspectRatio: 3,  // this would be a 1:1 aspect ratio
                        }}
                        data={{
                            labels: ["By id", "By date", "By keyword", "By likes"],
                            datasets: [
                                {
                                    label: "Searches by",
                                    data: [s.byid, s.bydate, s.bykeyword, s.byliked],
                                    //taustavärit saadaan selection lista alkioista 0-2
                                    backgroundColor: [selection[0], selection[1], selection[2], selection[3]]

                                },
                            ],
                        }}

                    />
                    {/*donitsikaavio jos dg-state on true*/}
                    {dg && <Doughnut
                        options={{
                            //kokosuhde
                            aspectRatio: 3,  // this would be a 1:1 aspect ratio
                        }}
                        data={{
                            labels: ["By id", "By date", "By keyword", "By likes"],
                            datasets: [
                                {
                                    label: "Searches by",
                                    data: [s.byid, s.bydate, s.bykeyword, s.byliked],
                                    backgroundColor: [selection[0], selection[1], selection[2], selection[3]]
                                },
                            ],
                        }} />}


                </div>

            ))}


            {results.map(result => (
                <div className="searchView" hidden={dataInDiv} key={result.id}>
                    <p hidden={hideId}>Message id: {result.id}</p>
                    <p>Message text: {result.msgtxt}</p>
                    <p>Message post date: {result.txtposttime}</p>
                    <label htmlFor="inTable">Show data in table</label>
                    <input id="inTable" type="checkbox" onClick={handleTable}></input>
                </div>
            ))}

            {likeData.map(l => (
                <div className="mostLikes" key={l.id}>
                    <h3>Most liked post</h3>
                    <p hidden={hideId}>Message id: {l.id}</p>
                    <p>Message text: {l.msgtxt}</p>
                    <p>Likes: {l.likes}</p>
                    {/*}
                    <label htmlFor="inTable">Show data in table</label>
                    <input id="inTable" type="checkbox" onClick={handleTable}></input>*/}
                </div>
            ))}
            {unLikeData.map(u => (
                <div className="mostLikes" key={u.id}>
                    <h3>Least liked post</h3>
                    <p hidden={hideId}>Message id: {u.id}</p>
                    <p>Message text: {u.msgtxt}</p>
                    <p>Unlikes: {u.unlike}</p>
                    {/*}
                    <label htmlFor="inTable">Show data in table</label>
                    <input id="inTable" type="checkbox" onClick={handleTable}></input>*/}
                </div>
            ))}


            {results.map(message => (
                <div>
                    <h3 className="srcTitle">Search results</h3>
                    <br></br>
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
                    <br></br>
                   
                    <div class="form-check">
        
                            <label class="form-check-label" for="inTable">Show data in div</label>
                            <input class="form-check-input" type="checkbox" value="" id="inTable" onClick={handleTable}></input>
                            
                    </div>
              
                </div>
            ))}


            {/*ehdollinen renderöinti jos nomatch on true näytetään errorpage
            noMatches muuttuu trueksi, jos axios kutsun res muuttujan sisältö on tyhjä.
             results.length>0 &&<Translate/>*/}
            {noMatches && <ErrorPage sqlErr={sqlErr} />}

        </div>
    )
}
export default Search;