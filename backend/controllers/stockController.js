const db = require('../config/db');

// @desc    Add or update blood stock for a hospital
// @route   POST /api/stock
// @access  Private (Hospital)
const updateStock = async (req, res) => {
  const { blood_type, quantity_ml } = req.body;
  const hospitalId = req.user.id; // From protectHospital middleware

  if (!blood_type || !quantity_ml) {
    return res.status(400).json({ msg: 'Please provide blood type and quantity' });
  }

  const quantity = parseInt(quantity_ml);
  if (isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ msg: 'Quantity must be a positive number' });
  }

  try {
    const conn = await db.getConnection();

    // === 1. Start a Transaction ===
    await conn.beginTransaction();

    // === 2. Get hospital capacity AND current total stock (with a lock) ===
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

    // === 3. Get current stock for the specific blood type ===
    const [currentTypeRows] = await conn.query(
      'SELECT quantity_ml FROM blood_inventory WHERE hospital_id = ? AND blood_type = ?', 
      [hospitalId, blood_type]
    );
    let currentTypeStock = 0;
    
    if (currentTypeRows.length > 0) {
      currentTypeStock = currentTypeRows[0].quantity_ml;
    }

    // === 4. Check Capacity ===
    // This is the rule: New total stock cannot exceed capacity.
    const newTotalStock = (totalStock - currentTypeStock) + quantity;
    if (newTotalStock > capacity) {
      await conn.rollback(); // Undo the lock
      conn.release();
      return res.status(400).json({ 
        msg: `Cannot add stock. New total (${newTotalStock}ml) would exceed hospital capacity (${capacity}ml).` 
      });
    }

    // === 5. Add/Update Stock (UPSERT) ===
    await conn.query(
      `INSERT INTO blood_inventory (hospital_id, blood_type, quantity_ml) 
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE quantity_ml = ?`,
      [hospitalId, blood_type, quantity, quantity]
    );

    // === 6. Commit Transaction ===
    await conn.commit();
    conn.release();

    res.json({ msg: 'Stock updated successfully' });

  } catch (err) {
    // If anything fails, roll back
    await conn.rollback();
    conn.release();
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  updateStock,
};