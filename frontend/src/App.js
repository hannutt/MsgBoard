import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Messages from "./pages/Messages";
import Add from "./pages/Add";
import "./styleFile.css";
import Login from "./pages/Login";
import Search from './pages/Search';

function App() {
  return (
    <div className="App">
      <h2 className='title'>Message Board</h2>
     
      {/*routerin käyttö eli linkitys toisille sivuille*/}
      <BrowserRouter>
      {/*komponenttien täytyy olla browserrouterin alla, että navigate toimii
      Login komponentti oli aiemmin tässä, jolloin se näkyi myös add ja search näkymissä*/}
      
      <Routes>
        {/*reititys endpointin mukaan, jos etusivu eli pelkkä localhost:3000
        näytetään messages komponentti jo localhost/add niin näytetään add komponentti*/}
        <Route path='/' element={<Login/>}/>
        <Route path='/messages' element={<Messages/>}/>
        <Route path="/Add" element={<Add/>}/>
        <Route path="/search" element={<Search/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
