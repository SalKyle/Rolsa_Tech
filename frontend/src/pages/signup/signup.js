import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.css";
import Solar from "../components/media/solar-panel-169439.jpg";

// Use env variable for API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Signup = ({ setUser, onError = (error) => console.error("Signup Error:", error) }) => {
  const navigate = useNavigate();
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [con_password, setConPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle Google Sign-In response
  const handleCredentialResponse = (response) => {
    axios
      .post(`${API_BASE_URL}/api/auth/google-login`, { token: response.credential })
      .then((res) => {
        setSuccessMessage("Login via Google successful! Redirecting…");
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((error) => console.error("Google Login Error:", error));
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: "205487692902-fjbc0imr8k3ons2lnf1k2ku2msnsmmfm.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.renderButton(document.getElementById("googleButton"), {
        theme: "outline",
        size: "large",
      });
      window.google.accounts.id.prompt();
    };
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    if (password !== con_password) {
      return alert("Passwords do not match!");
    }
    if (password.length < 8) {
      return alert("Password must be at least 8 characters long.");
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/.test(password)) {
      return alert("Password needs lowercase, uppercase, and a symbol.");
    }

    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/auth/signup`, { name, email, password });
      setUser(data);
      setSuccessMessage("Signup successful! Redirecting to login…");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      onError(error);
      console.error("Signup Error:", error);
    }
  };

  return (
    <>
      <div className="bg-container">
        <img src={Solar} alt="Solar Panel" className="bg" />
      </div>
      <header className="header">
        <div className="logo">
          <Link to="/">ROLSA <br /><span>TECHNOLOGIES</span></Link>
        </div>
      </header>
      <div className="input_container">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="signup_input"
            placeholder="Username"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            className="signup_input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="signup_input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="signup_input"
            placeholder="Confirm Password"
            value={con_password}
            onChange={(e) => setConPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
          {successMessage && <p className="success-message">{successMessage}</p>}
          <div className="signup-footer">
            <p>Already have an account? <Link to="/login">Login</Link></p>
            <p>Or sign up with Google</p>
            <div id="googleButton"></div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
