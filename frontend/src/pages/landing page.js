import React from "react";
import { Link } from "react-router-dom";
// import "./signup.css";
import "./signup";
import coffee from "./components/mixkit-one-coffee-cup-in-a-sea-of-coffee-beans-43940-4k.mp4";
import logo from "./components/Bean and Brew.png";

const LandingPage = () => (
    <>
        <header>
            <img src={logo} alt="Bean and Brew Cafe Logo" className="logo" />
            <h1>Bean and Brew Cafe</h1>
        </header>

        <div className="seasonal_offer">
            <div className="video-container">
                <video autoPlay muted loop>
                    <source src={coffee} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <h4>Try our new, seasonal drinks and pastries inspired by the joys of Christmas</h4>
            <Link to="/signup">
                <button>Order Now</button>
            </Link>
        </div>
    </>
);

export default LandingPage;
