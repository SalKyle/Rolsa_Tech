import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend URL
});

// Define the getUserProfile function
export const getUserProfile = (userId) => {
  return API.get(`/user/${userId}`); // Adjust the URL path according to your backend
};

// You can define other API functions here, e.g., login, fetch user data

export default API;

