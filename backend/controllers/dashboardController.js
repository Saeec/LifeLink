const db = require('../config/db');

// @desc    Get all dashboard data for a user
// @route   GET /api/dashboard
// @access  Private
const getDashboardData = async (req, res) => {
  try {
    const userID = req.user.id; 

    // 1. Get User Profile Info
    const [userRows] = await db.query(
      'SELECT firstname, lastname, email, phone, healthcard FROM registration WHERE userID = ?',
      [userID]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const userProfile = userRows[0];
    const userHealthCard = userProfile.healthcard; 

    // 2. Get User's Donation Pledges
    // --- THIS IS THE FIXED QUERY ---
    // It now correctly looks at the 'donate' table
    const [donationRows] = await db.query(
      'SELECT * FROM donate WHERE healthcard <=> ?',
      [userHealthCard]
    );
    let userDonations = donationRows;

    // 3. Get User's Blood Requests
    // This query was already correct
    const [requestRows] = await db.query(
      `SELECT r.firstname, r.lastname, r.bloodtype, r.reason, hr.approval_status
       FROM request AS r
       LEFT JOIN hospital_requests AS hr ON r.healthcard = hr.request_healthcard
       WHERE r.healthcard <=> ?
       ORDER BY r.firstname`,
      [userHealthCard]
    );
    let userRequests = requestRows;
    

    // 4. Send all data back
    res.json({
      profile: userProfile,
      donations: userDonations,
      requests: userRequests,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getDashboardData,
};