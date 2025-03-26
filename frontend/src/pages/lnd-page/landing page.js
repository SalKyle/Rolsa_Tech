import React from 'react';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/FeatureCard';
import { Link } from 'react-router-dom';
import './landing page.css';
import background from '../components/media/sust_1.jpg';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="video-overlay">
        <img src = {background}  alt= "Background of solar panels" className="bg-video" />
        <Navbar />

        <div className="hero-text">
          <h1>Rolsa</h1>
          <p>Drives Change</p>
          <Link to="/register"><button className="hero-button">Register</button></Link>
        </div>
      </div>

      <div className="card-section">
        <FeatureCard title="Check your Carbon footprint" description="Calculate your personal or company emissions" to="/calculator" />
        <FeatureCard title="Book a Consultation Today" description="Meet with a sustainability advisor" to="/booking" />
        <FeatureCard title="Check your Energy Usage" description="Log usage or connect your smart devices" to="/energy" />
      </div>
    </div>
  );
};

export default LandingPage;
