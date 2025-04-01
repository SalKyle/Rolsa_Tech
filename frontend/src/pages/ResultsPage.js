import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import ProgressTracker from "./components/ProgressTracker";
import { useAuth } from "../context/AuthContext";
import "./ResultsPage.css";

const ResultsPage = () => {
  const location = useLocation();
  const { currentUser } = useAuth(); // 👈 grab current user

  const {
    diet = 0,
    transport = 0,
    housing = 0,
    consumption = 0,
  } = location.state || {};

  const totalFootprint = diet + transport + housing + consumption;

  // Save to DB if user exists
  useEffect(() => {
    if (currentUser?.id) {
      axios
        .post("http://localhost:5000/api/cf", {
          userId: currentUser.id,
          diet,
          transport,
          housing,
          consumption,
          total: totalFootprint,
          date: new Date().toISOString(),
        })
        .then(() => console.log("✅ CF data saved"))
        .catch((err) => console.error("❌ CF save failed:", err));
    }
  }, [currentUser, diet, transport, housing, consumption, totalFootprint]);

  const averageUK = 12500;
  const percentageOfAverage = ((totalFootprint / averageUK) * 100).toFixed(1);
  const formatScore = (score) => score.toFixed(1);

  const tips = {
    diet: "Eat more plant-based meals and reduce food waste.",
    transport: "Use public transport, bike more, and reduce flights.",
    housing: "Improve insulation and use renewable energy tariffs.",
    consumption: "Buy less, recycle more, and avoid fast fashion.",
  };

  return (
    <div className="results-container">
      <h1 className="results-title">🌍 Your Carbon Footprint Results</h1>
      {/* <ProgressTracker progress={100} /> */}

      <div className="total-summary">
        <h2>Total Footprint</h2>
        <p>{formatScore(totalFootprint)} kg CO₂ / year</p>
        <small>That's about {percentageOfAverage}% of the UK national average</small>
      </div>

      <div className="impact-grid">
        {["diet", "transport", "housing", "consumption"].map((key) => (
          <div key={key} className="impact-box">
            <h3>
              {key === "diet" && "🥗 Diet"}
              {key === "transport" && "🚗 Transport"}
              {key === "housing" && "🏠 Housing"}
              {key === "consumption" && "🛍️ Consumption"}
            </h3>
            <p className="impact-value">{formatScore(eval(key))} kg CO₂</p>
            <p className="tip">{tips[key]}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button className="results-button">
          🌱 See tips to reduce your footprint
        </button>
      </div>
    </div>

  );
};

export default ResultsPage;
