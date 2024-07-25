import React, { useState ,useEffect} from 'react';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import TaskManager from './components/TaskManager';
import Login from './components/login';
import CustomNavbar from './components/navbar';
import Register from './components/Register';
import Home from './components/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div style={{display:'flex', flexDirection:'column'}}>
        <CustomNavbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <h1 style={{position:'relative',marginBottom:'15px',fontWeight:'bolder', marginTop:'25px'}}>TODO LIST</h1>
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} ></Route>
          <Route path="/taskmanager" element={<TaskManager />} />
          <Route path="/register" element={<Register />} />
          <Route path='/' element={<Home/>}/>
          {/*<Route path='/' element={<Login setIsAuthenticated={setIsAuthenticated}/>}/>*/}
        </Routes>
      </div>
    </Router>

);
}

export default App;
    
    
    
//helloo
