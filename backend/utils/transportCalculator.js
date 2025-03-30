// utils/transportCalculator.js
const k4 = 0.5; // Mode factor for transport
const k5 = 0.2; // Factor for train hours per week
const k6 = 0.3; // Factor for flights in UK
const k7 = 0.4; // Factor for flights in Europe
const k8 = 0.6; // Factor for non-European flights

const calculateTransport = (transportData) => {
  const { transportModeFactor, trainHours, flightsUK, flightsEurope, flightsNonEurope, flightOffsetPercent } = transportData;
  return (k4 * transportModeFactor) + 
         (k5 * trainHours) + 
         (k6 * flightsUK) + 
         (k7 * flightsEurope) + 
         (k8 * flightsNonEurope * (1 - flightOffsetPercent));
};

export default calculateTransport;
