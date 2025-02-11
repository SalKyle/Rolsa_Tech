import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../signup/signup.css";
import coffee from "../components/4820120-uhd_4096_2160_25fps.mp4";
import logo from "../components/Bean and Brew.png";

const Login = ({ setUser, onError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    const userData = { email, password };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        userData
      );
      setUser(response.data);
    } catch (error) {
      await onError(error);
    }
  };

  return (
    <>
      {/* Background Video */}
      <BackgroundVideo />

      <header className="header">
        <img src={logo} alt="Bean and Brew Cafe Logo" className="logo" />
        <h1>Bean and Brew Cafe</h1>
      </header>

      <div className="input_container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
          <div className="signup-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/signup">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
