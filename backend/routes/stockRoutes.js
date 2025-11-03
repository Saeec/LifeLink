const express = require('express');
const router = express.Router();
const { updateStock } = require('../controllers/stockController');
const { protectHospital } = require('../middleware/hospitalAuthMiddleware');

// @route   POST /api/stock
// @desc    Add or update blood stock
router.post('/', protectHospital, updateStock);

module.exports = router;