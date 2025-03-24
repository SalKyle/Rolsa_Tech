import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/lnd-page/landing page";
import Signup from "./pages/signup/signup";
import Login from "./pages/login/login";
import HomePg from "./pages/homepage/homepg";

const App = () => {
  // State to manage user information
  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return storedUser?.token ? { token: storedUser.token } : null;
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
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup setUser={setUser} onError={onError} />} />
        <Route path="/login" element={<Login setUser={setUser} onError={onError} />} />
        <Route path="/landing" element={<LandingPage />} />
        {/* Default route now redirects to Landing Page */}
        <Route
          path="/"
          element={user ? <HomePg user={user} /> : <Navigate to="/landing" />}
        />
      </Routes>
    </Router>
  );
};

export default App;

