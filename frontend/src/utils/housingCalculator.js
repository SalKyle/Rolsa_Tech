
const h1 = 0.8; // House type factor
const h2 = 0.1; // Number of bedrooms factor
const h3 = 0.5; // Heating fuel factor
const h4 = 0.3; // Green tariff penalty
const h5 = 0.2; // Standby usage penalty
const h6 = 0.4; // Winter temperature penalty
const h7 = 0.6; // Energy efficiency score

const calculateHousing = (houseData) => {
  const { houseTypeFactor, numBedrooms, heatingFuelFactor, greenTariff, standbyUsage, winterTemp, energyEfficiency } = houseData;
  return (h1 * houseTypeFactor) + 
         (h2 * numBedrooms) + 
         (h3 * heatingFuelFactor) + 
         (h4 * (1 - greenTariff)) + 
         (h5 * (1 - standbyUsage)) + 
         (h6 * winterTemp) - 
         (h7 * energyEfficiency);
};

export default calculateHousing;
