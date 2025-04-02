import React, { useState } from 'react';
import ProgressTracker from './components/ProgressTracker';
import dietCalculator from "../utils/dietCalculator";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // ✅
import './cf_pages.css';

const DietPage = () => {
  const { t } = useTranslation(); // ✅
  const [restaurantSpending, setRestaurantSpending] = useState(0);
  const [foodWaste, setFoodWaste] = useState(0);
  const [localFood, setLocalFood] = useState(false);
  const navigate = useNavigate();

  const handleCalculateDiet = () => {
    const diet = dietCalculator(restaurantSpending, foodWaste, localFood);
    console.log('Calculated Diet:', diet);
    navigate('./transport', { state: { diet } });
  };

  return (
    <div>
      <h2>{t("diet.header", "Diet")}</h2>
      <ProgressTracker progress={25} />

      <div className='cf-card'>
        <div className='cf-input'>
          <label>{t("diet.restaurant_spending_label", "💳 Monthly restaurant/fast food spending (£):")}</label>
          <input 
            type="number" 
            value={restaurantSpending} 
            onChange={(e) => setRestaurantSpending(e.target.value)} 
            placeholder={t("diet.restaurant_spending_placeholder", "e.g. 100")}
          />
        </div>

        <div className='cf-input'>
          <label>{t("diet.food_waste_label", "🍽️ Estimated percentage of food wasted (%):")}</label>
          <input 
            type="number" 
            value={foodWaste} 
            onChange={(e) => setFoodWaste(e.target.value)} 
            placeholder={t("diet.food_waste_placeholder", "e.g. 20")}
          />
          <small>{t("diet.food_waste_tip", "Tip: Average households waste 20–30% of food")}</small>
        </div>

        <div className='cf-input'>
          <label>{t("diet.local_food_label", "🌱 Do you buy local or seasonal produce?")}</label>
          <input 
            type="checkbox" 
            checked={localFood} 
            onChange={(e) => setLocalFood(e.target.checked)} 
          />
          <small>{t("diet.local_food_tip", "This reduces transportation emissions")}</small>
          <button onClick={handleCalculateDiet}>
            {t("diet.next_button", "Next")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DietPage;
