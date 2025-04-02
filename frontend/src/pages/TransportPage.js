import React, { useState } from 'react';
import calculateTransport from '../utils/transportCalculator';
import ProgressTracker from './components/ProgressTracker';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // ✅
import './cf_pages.css';

const TransportPage = () => {
  const { t } = useTranslation(); // ✅
  const [transportModeFactor, setTransportModeFactor] = useState(0);
  const [trainHours, setTrainHours] = useState(0);
  const [flightsUK, setFlightsUK] = useState(0);
  const [flightsEurope, setFlightsEurope] = useState(0);
  const [flightsNonEurope, setFlightsNonEurope] = useState(0);
  const [flightOffsetPercent, setFlightOffsetPercent] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const prevDiet = location.state?.diet;

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
    navigate('../housing', {
      state: {
        diet: prevDiet,
        transport: result,
      },
    });
  };

  return (
    <div>
      <h2>{t("transport_page.title", "Transport")}</h2>
      <ProgressTracker progress={50} />

      <div className='cf-card'>
        <div className='cf-input'>
          <label>{t("transport_page.transport_mode_factor_label", "🚗 Daily travel method emission factor:")}</label>
          <input
            type="number"
            value={transportModeFactor}
            onChange={(e) => setTransportModeFactor(e.target.value)}
            placeholder={t("transport_page.transport_mode_placeholder", "e.g. 0.5 for car, 0.1 for bus")}
          />
          <small>{t("transport_page.transport_mode_tip", "Lower = greener (e.g., cycling is 0)")}</small>
        </div>

        <div className='cf-input'>
          <label>{t("transport_page.train_hours_label", "🚆 Average hours spent on trains per week:")}</label>
          <input
            type="number"
            value={trainHours}
            onChange={(e) => setTrainHours(e.target.value)}
            placeholder={t("transport_page.train_hours_placeholder", "e.g. 3")}
          />
        </div>

        <div className='cf-input'>
          <label>{t("transport_page.flights_uk_label", "✈️ Flights within the UK per year:")}</label>
          <input
            type="number"
            value={flightsUK}
            onChange={(e) => setFlightsUK(e.target.value)}
            placeholder={t("transport_page.flights_uk_placeholder", "e.g. 2")}
          />
        </div>

        <div className='cf-input'>
          <label>{t("transport_page.flights_europe_label", "✈️ Flights to Europe per year:")}</label>
          <input
            type="number"
            value={flightsEurope}
            onChange={(e) => setFlightsEurope(e.target.value)}
            placeholder={t("transport_page.flights_europe_placeholder", "e.g. 1")}
          />
        </div>

        <div className='cf-input'>
          <label>{t("transport_page.flights_non_europe_label", "🌍 Long-haul flights (non-Europe) per year:")}</label>
          <input
            type="number"
            value={flightsNonEurope}
            onChange={(e) => setFlightsNonEurope(e.target.value)}
            placeholder={t("transport_page.flights_non_europe_placeholder", "e.g. 0")}
          />
        </div>

        <div className='cf-input'>
          <label>{t("transport_page.flight_offset_label", "♻️ Flight offset efforts (%):")}</label>
          <input
            type="number"
            step="0.01"
            value={flightOffsetPercent}
            onChange={(e) => setFlightOffsetPercent(e.target.value)}
            placeholder={t("transport_page.flight_offset_placeholder", "e.g. 50")}
          />
          <small>{t("transport_page.flight_offset_tip", "Offset programs reduce your flight emissions")}</small>
        </div>

        <button onClick={handleCalculate}>
          {t("transport_page.next_button", "Next")}
        </button>
      </div>
    </div>
  );
};

export default TransportPage;
