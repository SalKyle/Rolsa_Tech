// pages/ResultsPage.js
import React from "react";

const ResultsPage = ({ diet, transport, housing, consumption }) => {
  const totalFootprint = diet + transport + housing + consumption;

  return (
    <div>
      <h1>Total Carbon Footprint</h1>
      <p>{`Your total carbon footprint is: ${totalFootprint} kg CO2`}</p>
    </div>
  );
};

export default ResultsPage;
