import React from 'react';
import { Link } from 'react-router-dom';
import './FeatureCard.css';

const FeatureCard = ({ title, description, to }) => (
  <div className="feature-card">
    <h4>{title}</h4>
    <p>{description}</p>
    <Link to={to}><button>Check</button></Link>
  </div>
);

export default FeatureCard;
