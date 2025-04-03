import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 
import './FeatureCard.css';

const FeatureCard = ({ title, description, to }) => {
  const { t } = useTranslation(); 

  return (
    <div className="feature-card">
      <h4>{title}</h4>
      <p>{description}</p>
      <Link to={to}>
        <button>{t('feature_card.check_button', 'Check')}</button>
      </Link>
    </div>
  );
};

export default FeatureCard;
