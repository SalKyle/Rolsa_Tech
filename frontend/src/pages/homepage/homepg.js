import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/FeatureCard';
// import { Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import './homepg.css';
import background from '../components/media/solar-panel-4716640.jpg';

const LandingPage = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear user from context and localStorage
    setCurrentUser(null);
    localStorage.removeItem("user");

    // Redirect to landing or login page
    navigate('/landing');
  };

  return (
    <div className="landing-container">
      {/* Background & Overlay */}
      <div className="image-overlay">
        <img src={background} alt="Background" className="bg-image" />
      </div>

      <Navbar />

      {/* Sign Out Button */}
      

      <div className="hero-text">
        <Dashboard />
      </div>

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
      <div className="signout-button-container">
        <button onClick={handleSignOut} className="signout-button">
          Sign Out
        </button>
      </div>
    </div>
  );
};


export default LandingPage;
