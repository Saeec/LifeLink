const db = require('mysql2/promise'); // Import the promise-based version

// @desc    Log a completed donation
// @route   POST /api/donations/log
// @access  Private (Hospital)
const logDonation = async (req, res) => {
  const { donorHealthcard, bloodType, quantity_ml, dateOfDonation } = req.body;
  const hospitalId = req.user.id; // From protectHospital middleware

  if (!donorHealthcard || !bloodType || !quantity_ml || !dateOfDonation) {
    return res.status(400).json({ msg: 'Please provide all donation details' });
  }

  const quantity = parseInt(quantity_ml);
  const pool = require('../config/db'); // Get the pool
  const conn = await pool.getConnection(); // Get a single connection for transaction

  try {
    // === 1. Start Transaction ===
    await conn.beginTransaction();

    // === 2. Get hospital capacity & current total stock (with a lock) ===
    const [hospitalRows] = await conn.query(
      'SELECT capacity FROM hospitals WHERE hospital_id = ? FOR UPDATE',
      [hospitalId]
    );
    const capacity = hospitalRows[0].capacity;

    const [stockRows] = await conn.query(
      'SELECT SUM(quantity_ml) AS total_stock FROM blood_inventory WHERE hospital_id = ?',
      [hospitalId]
    );
    let totalStock = stockRows[0].total_stock || 0;

    // === 3. Check Capacity ===
    const newTotalStock = totalStock + quantity;
    if (newTotalStock > capacity) {
      await conn.rollback();
      conn.release();
      return res.status(400).json({
        msg: `Cannot log donation. New total (${newTotalStock}ml) would exceed hospital capacity (${capacity}ml).`,
      });
    }

    // === 4. Insert into donation_tracking ===
    await conn.query(
      'INSERT INTO donation_tracking (donor_healthcard, hospital_id, date_of_donation, quantity_ml) VALUES (?, ?, ?, ?)',
      [donorHealthcard, hospitalId, dateOfDonation, quantity]
    );

    // === 5. Add to blood_inventory (UPSERT with increment) ===
    await conn.query(
      `INSERT INTO blood_inventory (hospital_id, blood_type, quantity_ml) 
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE quantity_ml = quantity_ml + ?`,
      [hospitalId, bloodType, quantity, quantity]
    );

    // === 6. Delete from donate (pledge) table ===
    await conn.query('DELETE FROM donate WHERE healthcard = ?', [donorHealthcard]);

    // === 7. Commit Transaction ===
    await conn.commit();
    conn.release();

    res.json({ msg: 'Donation logged successfully' });
  } catch (err) {
    // If anything fails, roll back
    await conn.rollback();
    conn.release();
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  logDonation,
};