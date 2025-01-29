import React, { useState } from 'react';
import axios from 'axios';
import "./signup.css";
import logo from "./components/Capture_LE_upscale_balanced_x4 (1).jpg"


const Signup = ({ setUser, onError }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { username, email, password };
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', userData);
      // On success, set user
      setUser(response.data);
    } catch (error) {
      onError(error); // Call the error handler passed from App.js
    }
  };

  return (
    <><header class="header">
      <div class="logo-container">
        <img src={logo} alt="Bean and Brew Cafe Logo" class="logo" />
      </div>
      <div class="restaurant-name">
        <h1>Bean and Brew Cafe</h1>
      </div>
    </header>
    <div className='input_container'>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className='signup_input'
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required />
          <input
            type="email"
            placeholder="Email"
            className='signup_input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
          <input
            type="password"
            placeholder="Password"
            className='signup_input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
          <button type="submit">Sign Up</button>
        </form>
      </div></>
  );
};

export default Signup;
