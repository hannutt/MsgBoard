const MessageCards=(props)=>{

    return(
        <div>
             {props.messages.map(message =>(
                <div class="card" style={{width: 12 +"rem;"}}>
                <img class="card-img-top" src={props.msgIcon}  alt="Card image cap"></img>
                <div class="card-body">
                  <h5 class="card-title">{message.txtposttime}</h5>
                  <p class="card-text">{message.msgtxt}</p>
                 
                </div>
              </div>
           
           
            
        ))}
     
        </div>
       
   
    )
}
export default MessageCards;