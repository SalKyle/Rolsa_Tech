import React, { useState } from 'react';
import calculateTransport from '../utils/transportCalculator';
import ProgressTracker from './components/ProgressTracker';
import Navbar from './components/Navbar';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const TransportPage = () => {
  const [transportModeFactor, setTransportModeFactor] = useState(0);
  const [trainHours, setTrainHours] = useState(0);
  const [flightsUK, setFlightsUK] = useState(0);
  const [flightsEurope, setFlightsEurope] = useState(0);
  const [flightsNonEurope, setFlightsNonEurope] = useState(0);
  const [flightOffsetPercent, setFlightOffsetPercent] = useState(0); // e.g., 0.2 for 20%
  const navigate = useNavigate();

  const handleCalculate = () => {
    const data = {
      transportModeFactor: parseFloat(transportModeFactor),
      trainHours: parseFloat(trainHours),
      flightsUK: parseFloat(flightsUK),
      flightsEurope: parseFloat(flightsEurope),
      flightsNonEurope: parseFloat(flightsNonEurope),
      flightOffsetPercent: parseFloat(flightOffsetPercent),
    };
    const result = calculateTransport(data);
    console.log("Calculated Transport:", result);
    navigate('/housing');
  };

  return (
    <div>
      <Navbar />
      <h2>Transport</h2>
      <ProgressTracker progress={50} />

      <div>
        <label>Transport Mode Factor (e.g. 0.5 for car):</label>
        <input type="number" value={transportModeFactor} onChange={(e) => setTransportModeFactor(e.target.value)} />
      </div>

      <div>
        <label>Train Hours/Week:</label>
        <input type="number" value={trainHours} onChange={(e) => setTrainHours(e.target.value)} />
      </div>

      <div>
        <label>UK Flights/Year:</label>
        <input type="number" value={flightsUK} onChange={(e) => setFlightsUK(e.target.value)} />
      </div>

      <div>
        <label>Europe Flights/Year:</label>
        <input type="number" value={flightsEurope} onChange={(e) => setFlightsEurope(e.target.value)} />
      </div>

      <div>
        <label>Non-Europe Flights/Year:</label>
        <input type="number" value={flightsNonEurope} onChange={(e) => setFlightsNonEurope(e.target.value)} />
      </div>

      <div>
        <label>Flight Offset (%):</label>
        <input type="number" step="0.01" value={flightOffsetPercent} onChange={(e) => setFlightOffsetPercent(e.target.value)} />
      </div>

      <button onClick={handleCalculate}>Next</button>
    </div>
  );
};

export default TransportPage;
