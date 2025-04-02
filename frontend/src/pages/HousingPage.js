import React, { useState } from 'react';
import calculateHousing from '../utils/housingCalculator';
import ProgressTracker from './components/ProgressTracker';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // ✅
import './cf_pages.css';

const HousingPage = () => {
  const { t } = useTranslation(); // ✅
  const [houseTypeFactor, setHouseTypeFactor] = useState(0);
  const [numBedrooms, setNumBedrooms] = useState(1);
  const [heatingFuelFactor, setHeatingFuelFactor] = useState(0);
  const [greenTariff, setGreenTariff] = useState(false);
  const [standbyUsage, setStandbyUsage] = useState(false);
  const [winterTemp, setWinterTemp] = useState(18);
  const [energyEfficiency, setEnergyEfficiency] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { diet, transport } = location.state || {};

  const handleCalculate = () => {
    const data = {
      houseTypeFactor,
      numBedrooms,
      heatingFuelFactor,
      greenTariff: greenTariff ? 1 : 0,
      standbyUsage: standbyUsage ? 1 : 0,
      winterTemp,
      energyEfficiency,
    };
    const result = calculateHousing(data);
    console.log("Calculated Housing:", result);
    navigate('../consumption', {
      state: {
        diet,
        transport,
        housing: result,
      },
    });
  };

  return (
    <div>
      <h2>{t('housing.header', 'Housing')}</h2>
      <ProgressTracker progress={75} />

      <div className='cf-card'>
        <div className='cf-input'>
          <label>{t('housing.house_type_factor_label', '🏠 House Type Factor')}</label>
          <input type="number" value={houseTypeFactor} onChange={(e) => setHouseTypeFactor(Number(e.target.value))} />
          <small>{t('housing.house_type_tip', 'E.g., Flat = 0.4, Semi-detached = 0.6, Detached = 1.0')}</small>
        </div>

        <div className='cf-input'>
          <label>{t('housing.num_bedrooms_label', '🛏️ Number of Bedrooms')}</label>
          <input type="number" value={numBedrooms} onChange={(e) => setNumBedrooms(Number(e.target.value))} />
          <small>{t('housing.num_bedrooms_tip', 'More rooms usually means more energy use')}</small>
        </div>

        <div className='cf-input'>
          <label>{t('housing.heating_fuel_factor_label', '🔥 Heating Fuel Factor')}</label>
          <input type="number" value={heatingFuelFactor} onChange={(e) => setHeatingFuelFactor(Number(e.target.value))} />
          <small>{t('housing.heating_fuel_tip', 'E.g., Electric = 0.9, Gas = 0.6, Oil = 1.2')}</small>
        </div>

        <div className='cf-input'>
          <label>{t('housing.green_tariff_label', '🌿 Are you on a green tariff?')}</label>
          <input type="checkbox" checked={greenTariff} onChange={() => setGreenTariff(!greenTariff)} />
          <small>{t('housing.green_tariff_tip', 'Green tariffs use renewable sources like wind or solar')}</small>
        </div>

        <div className='cf-input'>
          <label>{t('housing.standby_usage_label', '🔌 Use standby power?')}</label>
          <input type="checkbox" checked={standbyUsage} onChange={() => setStandbyUsage(!standbyUsage)} />
          <small>{t('housing.standby_usage_tip', 'Leaving TVs or devices on standby adds to energy use')}</small>
        </div>

        <div className='cf-input'>
          <label>{t('housing.winter_temp_label', '❄️ Winter Temperature (°C)')}</label>
          <input type="number" value={winterTemp} onChange={(e) => setWinterTemp(Number(e.target.value))} />
          <small>{t('housing.winter_temp_tip', 'Lower settings like 18°C reduce emissions')}</small>
        </div>

        <div className='cf-input'>
          <label>{t('housing.energy_efficiency_label', '🏡 Energy Efficiency Score (0–1)')}</label>
          <input type="number" step="0.01" value={energyEfficiency} onChange={(e) => setEnergyEfficiency(Number(e.target.value))} />
          <small>{t('housing.energy_efficiency_tip', '0 = very inefficient, 1 = highly efficient (e.g. insulation, smart heating)')}</small>
        </div>

        <button className="cf-button" onClick={handleCalculate}>
          {t('housing.next_button', 'Next')}
        </button>
      </div>
    </div>
  );
};

export default HousingPage;
