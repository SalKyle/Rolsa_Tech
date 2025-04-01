// pages/DietPage.js
import React, { useState } from 'react';
import ProgressTracker from './components/ProgressTracker';
import dietCalculator from "../utils/dietCalculator"; // Adjust the import path as necessary
// import Navbar from './components/Navbar';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './cf_pages.css'


const DietPage = () => {
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
    
    <div >
      
      <h2>Diet</h2>
      <ProgressTracker progress={25} />
      <div className='cf-card'>
        <div className='cf-input'>
          <label>💳 Monthly restaurant/fast food spending (£):</label>
          <input 
            type="number" 
            value={restaurantSpending} 
            onChange={(e) => setRestaurantSpending(e.target.value)} 
            placeholder="e.g. 100"
          />
        </div>

        <div className='cf-input'>
          <label>🍽️ Estimated percentage of food wasted (%):</label>
          <input 
            type="number" 
            value={foodWaste} 
            onChange={(e) => setFoodWaste(e.target.value)} 
            placeholder="e.g. 20"
          />
          <small>Tip: Average households waste 20–30% of food</small>
        </div>

        <div className='cf-input'>
          <label>🌱 Do you buy local or seasonal produce?</label>
          <input 
            type="checkbox" 
            checked={localFood} 
            onChange={(e) => setLocalFood(e.target.checked)} 
          />
          <small>This reduces transportation emissions</small>
          <button onClick={handleCalculateDiet}>Next</button>
        </div>
      </div>

        
      </div>
  );
};

export default DietPage;
