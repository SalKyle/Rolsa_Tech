
const c1 = 0.2; // Electronics purchase factor
const c2 = 0.3; // Clothes spending factor
const c3 = 0.1; // Pets spending factor
const c4 = 0.2; // Health/beauty spending factor
const c5 = 0.3; // Communication spending factor
const c6 = 0.4; // Entertainment spending factor
const c7 = 0.5; // Recycling/composting score

const calculateConsumption = (consumptionData) => {
  const { electronicsPurchase, clothesSpending, petsSpending, healthBeautySpending, communicationSpending, entertainmentSpending, recyclingScore } = consumptionData;
  return (c1 * electronicsPurchase) + 
         (c2 * clothesSpending) + 
         (c3 * petsSpending) + 
         (c4 * healthBeautySpending) + 
         (c5 * communicationSpending) + 
         (c6 * entertainmentSpending) - 
         (c7 * recyclingScore);
};

export default calculateConsumption;
