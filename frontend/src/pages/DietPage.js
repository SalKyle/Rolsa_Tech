// pages/DietPage.js
import React, { useState } from 'react';
import ProgressTracker from './components/ProgressTracker';
import dietCalculator from "../utils/dietCalculator"; // Adjust the import path as necessary
import Navbar from './components/Navbar';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const DietPage = () => {
  const [restaurantSpending, setRestaurantSpending] = useState(0);
  const [foodWaste, setFoodWaste] = useState(0);
  const [localFood, setLocalFood] = useState(false);
  const navigate = useNavigate();


  const handleCalculateDiet = () => {
    const diet = dietCalculator(restaurantSpending, foodWaste, localFood);
    console.log('Calculated Diet:', diet);
    navigate('/transport');
  };

  return (
    
    <div>
      <Navbar />
      <h2>Diet</h2>
      <ProgressTracker progress={25} />
      <div>
        <label>Restaurant Spending:</label>
        <input 
          type="number" 
          value={restaurantSpending} 
          onChange={(e) => setRestaurantSpending(e.target.value)} 
        />
      </div>
      <div>
        <label>Food Waste Percentage:</label>
        <input 
          type="number" 
          value={foodWaste} 
          onChange={(e) => setFoodWaste(e.target.value)} 
        />
      </div>
      <div>
        <label>Do you buy local food?</label>
        <input 
          type="checkbox" 
          checked={localFood} 
          onChange={(e) => setLocalFood(e.target.checked)} 
        />
      </div>
      <button onClick={handleCalculateDiet}>Next</button>
    </div>
  );
};

export default DietPage;
