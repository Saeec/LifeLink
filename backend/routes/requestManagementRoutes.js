const express = require('express');
const router = express.Router();
const { claimRequest, updateRequestStatus } = require('../controllers/requestManagementController');
const { protectHospital } = require('../middleware/hospitalAuthMiddleware');

// @route   POST /api/request-management/claim
// @desc    Claim an unassigned request
router.post('/claim', protectHospital, claimRequest);

// @route   PUT /api/request-management/:id
// @desc    Approve or Reject a claimed request
router.put('/:id', protectHospital, updateRequestStatus);

module.exports = router;