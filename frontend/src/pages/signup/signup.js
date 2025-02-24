import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./signup.css";
// import coffee from "../components/";
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
const Signup = ({ setUser, onError = (error) => console.error("Signup Error:", error) }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [con_password, setcon_Password] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  

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
      alert(
        "Password must contain at least one lowercase letter, one uppercase letter, and one symbol."
      );
      return;
    }

    const userData = { username, email, password };
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", userData);
      setUser(response.data);

      // Show success message
      setSuccessMessage("Signup successful! Redirecting...");
      
      // Optional: Redirect to login page after a delay
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
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
          {successMessage && <p className="success-message">{successMessage}</p>}
          <div className="signup-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className = "login_link">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
