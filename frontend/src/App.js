import React, { useState, useEffect } from 'react';
import Signup from './pages/signup';
import { getUserProfile } from './services/api';
import { jwtDecode } from 'jwt-decode'; // Correct named import

const App = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // State for capturing signup errors

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the token using jwtDecode
        const userId = decodedToken.userId; // Extract userId (change this depending on your token structure)
        
        getUserProfile(userId)
          .then(response => {
            console.log(response.data); // Handle the response data
            setUser(response.data); // Set the user data
          })
          .catch(error => {
            console.error('Error fetching user profile:', error); // Handle errors
            setError('Error fetching user profile. Please try again later.');
          });
      } catch (error) {
        console.error('Error decoding token:', error); // Handle token decoding errors
        setError('Invalid token. Please log in again.');
      }
    }
  }, []);

  const handleSignupError = (error) => {
    setError('Error during signup. Please try again later.');
    console.error('Signup error:', error);
  };

  return (
    <div>
      {user ? (
        <div>Welcome, {user.name}</div>
      ) : (
        <div>
          {/* Display error message if signup fails */}
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <Signup setUser={setUser} onError={handleSignupError} />
        </div>
      )}
    </div>
  );
};

export default App;
