const db = require('../config/db');

// @desc    Get all dashboard data for a hospital
// @route   GET /api/hospital-dashboard
// @access  Private (Hospital)
// ... (keep the 'db' import)

const getHospitalDashboardData = async (req, res) => {
  try {
    const hospitalId = req.user.id; 

    // 1. Get Hospital Profile
    const [profileRows] = await db.query('SELECT hospital_name, email, city, state, capacity FROM hospitals WHERE hospital_id = ?', [hospitalId]);
    
    // 2. Get Blood Inventory
    const [inventoryRows] = await db.query('SELECT blood_type, quantity_ml FROM blood_inventory WHERE hospital_id = ? ORDER BY blood_type', [hospitalId]);
    
    // 3. Get ASSIGNED Pending Requests (Your existing query)
    const [assignedRequestRows] = await db.query(
      `SELECT r.firstname, r.lastname, r.bloodtype, r.reason, r.phone, hr.id as hospital_request_id, hr.approval_status
       FROM request AS r
       JOIN hospital_requests AS hr ON r.healthcard = hr.request_healthcard
       WHERE hr.hospital_id = ? AND hr.approval_status = 'Pending'`,
      [hospitalId]
    );

    // 4. Get UNASSIGNED Public Requests
    const [unassignedRequestRows] = await db.query(
      `SELECT r.* FROM request AS r
       LEFT JOIN hospital_requests AS hr ON r.healthcard = hr.request_healthcard
       WHERE hr.id IS NULL`
    );

    // 5. Get UNASSIGNED Donor Pledges
    const [donorRows] = await db.query('SELECT * FROM donate');
    
    // 6. Get Completed Donation Logs (Your existing query)
    const [donationRows] = await db.query('SELECT * FROM donation_tracking WHERE hospital_id = ? ORDER BY date_of_donation DESC', [hospitalId]);

    // Send all data back
    res.json({
      profile: profileRows[0],
      inventory: inventoryRows,
      assignedRequests: assignedRequestRows, // Renamed from pendingRequests
      unassignedRequests: unassignedRequestRows,
      donorPledges: donorRows,
      donationHistory: donationRows,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getHospitalDashboardData,
};