const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register a new hospital
// @route   POST /api/hospital-auth/register
const registerHospital = async (req, res) => {
  const { hospital_name, address, city, state, contact_number, email, password, capacity } = req.body;

  // Simple validation
  if (!email || !password || !hospital_name || !city || !state) {
    return res.status(400).json({ msg: 'Please enter all required fields' });
  }

  try {
    // Check if hospital already exists
    const [existing] = await db.query('SELECT * FROM hospitals WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ msg: 'Hospital already registered with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new hospital
    const [result] = await db.query(
      'INSERT INTO hospitals (hospital_name, address, city, state, contact_number, email, password, capacity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [hospital_name, address, city, state, contact_number, email, hashedPassword, capacity || 0]
    );
    const newHospitalId = result.insertId;

    // Create and send token
    const token = jwt.sign({ id: newHospitalId, type: 'hospital' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Login a hospital
// @route   POST /api/hospital-auth/login
const loginHospital = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check for hospital
    const [hospitals] = await db.query('SELECT * FROM hospitals WHERE email = ?', [email]);
    if (hospitals.length === 0) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const hospital = hospitals[0];

    // Check password
    const isMatch = await bcrypt.compare(password, hospital.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create and send token
    const token = jwt.sign({ id: hospital.hospital_id, type: 'hospital' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  registerHospital,
  loginHospital,
};