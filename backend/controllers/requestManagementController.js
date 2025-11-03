const db = require('../config/db');

// @desc    Claim an unassigned request
// @route   POST /api/request-management/claim
// @access  Private (Hospital)
const claimRequest = async (req, res) => {
  const { request_healthcard } = req.body;
  const hospitalId = req.user.id;

  if (!request_healthcard) {
    return res.status(400).json({ msg: 'Request healthcard is required' });
  }

  try {
    // Check if it's already claimed
    const [existing] = await db.query(
      'SELECT * FROM hospital_requests WHERE request_healthcard = ?', 
      [request_healthcard]
    );

    if (existing.length > 0) {
      return res.status(400).json({ msg: 'This request has already been claimed by a hospital' });
    }

    // Claim it (add to hospital_requests)
    await db.query(
      'INSERT INTO hospital_requests (hospital_id, request_healthcard, approval_status) VALUES (?, ?, ?)',
      [hospitalId, request_healthcard, 'Pending']
    );

    res.json({ msg: 'Request claimed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Approve or Reject a claimed request
// @route   PUT /api/request-management/:id
// @access  Private (Hospital)
const updateRequestStatus = async (req, res) => {
  const { status } = req.body; // 'Approved' or 'Rejected'
  const hospitalRequestId = req.params.id;
  const hospitalId = req.user.id;

  if (status !== 'Approved' && status !== 'Rejected') {
    return res.status(400).json({ msg: 'Invalid status' });
  }

  try {
    // Update the status
    const [result] = await db.query(
      'UPDATE hospital_requests SET approval_status = ? WHERE id = ? AND hospital_id = ?',
      [status, hospitalRequestId, hospitalId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Request not found or not authorized' });
    }

    res.json({ msg: `Request ${status.toLowerCase()}` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  claimRequest,
  updateRequestStatus,
};