const MessageCards=(props)=>{

    
    return(
      /*row row-cols-3 g-3 luokkaa järjestää kortit 3 kortin riviin,
      jonka aloitetaan aina uusi rivi*/
        
        <div class="row row-cols-4 g-3" >
          
             {props.messages.map(message =>(
              /*col-div tarvitaan myös että korttien näyttö 3:n riveissä toimii*/
              <div class="col" >
                <div class="card">
                
                <img class="card-img-top" src={props.msgIcon}  alt="Card image cap"></img>
                <div class="card-body">
                  <h5 class="card-title">{message.txtposttime}</h5>
                  <p class="card-text">{message.msgtxt}</p>
                  <p class="card-text">Likes:{message.likes}</p>
                  <p class="card-text">Unlikes:{message.unlike}</p>
                 </div>
                </div>
              </div>
           
           
            
        ))}
     
        </div>
       
   
    )
}
export default MessageCards;