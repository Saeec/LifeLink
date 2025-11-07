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

    
    // It now reads from donation_tracking and joins hospitals
    const [donationRows] = await db.query(
      `SELECT dt.date_of_donation, dt.quantity_ml, h.hospital_name 
       FROM donation_tracking AS dt
       JOIN hospitals AS h ON dt.hospital_id = h.hospital_id
       WHERE dt.donor_healthcard <=> ?
       ORDER BY dt.date_of_donation DESC`,
      [userHealthCard]
    );
    let userDonations = donationRows;
    // ------------------------------------

    // Query A (To get Request Status & "Approved By"): This query must JOIN three tables:

//request (to get the user's requests based on their healthcard).

//hospital_requests (to get the approval_status).

//hospitals (to get the hospital_name and contact_number).
    const [requestRows] = await db.query(
      `SELECT r.firstname, r.lastname, r.bloodtype, r.reason, hr.approval_status,
              h.hospital_name, h.contact_number
       FROM request AS r
       LEFT JOIN hospital_requests AS hr ON r.healthcard = hr.request_healthcard
       LEFT JOIN hospitals AS h ON hr.hospital_id = h.hospital_id
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