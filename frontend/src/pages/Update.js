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
    
    //useparamsilla saadaan esim http://localhost:3000/update/4 osoitteesta luku 4 eli id
    //id nimi on annettu app.js Routen yhteydessä ja se voi olla muukin kuin id nimeltään.
    //id määritellään myös klikauksen yhteydessä message.komponentissa nimellä message.id
    let {id}=useParams();
    console.log(id)
    //useeffect suoritta geData funktion heti sivun latauduttua. eli hakee id:llä tiedot kannasta.
    const updateData= async()=>{
       
        console.log(updateid)
        console.log(newText)
        try{
            await axios.put("http://localhost:8800/update/"+updateid)
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
                {/*vanha teksti näytetään placeholderina että päivitys onnistuu*/}
                <input type="text" placeholder={result.msgtxt} ></input>
             
                <input type="tetx" placeholder={result.txtposttime} ></input>
                <br></br>
                
                </div>
                

            ))}
            <p>New data</p>
            <input type="text" onChange={e=>setNewText(e.target.value)}></input>
            <input type="text" onChange={e=>setNewPostDate(e.target.value)}></input>
            <button onClick={updateData}>Update</button>
      
        </div>
    )
}

export default Update;