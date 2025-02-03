import React, { useState } from "react";
import axios from "axios";
import "./signup.css";
import coffee from "./components/4820120-uhd_4096_2160_25fps.mp4";
import logo from "./components/Bean and Brew.png";

const Signup = ({ setUser, onError }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [con_password, setcon_Password] = useState("");

  function BackgroundVideo() {
    return (
      <div className="video-container">
        <video autoPlay muted loop>
          <source src={coffee} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== con_password) {
      alert("Passwords do not match!");
      return;
    }

    const MIN_PASSWORD_LENGTH = 8;
    if (password.length < MIN_PASSWORD_LENGTH) {
      alert(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must contain at least one lowercase letter, one uppercase letter, and one symbol."
      );
      return;
    }

    const userData = { username, email, password };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        userData
      );
      setUser(response.data);
    } catch (error) {
      onError(error);
    }
  };

  return (
    <>
      {/* Include the Background Video */}
      <BackgroundVideo />

      <header className="header">
        
        <img src={logo} alt="Bean and Brew Cafe Logo" className="logo" />
        
        
        <h1>Bean and Brew Cafe</h1>
        
      </header>

      <div className="input_container">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="signup_input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="signup_input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="signup_input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="signup_input"
            value={con_password}
            onChange={(e) => setcon_Password(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
          <div className="signup-footer">
            <p>
              Already have an account?{" "}
              <a href="/login" className="login_link">
                Log in here
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
