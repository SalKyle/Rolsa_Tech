import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/lnd-page/landing page";
import Signup from "./pages/signup/signup";
import Login from "./pages/login/login";
import HomePg from "./pages/homepage/homepg";
import CfPage from "./pages/cf_page";
import EVLocator from "./pages/EVLocator";
import EnergyTracker from "./pages/EnergyTracker";
import BookingPage from "./pages/BookingPage";
import Dashboard from "../src/pages/components/Dashboard";
import Products from "./pages/ProductsPage";
import { AuthContext } from "./context/AuthContext"; 

const App = () => {
  // State to manage user information
  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    // return storedUser?.token ? storedUser : null;
    return storedUser || null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Error handler
  const onError = (error) => {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  };

  return (
  <AuthContext.Provider value={{ currentUser: user, setCurrentUser: setUser }}>
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup setUser={setUser} onError={onError} />} />
        <Route path="/login" element={<Login setUser={setUser} onError={onError} />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/cf_page/*" element={<CfPage />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/EVLocator" element={<EVLocator />} />
        <Route path="/BookingPage" element={<BookingPage />} />
        <Route path="/EnergyTracker" element={<EnergyTracker />} />
        {/* <Route path="/Dashboard" element={<Dashboard />} /> */}
        
        <Route
          path="/"
          element={user ? <HomePg user={user} /> : <Navigate to="/landing" />}
        />
      </Routes>
    </Router>
  </AuthContext.Provider>
  );
};

export default App;

