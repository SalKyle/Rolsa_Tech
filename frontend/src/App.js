import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing page";
import Signup from "./pages/signup"; // Ensure this file exists
import Login from "./pages/login"; // Ensure this file exists

const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
