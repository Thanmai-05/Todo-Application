import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;
const Backend_url = process.env.REACT_APP_BACKEND_URL;


function Register({setIsAuthenticated}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  
  const handleRegister = async () => {
    try {
      console.log("inside handleregister")
      await axios.post(`${Backend_url}/api/register`, { username, password });
      alert('User registered successfully');
      setUsername('');
      setPassword('');
      navigate('/login');
    } catch (error) {
      ///alert(error.response.data.error)
      if (error.response && error.response.status === 400) {
        // Check for 400 status and display specific error
        setErrorMessage(error.response.data.error);  // Display error from the server
      } else {
        setErrorMessage('Registration failed. Please try again.');  // Generic error message
      }
      setUsername('');
      setPassword('');
      console.log('Registration failed', error.response.data.error);
    }
  };

  return (
    <div className='container'>
      <h2>Register</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}  {/* Display error message */}
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
