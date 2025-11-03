const express = require('express');
const router = express.Router();
const { submitDonateForm } = require('../controllers/donateController');

// @route   POST /api/donate
// @desc    Submit a donation registration form
router.post('/', submitDonateForm);

module.exports = router;