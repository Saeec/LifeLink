const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');

// @route   GET /api/hospitals
// @desc    Get all hospitals
// @access  Public
router.get('/', hospitalController.getAllHospitals);

// @route   GET /api/hospitals/:id
// @desc    Get a single hospital by ID
// @access  Public
// TODO: Create the getHospitalById controller function
// router.get('/:id', hospitalController.getHospitalById);

// @route   POST /api/hospitals
// @desc    Create a new hospital (for hospital registration)
// @access  Private (Admin)
// TODO: Create the createHospital controller function
// router.post('/', hospitalController.createHospital);

module.exports = router;