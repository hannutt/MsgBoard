import {BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom';
import Messages from "./pages/Messages";
import Add from "./pages/Add";
import "./styleFile.css";
import Login from "./pages/Login";
import Search from './pages/Search';
import CreateAccount from './pages/CreateAccount'
import PrivateRoutes from './pages/PrivateRoutes';
import Update from './pages/Update';
import MailSender from './pages/mailSender';
import ErrorPage from './pages/ErrorPage';
import MyProfile from './pages/MyProfile';

function App() {
  
 

  
  return (
    <div className="App">
      
      {/*
      <h2 className='title'>Message Board</h2>*/}
      
     
      {/*routerin käyttö eli linkitys toisille sivuille*/}
      <BrowserRouter>
      {/*komponenttien täytyy olla browserrouterin alla, että navigate toimii
      Login komponentti oli aiemmin tässä, jolloin se näkyi myös add ja search näkymissä*/}
      
      <Routes>
        {/*reititys endpointin mukaan, jos etusivu eli pelkkä localhost:3000
        näytetään messages komponentti jo localhost/add niin näytetään add komponentti
        HUOM private routesin sisällä olevat komponentit ovat suojattuja eli niihin
        ei pääse ilman kirjautumista ja localstoragesta haettu auth:true arvoa. ks login & privateRoutes.*/}
        <Route element={<PrivateRoutes/>}>
          <Route path='/messages' element={<Messages/>}/>
          <Route path="/Add/:user" element={<Add/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/update/:id" element={<Update/>}/>
          {/*user saadaan localstoragesta ja se määritellään tarkemmin dropdown.js komponentissä
          se täytyy kuitenkin määritellä myös tässä :user (tai millä tahansa) päättellä että reititys toimii*/}
          <Route path="/profile/:user" element={<MyProfile/>}/>
          
          
          
          
          </Route>
          {/*nämä ei ole suojattuja routeja, eli niihin pääsee kirjautumatta*/}
          <Route path="/create" element={<CreateAccount/>}/>
          <Route path='/' element={<Login/>}/>
          {/*
          <Route path="/mail" element={<MailSender/>}/>*/}
          <Route path="/error" element={<ErrorPage/>}/>
          
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
