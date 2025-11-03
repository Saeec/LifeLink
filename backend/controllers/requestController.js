const db = require('../config/db');

// @desc    Submit a blood request form
// @route   POST /api/request
const submitRequestForm = async (req, res) => {
  const { healthcard, firstname, lastname, age, address, bloodtype, gender, reason, phone } = req.body;

  if (!firstname || !lastname || !age || !bloodtype || !gender || !phone || !reason) {
    return res.status(400).json({ msg: 'Please fill out all required fields.' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO request (healthcard, firstname, lastname, age, address, bloodtype, gender, reason, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [healthcard || null, firstname, lastname, age, address, bloodtype, gender, reason, phone]
    );

    res.status(201).json({ msg: 'Blood request submitted successfully', id: result.insertId });
  
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  submitRequestForm,
};