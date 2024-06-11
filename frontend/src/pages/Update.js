import axios from "axios";
import { useEffect,useRef,useState } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const Update=()=>{
    const [results, setResults] = useState([])
    const [newText,setNewText] = useState("")
    const [newPostDate,setNewPostDate]=useState("")
    const location = useLocation()
    const updateid =location.pathname.split("/")[2]
    const [message,setMessage]=useState({
        message:'',
       
        postDate:'',
    })
    
    //useparamsilla saadaan esim http://localhost:3000/update/4 osoitteesta luku 4 eli id
    //id nimi on annettu app.js Routen yhteydessä ja se voi olla muukin kuin id nimeltään.
    //id määritellään myös klikauksen yhteydessä message.komponentissa nimellä message.id
    let {id}=useParams();
    console.log(id)
    //useeffect suoritta geData funktion heti sivun latauduttua. eli hakee id:llä tiedot kannasta.
    const handleupdateData=(e)=>{
        setMessage((prev)=>({...prev,[e.target.name]:e.target.value}))
        console.log(message)
        console.log(newText)

   

}
const updateData = async e => {
    try{
        //updateid = esim. "http://localhost:8800/update/4
        await axios.put("http://localhost:8800/update/"+updateid,message)
    } catch(err){
        console.log(err)
    }
   }
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
                <div>
                    <h3>Current data</h3>
                {/*vanha teksti näytetään placeholderina että päivitys onnistuu*/}
                <input type="text" value={result.msgtxt} readOnly ></input>
             
                <input type="tetx" value={result.txtposttime} readOnly ></input>
                <br></br>
                
                </div>
                

            ))}
            <h3>New data</h3>
            {/*input kenttien nimien täytyy olla samat kuin messages statemuuttujan propertyt 
            eli tässä tapauskessa message ja postDate muuten handleupdata funktiossa setMessage state
            ei löydä arvoja eikä tallenna tekstiä message kenttään / päivämäärää posdate kenttään*/}
            <input type="text" name="message" onChange={handleupdateData}></input>
            <input type="text" name="postDate" onChange={handleupdateData}></input>
            <button onClick={updateData}>Update</button>
      
        </div>
    )
}

export default Update;