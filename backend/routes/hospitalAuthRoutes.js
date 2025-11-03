const express = require('express');
const router = express.Router();
const { registerHospital, loginHospital } = require('../controllers/hospitalAuthController');

// @route   POST /api/hospital-auth/register
// @desc    Register a hospital
router.post('/register', registerHospital);

// @route   POST /api/hospital-auth/login
// @desc    Login a hospital
router.post('/login', loginHospital);

module.exports = router;