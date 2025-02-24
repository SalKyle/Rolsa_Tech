import React, { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/lnd-page/landing page";
import Signup from "./pages/signup/signup";
import Login from "./pages/login/login";
import HomePg from "./pages/homepage/homepg";

const App = () => {
  // State to manage user information
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
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
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/signup" element={<Signup setUser={setUser} onError={onError} />} />
        <Route path="/login" element={<Login setUser={setUser} onError={onError} />} />
        
        {/* Conditionally render HomePg if user exists, otherwise redirect to login */}
        <Route
          path="/"
          element={user ? (
            <>
              <div>Welcome, {user.username}!</div>
              <HomePg user={user} /> {/* Pass user prop to HomePg */}
            </>
          ) : (
            <Login setUser={setUser} onError={onError} />
          )}
        />

      </Routes>
    </Router>
  );
};

export default App;
