import React, { useState } from 'react';
import calculateHousing from '../utils/housingCalculator';
import ProgressTracker from './components/ProgressTracker';
import Navbar from './components/Navbar';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const HousingPage = () => {
  const [houseTypeFactor, setHouseTypeFactor] = useState(0);
  const [numBedrooms, setNumBedrooms] = useState(1);
  const [heatingFuelFactor, setHeatingFuelFactor] = useState(0);
  const [greenTariff, setGreenTariff] = useState(false);
  const [standbyUsage, setStandbyUsage] = useState(false);
  const [winterTemp, setWinterTemp] = useState(18);
  const [energyEfficiency, setEnergyEfficiency] = useState(0);
  const navigate = useNavigate();
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
    navigate('/consumption');
  };

  return (
    <div>
      <Navbar />
      <h2>Housing</h2>
      <ProgressTracker progress={75} />

      <div>
        <label>House Type Factor:</label>
        <input type="number" value={houseTypeFactor} onChange={(e) => setHouseTypeFactor(Number(e.target.value))} />
      </div>

      <div>
        <label>Number of Bedrooms:</label>
        <input type="number" value={numBedrooms} onChange={(e) => setNumBedrooms(Number(e.target.value))} />
      </div>

      <div>
        <label>Heating Fuel Factor:</label>
        <input type="number" value={heatingFuelFactor} onChange={(e) => setHeatingFuelFactor(Number(e.target.value))} />
      </div>

      <div>
        <label>Green Tariff?</label>
        <input type="checkbox" checked={greenTariff} onChange={() => setGreenTariff(!greenTariff)} />
      </div>

      <div>
        <label>Use Standby Power?</label>
        <input type="checkbox" checked={standbyUsage} onChange={() => setStandbyUsage(!standbyUsage)} />
      </div>

      <div>
        <label>Winter Temp (°C):</label>
        <input type="number" value={winterTemp} onChange={(e) => setWinterTemp(Number(e.target.value))} />
      </div>

      <div>
        <label>Energy Efficiency Score (0–1):</label>
        <input type="number" step="0.01" value={energyEfficiency} onChange={(e) => setEnergyEfficiency(Number(e.target.value))} />
      </div>

      <button onClick={handleCalculate}>Next</button>
    </div>
  );
};

export default HousingPage;
