import React, { useState } from 'react';
import calculateConsumption from '../utils/consumptionCalculator';
import ProgressTracker from './components/ProgressTracker';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './cf_pages.css';

const ConsumptionPage = () => {
  const { t } = useTranslation(); 
  const [electronicsPurchase, setElectronicsPurchase] = useState(0);
  const [clothesSpending, setClothesSpending] = useState(0);
  const [petsSpending, setPetsSpending] = useState(0);
  const [healthBeautySpending, setHealthBeautySpending] = useState(0);
  const [communicationSpending, setCommunicationSpending] = useState(0);
  const [entertainmentSpending, setEntertainmentSpending] = useState(0);
  const [recyclingScore, setRecyclingScore] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { diet, transport, housing } = location.state || {};

  const handleCalculate = () => {
    const data = {
      electronicsPurchase,
      clothesSpending,
      petsSpending,
      healthBeautySpending,
      communicationSpending,
      entertainmentSpending,
      recyclingScore,
    };
    const result = calculateConsumption(data);
    console.log("Calculated Consumption:", result);
    navigate('../results', {
      state: {
        diet,
        transport,
        housing,
        consumption: result,
      },
    });
  };

  return (
    <div>
      <h2>{t('consumption.header', 'Consumption')}</h2>
      <ProgressTracker progress={100} />

      <div className='cf-card'>
        <div className='cf-input'>
          <label>{t('consumption.electronics_purchase_label', 'Electronics Purchases (yearly £)')}</label>
          <input type="number" value={electronicsPurchase} onChange={(e) => setElectronicsPurchase(Number(e.target.value))} />
          <small>{t('consumption.electronics_tip', 'Includes laptops, phones, appliances etc.')}</small>
        </div>

        <div className='cf-input'>
          <label>{t('consumption.clothes_spending_label', 'Clothing Spending (monthly £)')}</label>
          <input type="number" value={clothesSpending} onChange={(e) => setClothesSpending(Number(e.target.value))} />
          <small>{t('consumption.clothes_tip', 'Fast fashion has a high carbon footprint')}</small>
        </div>

        <div className='cf-input'>
          <label>{t('consumption.pets_spending_label', 'Pet-related Spending (monthly £)')}</label>
          <input type="number" value={petsSpending} onChange={(e) => setPetsSpending(Number(e.target.value))} />
          <small>{t('consumption.pets_tip', 'Includes food, grooming, toys, etc.')}</small>
        </div>

        <div className='cf-input'>
          <label>{t('consumption.health_beauty_spending_label', 'Health & Beauty (monthly £)')}</label>
          <input type="number" value={healthBeautySpending} onChange={(e) => setHealthBeautySpending(Number(e.target.value))} />
          <small>{t('consumption.health_beauty_tip', 'Skincare, cosmetics, supplements, etc.')}</small>
        </div>

        <div className='cf-input'>
          <label>{t('consumption.communication_spending_label', 'Communication (monthly £)')}</label>
          <input type="number" value={communicationSpending} onChange={(e) => setCommunicationSpending(Number(e.target.value))} />
          <small>{t('consumption.communication_tip', 'Phone bills, internet, subscriptions')}</small>
        </div>

        <div className='cf-input'>
          <label>{t('consumption.entertainment_spending_label', 'Entertainment (monthly £)')}</label>
          <input type="number" value={entertainmentSpending} onChange={(e) => setEntertainmentSpending(Number(e.target.value))} />
          <small>{t('consumption.entertainment_tip', 'Streaming, gaming, events, subscriptions')}</small>
        </div>

        <div className='cf-input'>
          <label>{t('consumption.recycling_score_label', 'Recycling Score (0–1)')}</label>
          <input type="number" step="0.01" value={recyclingScore} onChange={(e) => setRecyclingScore(Number(e.target.value))} />
          <small>{t('consumption.recycling_tip', '0 = no recycling, 1 = recycle & compost everything')}</small>
        </div>

        <button className="cf-button" onClick={handleCalculate}>
          {t('consumption.finish_button', 'Finish')}
        </button>
      </div>
    </div>
  );
};

export default ConsumptionPage;
