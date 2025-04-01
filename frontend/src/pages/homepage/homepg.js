import React from 'react';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/FeatureCard';
// import { Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import './homepg.css';
import background from '../components/media/solar-panel-4716640.jpg';

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Background & Overlay */}
      <div className="image-overlay">
        <img src={background} alt="Background" className="bg-image" />
      </div>

      
      <Navbar />
      <div className="hero-text">
        {/* <div className="hero-title"><h1>Rolsa<br /><span>Drives        Change</span></h1></div>
        
        <div className="hero-btn">
          <Link to="/signup">
            <button className="hero-button">Register</button>
          </Link>
        </div> */}
        <Dashboard />
      </div>


      {/* Make this visible! */}
      <div className="card-section">
      <FeatureCard 
          title="Check your Carbon Footprint" 
          description="Understand your environmental impact and discover ways to reduce emissions with our smart calculator." 
          to="/signup" 
        />

        <FeatureCard 
          title="Book a Consultation Today" 
          description="Get expert advice on sustainable living and energy solutions tailored to your needs." 
          to="/signup" 
        />

        <FeatureCard 
          title="Check your Energy Usage" 
          description="Log, track, and visualize your home or business energy consumption in real-time." 
          to="/signup" 
        />

      </div>
    </div>

  );
};

export default LandingPage;
