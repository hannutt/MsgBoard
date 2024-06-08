import axios from "axios";
import { useEffect,useRef,useState } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const Update=()=>{
    const [results, setResults] = useState([])
    const location = useLocation();
    //useparamsilla saadaan esim http://localhost:3000/update/4 osoitteesta luku 4 eli id
    //id nimi on annettu app.js Routen yhteydessä ja se voi olla muukin kuin id nimeltään.
    //id määritellään myös klikauksen yhteydessä message.komponentissa nimellä message.id
    let {id}=useParams();
    console.log(id)
    //useeffect suoritta geData funktion heti sivun latauduttua. eli hakee id:llä tiedot kannasta.
    useEffect(() => {
        const getData= async()=>{
            const res = await axios.get("http://localhost:8800/dataToUpdate/"+id)
            setResults(res.data)
    
        }
    
        //funktiokutsu
        getData()
    }, [])
    
   

   
    
    return(
        
        <div>
            <h2>Update post</h2>
         
           
            <br></br>
           
            {results.map(result=>(
                <p>
                <input type="text" value={result.msgtxt}></input>
                <input type="tetx"value={result.txtposttime}></input>
                </p>
                

            ))}
      
        </div>
    )
}

export default Update;