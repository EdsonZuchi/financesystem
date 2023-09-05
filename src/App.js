import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Auth from "./auth/Auth"
import Menu from "./menu/Menu"
import Bead from "./bead/Bead"

function App() {
  const isAuthenticated = loggedIn();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/menu" : "/auth"}/>}/>
        <Route path="/auth" element={isAuthenticated ? <Navigate to="/menu"/> : <Auth/>}></Route>
        <Route path="/menu" element={isAuthenticated ? <Menu/> : <Navigate to="/auth"/>} ></Route>
        <Route path="/bead" element={isAuthenticated ? <Bead/> : <Navigate to="/auth"/>} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

function loggedIn(){
  if(localStorage.getItem("user_id") != null){
    return true; 
  }
  return false;
}

export default App;
