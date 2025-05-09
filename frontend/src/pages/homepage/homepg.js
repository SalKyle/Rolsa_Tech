import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/FeatureCard';
import Dashboard from '../components/Dashboard';
import './homepg.css';
import background from '../components/media/solar-panel-4716640.jpg';

const LandingPage = () => {
  const { t } = useTranslation();
  const { setCurrentUser } = useContext(AuthContext);//setCurrentUser is used to set the current user in the AuthContext
  const navigate = useNavigate();

  const handleSignOut = () => {
    setCurrentUser(null);//signout logic(used in dev)
    localStorage.removeItem("user");
    navigate('/landing');
  };

  return (
    <div className="landing-container">
      
      <div className="image-overlay">
        <img src={background} alt="Background" className="bg-image" />
      </div>

      <Navbar />

      <div className="hero-text">
        <Dashboard />
      </div>

      <div className="card-section">
        <FeatureCard 
          title={t("landing.feature_card_1.title", "Check your Carbon Footprint")} 
          description={t("landing.feature_card_1.description", 
            "Understand your environmental impact and discover ways to reduce emissions with our smart calculator.")} 
          to="/cf_page" 
        />
        <FeatureCard 
          title={t("landing.feature_card_2.title", "Book a Consultation Today")} 
          description={t("landing.feature_card_2.description", 
            "Get expert advice on sustainable living and energy solutions tailored to your needs.")} 
          to="/BookingPage" 
        />
        <FeatureCard 
          title={t("landing.feature_card_3.title", "Check your Energy Usage")} 
          description={t("landing.feature_card_3.description", 
            "Log, track, and visualize your home or business energy consumption in real-time.")} 
          to="/EnergyTracker" 
        />
      </div>

      <div className="signout-button-container">
        <button onClick={handleSignOut} className="signout-button">
          {t("landing.sign_out", "Sign Out")}
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
