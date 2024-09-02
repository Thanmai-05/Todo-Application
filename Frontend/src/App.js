import React, { useState ,useEffect} from 'react';
import {BrowserRouter as Router,Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import TaskManager from './components/TaskManager';
import Login from './components/login';
import CustomNavbar from './components/navbar';
import Register from './components/Register';
import Home from './components/home';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";
import Cookies from 'js-cookie'
axios.defaults.withCredentials = true;

function App(){
  return(
    <Router>
      <MainComponent/>
    </Router>
  )
}

function MainComponent() {
  ///const isAuth = localStorage.getItem('isAuthenticated')
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    //const token = localStorage.getItem('token');
    const token = Cookies.get('token');
    console.log("token:",token)
    if(Cookies.get('isauth')==="true"){
      console.log("isauth in app.js: ",typeof(Cookies.get('isauth')))
      axios.get('http://localhost:5000/api/validate-token')
      .then(response => {
        console.log(response.data.user)
        setIsAuthenticated(true);
        console.log("validated token", isAuthenticated)
        ///localStorage.setItem("isAuthenticated", isAuthenticated)
        ///setUser(localStorage.getItem('user')); // Assuming you store username in localStorage
        setUser(response.data.user)
        
        console.log("user at app.js:",user)
      })
      .catch(error => {
        if(error.response&& error.response.status === 401){
          console.log('Unauthorized access. Redirecting to login.');
          setIsAuthenticated(false);
          setUser(null)
          navigate('/login');
        }
        else{
        console.error('Token validation failed:', error);
        ///localStorage.removeItem('token');
        ///localStorage.removeItem('user');
        ///localStorage.removeItem('isAuthenticated');
        console.log('error',error)
        setIsAuthenticated(false);
        setUser(null);
      }
      });}
      else{
        console.log('no token')
        console.log("Unauthorised acces. Navigating to login.")
        setIsAuthenticated(false);
        setUser(null);
        
      }
    });
  
  return (
    
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
    

);
}

export default App;
    
    

