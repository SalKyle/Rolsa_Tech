import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend URL
});

// Define the getUserProfile function
export const getUserProfile = (userId) => {
  return API.get(`/user/${userId}`); 
};



export default API;

