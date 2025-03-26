import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./signup.css";
import logo from "../components/media/Bean and Brew.png";

// Google Sign-In Script
const handleCredentialResponse = (response) => {
  console.log("Encoded JWT ID token: " + response.credential);
  // Send the token to your server for verification
  axios
    .post("http://localhost:5000/api/auth/google-login", { token: response.credential })
    .then((res) => {
      console.log(res.data); // Handle the successful response from backend
    })
    .catch((error) => {
      console.error("Google Login Error:", error);
    });
};

const Signup = ({ setUser, onError = (error) => console.error("Signup Error:", error) }) => {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [con_password, setcon_Password] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Dynamically load the Google Sign-In script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    // Define the callback function
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: "205487692902-fjbc0imr8k3ons2lnf1k2ku2msnsmmfm.apps.googleusercontent.com", // Replace with your actual Google Client ID
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
        theme: "outline",
        size: "large",
      });

      window.google.accounts.id.prompt(); // Show One Tap dialog as well
    };

    // Append the script to the document
    document.body.appendChild(script);

    // Cleanup: Remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

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
      alert("Password must contain at least one lowercase letter, one uppercase letter, and one symbol.");
      return;
    }

    const userData = { name, email, password };
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", userData);
      setUser(response.data);
      setSuccessMessage("Signup successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      onError(error);
      console.error("Signup Error:", error);
    }
  };

  return (
    <>
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
            value={name}
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
          {successMessage && <p className="success-message">{successMessage}</p>}
          <div className="signup-footer">
            <p>Already have an account? <Link to="/login">Login</Link></p>
            <p>Or sign up with Google</p>
            <div id="buttonDiv"></div> {/* Google Sign-In Button */}
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
