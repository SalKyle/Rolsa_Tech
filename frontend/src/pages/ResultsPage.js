import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next"; // ✅
import "./ResultsPage.css";

const ResultsPage = () => {
  const { t } = useTranslation(); // ✅
  const location = useLocation();
  const { currentUser } = useAuth();

  const {
    diet = 0,
    transport = 0,
    housing = 0,
    consumption = 0,
  } = location.state || {};

  const totalFootprint = diet + transport + housing + consumption;

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

  return (
    <div className="results-container">
      <h1 className="results-title">
        {t("results.header", "🌍 Your Carbon Footprint Results")}
      </h1>

      <div className="total-summary">
        <h2>{t("results.total_footprint", "Total Footprint")}</h2>
        <p>{formatScore(totalFootprint)} {t("results.kg_per_year", "kg CO₂ / year")}</p>
        <small>
          {t("results.percentage_of_average", {
            percentage: percentageOfAverage,
            defaultValue: "That's about {{percentage}}% of the UK national average",
          })}
        </small>
      </div>

      <div className="impact-grid">
        {["diet", "transport", "housing", "consumption"].map((key) => (
          <div key={key} className="impact-box">
            <h3>
              {key === "diet" && "🥗 " + t("results.tips_section.diet_title", "Diet")}
              {key === "transport" && "🚗 " + t("results.tips_section.transport_title", "Transport")}
              {key === "housing" && "🏠 " + t("results.tips_section.housing_title", "Housing")}
              {key === "consumption" && "🛍️ " + t("results.tips_section.consumption_title", "Consumption")}
            </h3>
            <p className="impact-value">{formatScore(eval(key))} kg CO₂</p>
            <p className="tip">{t(`results.tips_section.${key}`)}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button className="results-button">
          {t("results.see_tips_button", "🌱 See tips to reduce your footprint")}
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
