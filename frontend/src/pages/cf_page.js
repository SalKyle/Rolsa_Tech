import React from "react";
import { Routes, Route } from "react-router-dom";
import DietPage from "./DietPage";
import TransportPage from "./TransportPage";
import HousingPage from "./HousingPage";
import ConsumptionPage from "./ConsumptionPage";
import ResultsPage from "./ResultsPage";

const CfScore = () => {
  return (
    <Routes>
      <Route path="/" element={<DietPage />} />
      <Route path="/transport" element={<TransportPage />} />
      <Route path="/housing" element={<HousingPage />} />
      <Route path="/consumption" element={<ConsumptionPage />} />
      <Route path="/results" element={<ResultsPage />} />
    </Routes>
  );
};

export default CfScore;
