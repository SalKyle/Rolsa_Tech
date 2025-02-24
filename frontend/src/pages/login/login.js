import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./login.css";
// import coffee from "../components/4820120-uhd_4096_2160_25fps.mp4";
import logo from "../components/Bean and Brew.png";


const BackgroundVideo = () => {
  return (
    <div className="video-container">
      <video
        src="/videos/4820120-uhd_4096_2160_25fps.mp4"
        autoPlay
        loop
        muted
        preload="auto"
      />
    </div>
  );
};

const Login = ({ setUser, onError }) => {
  const navigate = useNavigate();
  onError = onError || ((error) => console.error("Login Error:", error));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // function BackgroundVideo() {
  //   return (
  //     <div className="video-container">
  //       <video src="/videos/4820120-uhd_4096_2160_25fps.mp4" autoPlay loop muted preload="auto"/>
  //         {/* <source src={coffee} type="video/mp4" /> */}
  //         {/* Your browser does not support the video tag. */}
  //       {/* </video> */}
  //     </div>
  //   );
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email, password };
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", userData);
      
      if (response.data) {
        setUser(response.data); // Update user state
        console.log("Login Successful:", response.data);
        navigate("/"); // Redirect to home page
      } else {
        console.error("Login failed: No user data received");
      }
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
