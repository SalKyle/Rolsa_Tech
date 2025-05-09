import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./login.css";
import Solar from "../components/media/solar-panel-169439.jpg";

// Use env variable for API URL
const API_BASE_URL = process.env.REACT_APP_API_URL  || "http://localhost:5000";

const Login = ({ setUser, onError }) => {
  const navigate = useNavigate();
  onError = onError || ((error) => console.error("Login Error:", error));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Google Sign-In response
  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    axios
      .post(`${API_BASE_URL}/auth/google-login`, { token: response.credential })
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
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
        navigate("/");
      } else {
        console.error("Login failed: No user data received");
      }
    } catch (error) {
      await onError(error);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id:
          "205487692902-fjbc0imr8k3ons2lnf1k2ku2msnsmmfm.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
        theme: "outline",
        size: "large",
      });

      window.google.accounts.id.prompt();
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className="bg-container">
        <img src={Solar} alt="Solar Panel" className="bg" />
      </div>
      <header className="header">
        <div className="logo">
          <Link to="/">
            ROLSA <br />
            <span>TECHNOLOGIES</span>
          </Link>
        </div>
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
            <div id="buttonDiv"></div>
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
