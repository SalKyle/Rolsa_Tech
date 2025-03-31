import React from "react";
import Navbar from "./components/Navbar";
import ProgressTracker from "./components/ProgressTracker";

const ResultsPage = ({ diet, transport, housing, consumption }) => {
  const totalFootprint = diet + transport + housing + consumption;

  // Example national average benchmark (UK ~10-15 tonnes)
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
    <div className="p-6 max-w-3xl mx-auto">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4 text-center">🌍 Your Carbon Footprint Results</h1>

      <ProgressTracker progress={100} />

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold">Total Footprint</h2>
        <p className="text-2xl font-bold text-green-700 mt-2">
          {formatScore(totalFootprint)} kg CO₂ / year
        </p>
        <p className="text-sm text-gray-600 mt-1">
          That's about {percentageOfAverage}% of the UK national average (~{averageUK} kg CO₂/year).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold text-lg">🥗 Diet</h3>
          <p className="text-green-800 font-bold">{formatScore(diet)} kg CO₂</p>
          <p className="text-sm text-gray-700 mt-1">{tips.diet}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold text-lg">🚗 Transport</h3>
          <p className="text-green-800 font-bold">{formatScore(transport)} kg CO₂</p>
          <p className="text-sm text-gray-700 mt-1">{tips.transport}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold text-lg">🏠 Housing</h3>
          <p className="text-green-800 font-bold">{formatScore(housing)} kg CO₂</p>
          <p className="text-sm text-gray-700 mt-1">{tips.housing}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold text-lg">🛍️ Consumption</h3>
          <p className="text-green-800 font-bold">{formatScore(consumption)} kg CO₂</p>
          <p className="text-sm text-gray-700 mt-1">{tips.consumption}</p>
        </div>
      </div>

      <div className="text-center">
        <button className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition">
          🌱 See tips to reduce your footprint
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
