import {React,useState,useEffect} from "react";
import axios from 'axios';
import msgIcon from "../icons/messenger.png"
import likeIcon from "../icons/like.png";
import binIcon from "../icons/bin.png";
import addIcon from "../icons/plus.png";
import { Link } from "react-router-dom";
import unlikeIcon from "../icons/unlike.png"

const Messages = (props)=>{
    
    //tähän statemuuttuja listaan talletetaan kannasta haettu data
    const [messages,setMessages]=useState([])
    const [isLogged,setLogged] = useState(false)
    
    
    useEffect(()=>{
        const fetchAllData = async ()=>{
            try{
                //axios get kutsu suluissa oleva endpoint on index.js tiedostossa määritelty
                const res= await axios.get("http://localhost:8800/messages")
                console.log(res)
                //res.data talletetaan statemuuttujaan.
                setMessages(res.data)

            }catch(err){
                console.log(err)

            }
        }
        //funktiokutsu
        fetchAllData()
    },[])

    const handleLike = async (id) => {
        try{
            await axios.put("http://localhost:8800/like/"+id)
        
    }catch(err){
        console.log(err)

    }
}

 
    
   const handleUnLike = async (id)=>{
    try{
        await axios.put("http://localhost:8800/unlike/"+id)
    }catch(err){
        console.log(err)
    }
   }   
  
    const handleDelete = async (id)=>{
        try{
            await axios.delete("http://localhost:8800/messages/"+id)
            window.location.reload();

        }catch(err){
            console.log(err)

        }
    }
    return(

        <div>
            <div className="msg">
                {/*map metodilla käytään listan alkiot läpi* message on toistomuuttuja samalla
                lailla kuin esim i for loopissa*/}
                {messages.map(message=>(
                    <div className="message" key={message.id}>
                    {/*ikoneita pystyy käyttämään silmukassa*/}
                    
                    <img src={msgIcon} alt="icon"></img>
                    <p>Message id: {message.id}</p>
                    <p>{message.msgtxt}</p>
                    <p className="msgTime">Posting time: <b>{message.txtposttime}</b></p>
                    <p>Likes: {message.likes}</p>
                    <p>Unlikes: {message.unlike}</p>
                   
                    
                    {/*lähetetään postauksen id numero handleDelete fuktiolle*/}
                    <button disabled={props.delBtnDisable} onClick={()=>handleDelete(message.id)}>
                        <img src={binIcon}></img>
                    </button>
                    <button onClick={()=>handleLike(message.id)}>
                        {/*png kuvan sisällytys button elementtiin.*/}
                    <img src={likeIcon}></img>
                    </button>
                    <button className="delbtn" onClick={()=>handleUnLike(message.id)}>
                        <img src={unlikeIcon}></img>
                    </button>
                  
                    </div>
                    

                ))}

                
                {/*viestien kokonaismäärä näytetään map silmukan ulkopuolella, muuten se tulostuisi
                jokaisen viestin yhteydessä erikseen*/}
                <p className="msgTotal">Total messages: {messages.length}</p>
            </div>
            <button className="addBtn">
                {/*linkitys add endpointtiin buttonissa*/}
                <Link to="/Add">Add new post</Link>
            </button>
        </div>
    )

}
export default Messages;