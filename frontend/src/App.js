import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Messages from "./pages/Messages";
import Add from "./pages/Add";
import "./styleFile.css";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <h2 className='title'>Message Board</h2>
     
      {/*routerin käyttö eli linkitys toisille sivuille*/}
      <BrowserRouter>
      <Login/>
      <Routes>
        {/*reititys endpointin mukaan, jos etusivu eli pelkkä localhost:3000
        näytetään messages komponentti jo localhost/add niin näytetään add komponentti*/}
        
        <Route path='/messages' element={<Messages/>}/>
        <Route path="/Add" element={<Add/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
