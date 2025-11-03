const db = require('../config/db');

// @desc    Submit a donation form
// @route   POST /api/donate
const submitDonateForm = async (req, res) => {
  const { healthcard, firstname, lastname, age, address, bloodtype, gender, phone } = req.body;

  if (!firstname || !lastname || !age || !bloodtype || !gender || !phone) {
    return res.status(400).json({ msg: 'Please fill out all required fields.' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO donate (healthcard, firstname, lastname, age, address, bloodtype, gender, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [healthcard || null, firstname, lastname, age, address, bloodtype, gender, phone]
    );

    res.status(201).json({ msg: 'Donation form submitted successfully', id: result.insertId });
  
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  submitDonateForm,
};