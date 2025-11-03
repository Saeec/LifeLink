const express = require('express');
const router = express.Router();
const { submitRequestForm } = require('../controllers/requestController');

// @route   POST /api/request
// @desc    Submit a blood request form
router.post('/', submitRequestForm);

module.exports = router;