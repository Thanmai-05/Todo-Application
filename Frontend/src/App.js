import React, { useState ,useEffect} from 'react';
import {BrowserRouter as Router,Routes, Route, Navigate} from 'react-router-dom';
import TaskManager from './components/TaskManager';
import Login from './components/login';
import CustomNavbar from './components/navbar';
import Register from './components/Register';
import Home from './components/home';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";



function App() {
  const isAuth = localStorage.getItem('isAuthenticated')
  const [isAuthenticated, setIsAuthenticated] = useState(isAuth?isAuth:false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/validate-token', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        //console.log(response.data)
        setIsAuthenticated(true);
        console.log("validated token", isAuthenticated)
        localStorage.setItem("isAuthenticated", isAuthenticated)
        setUser(localStorage.getItem('user')); // Assuming you store username in localStorage
      })
      .catch(error => {
        console.error('Token validation failed:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        console.log('error',error)
        setIsAuthenticated(false);
        setUser(null);
      });
    }
  });



  return (
    <Router>
      <div style={{display:'flex', flexDirection:'column'}}>
        <CustomNavbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} user={user} />
        <h1 style={{position:'relative',marginBottom:'15px',fontWeight:'bolder', marginTop:'25px'}}>TODO LIST</h1>
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser}/>} ></Route>
          <Route path="/taskmanager" element={isAuthenticated ? <TaskManager />: <Navigate to='/Login' />} />
          <Route path="/register" element={<Register />} />
          <Route path='/' element={<Home/>}/>
          {/*<Route path='/' element={<Login setIsAuthenticated={setIsAuthenticated}/>}/>*/}
        </Routes>
      </div>
    </Router>

);
}

export default App;
    
    

