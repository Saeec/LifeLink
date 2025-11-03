const express = require('express');
const router = express.Router();
const { getHospitalDashboardData } = require('../controllers/hospitalDashboardController');
const { protectHospital } = require('../middleware/hospitalAuthMiddleware');

// @route   GET /api/hospital-dashboard
// @desc    Get all dashboard data for logged in hospital
// @access  Private
router.get('/', protectHospital, getHospitalDashboardData);

module.exports = router;