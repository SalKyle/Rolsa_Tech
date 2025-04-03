
const k1 = 0.3; // Coefficient for restaurant spending
const k2 = 0.2; // Coefficient for food waste percentage
const k3 = 0.1; // Coefficient for local food indicator

const calculateDiet = (restaurantSpending, foodWaste, localFood) => {
  return (k1 * restaurantSpending) + (k2 * foodWaste) - (k3 * (localFood ? 1 : 0));
};

export default calculateDiet;
