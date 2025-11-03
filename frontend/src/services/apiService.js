import axios from 'axios';

// The 'proxy' in package.json will automatically prepend 'http://localhost:5000'
// to these requests during development.
const API_BASE_URL = '/api';

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// --- Hospital Service ---
export const getHospitals = () => {
  return api.get('/hospitals');
};

// TODO: Add functions for other services
// --- Inventory Service ---
// export const getInventory = (hospitalId) => api.get(`/inventory/${hospitalId}`);

// --- Auth Service ---
// export const loginUser = (credentials) => api.post('/auth/login', credentials);
// export const registerUser = (userData) => api.post('/auth/register', userData);


// Default export (optional, but convenient)
const apiService = {
  getHospitals,
  // getInventory,
  // loginUser,
  // registerUser
};

export default apiService;