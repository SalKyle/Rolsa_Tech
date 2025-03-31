import React, { useState } from 'react';
import calculateConsumption from '../utils/consumptionCalculator';
import ProgressTracker from './components/ProgressTracker';
import Navbar from './components/Navbar';
import { Navigate, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const ConsumptionPage = () => {
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
      <Navbar />
      <h2>Consumption</h2>
      <ProgressTracker progress={100} />

      <div>
        <label>Electronics Purchases:</label>
        <input type="number" value={electronicsPurchase} onChange={(e) => setElectronicsPurchase(Number(e.target.value))} />
      </div>

      <div>
        <label>Clothing Spending:</label>
        <input type="number" value={clothesSpending} onChange={(e) => setClothesSpending(Number(e.target.value))} />
      </div>

      <div>
        <label>Pets Spending:</label>
        <input type="number" value={petsSpending} onChange={(e) => setPetsSpending(Number(e.target.value))} />
      </div>

      <div>
        <label>Health/Beauty Spending:</label>
        <input type="number" value={healthBeautySpending} onChange={(e) => setHealthBeautySpending(Number(e.target.value))} />
      </div>

      <div>
        <label>Communication Spending:</label>
        <input type="number" value={communicationSpending} onChange={(e) => setCommunicationSpending(Number(e.target.value))} />
      </div>

      <div>
        <label>Entertainment Spending:</label>
        <input type="number" value={entertainmentSpending} onChange={(e) => setEntertainmentSpending(Number(e.target.value))} />
      </div>

      <div>
        <label>Recycling/Composting Score (0–1):</label>
        <input type="number" step="0.01" value={recyclingScore} onChange={(e) => setRecyclingScore(Number(e.target.value))} />
      </div>

      <button onClick={handleCalculate}>Finish</button>
    </div>
  );
};

export default ConsumptionPage;
