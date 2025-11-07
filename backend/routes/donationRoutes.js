const express = require('express');
const router = express.Router();
const { logDonation } = require('../controllers/logDonationController');
const { protectHospital } = require('../middleware/hospitalAuthMiddleware');

// @route   POST /api/donations/log
// @desc    Log a completed donation
router.post('/log', protectHospital, logDonation);

module.exports = router;