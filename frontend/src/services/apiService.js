import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// --- Hospital Service ---
export const getHospitals = () => {
  return api.get('/hospitals');
};

// --- Auth Service (Users) ---
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (credentials) => api.post('/auth/login', credentials);

// --- Auth Service (Hospitals) ---
export const registerHospital = (hospitalData) => api.post('/hospital-auth/register', hospitalData);
export const loginHospital = (credentials) => api.post('/hospital-auth/login', credentials);

// --- ADD THESE NEW FUNCTIONS ---
// --- Form Submissions ---
export const submitDonateForm = (formData) => api.post('/donate', formData);
export const submitRequestForm = (formData) => api.post('/request', formData);
// --- User Dashboard ---
export const getDashboardData = (token) => {
  return api.get('/dashboard', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};
export const getHospitalDashboardData = (token) => {
  return api.get('/hospital-dashboard', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};
export const updateStock = (token, stockData) => {
  return api.post('/stock', stockData, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};
// --- Request Management ---
export const claimRequest = (token, request_healthcard) => {
  return api.post('/request-management/claim', { request_healthcard }, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};
export const updateRequestStatus = (token, requestId, status) => {
  return api.put(`/request-management/${requestId}`, { status }, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};
export const logDonation = (token, donationData) => {
  return api.post('/donations/log', donationData, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};
export const updateUserProfile = (token, profileData) => {
  return api.put('/profile/update', profileData, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};
export const changePassword = (token, passwordData) => {
  return api.put('/profile/change-password', passwordData, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

/*/ --- ADD THIS (We'll use this next) ---
// --- Donor Management ---
export const acceptDonation = (token, donorData) => {
  return api.post('/hospital-dashboard/accept-donation', donorData, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
};*/
// -----------------------------

// Default export
const apiService = {
  getHospitals,
  registerUser,
  loginUser,
  registerHospital,
  loginHospital,
  submitDonateForm, // Add here
  submitRequestForm, 
  getDashboardData,// Add here
  getHospitalDashboardData,
  updateStock,
  claimRequest,
  updateRequestStatus,
  logDonation,
  updateUserProfile,
  changePassword,
  //acceptDonation,
};

export default apiService;