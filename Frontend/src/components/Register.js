import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register({setIsAuthenticated}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/register', { username, password });
      alert('User registered successfully');
      setUsername('');
      setPassword('');
      navigate('/login');
    } catch (error) {
      alert(error.response.data.error)
      setUsername('');
      setPassword('');
      console.error('Registration failed', error.response.data.error);
    }
  };

  return (
    <div className='container'>
      <h2>Register</h2>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
