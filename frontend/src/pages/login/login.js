import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./login.css";
import logo from "../components/media/Bean and Brew.png";

// Google Sign-In Script
const handleCredentialResponse = (response) => {
  console.log("Encoded JWT ID token: " + response.credential);
  // Send the token to your server for verification
  axios
    .post("http://localhost:5000/api/auth/google-login", { token: response.credential })
    .then((res) => {
      console.log(res.data);
      setTimeout(() => {
        window.location.href = "/";
      }, 2000); 
    })
    .catch((error) => {
      console.error("Google Login Error:", error);
    });
};

const Login = ({ setUser, onError }) => {
  const navigate = useNavigate();
  onError = onError || ((error) => console.error("Login Error:", error));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", userData);
      if (response.data) {
        const { token, user } = response.data;

        const fullUser = {
          id: user.id,
          email: user.email,
          token,
        };

        setUser(fullUser);
        localStorage.setItem("user", JSON.stringify(fullUser));

        console.log("Login Successful:", response.data);
        navigate("/"); // Redirect to home page
      } else {
        console.error("Login failed: No user data received");
      }
    } catch (error) {
      await onError(error);
    }
  };

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

  return (
    <>
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
            <p>Or login with Google</p>
            <div id="buttonDiv"></div> {/* Google Sign-In Button */}
            <p>
              Don't have an account? <Link to="/signup">Signup</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
