import logo from './logo.svg';
import './App.css';
import LandingPage from './pages/LandingPage';
import Authentication from './pages/Authentication';

import {BrowserRouter as Router, Routes, Route} from'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import VideoMeet from './pages/VideoMeet';

import HomeComponent from "./pages/home"
import History from './pages/history';




function App() {
  return (
    <>
   
<Router>
  <AuthProvider>

  
  <Routes>
    <Route path="/" element={<LandingPage/>} />
    <Route  path="/auth" element={<Authentication/>}  />
    <Route  path='/history'   element={ <History/> } />
    <Route path='/:url' element={<VideoMeet/>}/>
    <Route path="/home"  element={<HomeComponent/>}/>
   </Routes>
  </AuthProvider>
</Router>

    </>
  );
}

export default App;
