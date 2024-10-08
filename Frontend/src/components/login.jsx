import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
axios.defaults.withCredentials = true;
const Backend_url = process.env.REACT_APP_BACKEND_URL;

function Login({setIsAuthenticated, setUser}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginsnack, setloginsnack] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      console.log('in handle login')
      await axios.post(`${Backend_url}/api/login`, { username, password });
      ///localStorage.setItem('token', response.data.token);
      ///localStorage.setItem('user', response.data.username)
      setIsAuthenticated(true);
      console.log(username)
      setUser(username)
      setloginsnack(true);
      console.log(loginsnack)
      navigate('/taskmanager');
    } catch (error) {
      alert("Login Failed. Invalid Credentials!!!.")
      setUsername("")
      setPassword("")
      console.error('Login failed', error.response?.data?.error);
    }
  };
  const handleclosesnackbar = () => {
    setloginsnack(false)
  }
  /*const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/register', { username, password });
      alert('User registered successfully');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Registration failed', error.response.data.error);
    }
  };*/

  return (
    <div className='container'>
      <h2>Login</h2>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button   onClick={handleLogin}>Login</button>
      <p style={{ display: 'flex', justifyContent:'center' , margin:'10px'}}>If Not an existing user.   <a href='/register'>Register</a></p>
      {loginsnack? 
      <Snackbar open={loginsnack} autoHideDuration={6000} onClose={handleclosesnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Successfully Logged In!!!
        </Alert>
      </Snackbar> : null 
      }
    </div>
  );
}

export default Login;
