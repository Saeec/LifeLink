const express = require('express');
const router = express.Router();
const { updateUserProfile, changePassword } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware'); // We re-use the user 'protect' guard

// @route   PUT /api/profile/update
// @desc    Update user's profile info
router.put('/update', protect, updateUserProfile);

// @route   PUT /api/profile/change-password
// @desc    Change user's password
router.put('/change-password', protect, changePassword);

module.exports = router;