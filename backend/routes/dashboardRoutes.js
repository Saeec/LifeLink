const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/dashboard
// @desc    Get all dashboard data for logged in user
// @access  Private
router.get('/', protect, getDashboardData);

module.exports = router;