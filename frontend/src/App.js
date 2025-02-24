import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/lnd-page/landing page";
import Signup from "./pages/signup/signup";
import Login from "./pages/login/login";

const App = () => {
  // State to manage user information
  const [user, setUser] = useState(null);

  // Error handler
  const onError = (error) => {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/signup"
          element={<Signup setUser={setUser} onError={onError} />}
        />
        <Route
          path="/login"
          element={<Login setUser={setUser} onError={onError} />}
        />
        
        {/* Conditionally render based on the user state */}
        <Route
          path="/"
          element={
            user ? (
              <div>Welcome, {user.username}!</div> // Example of user-specific content
            ) : (
              <LandingPage />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
