const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  // --- UPDATED: Get new fields from body ---
  const { email, password, firstname, lastname, phone, healthcard } = req.body;

  if (!email || !password || !firstname || !lastname || !phone) {
    return res.status(400).json({ msg: 'Please enter all required fields' });
  }

  try {
    // Check if user already exists (by email or healthcard)
    const [existing] = await db.query('SELECT * FROM registration WHERE email = ? OR healthcard = ?', [email, healthcard || null]);
    if (existing.length > 0) {
      return res.status(400).json({ msg: 'User already exists with this email or healthcard' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // --- UPDATED: Insert new user with all fields ---
    const [result] = await db.query(
      'INSERT INTO registration (email, password, firstname, lastname, phone, healthcard) VALUES (?, ?, ?, ?, ?, ?)', 
      [email, hashedPassword, firstname, lastname, phone, healthcard || null]
    );
    const newUserId = result.insertId;

    // Create and send token
    const token = jwt.sign({ id: newUserId, type: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Login a user
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check for user
    const [users] = await db.query('SELECT * FROM registration WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const user = users[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create and send token
    const token = jwt.sign({ id: user.userID, type: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  registerUser,
  loginUser,
};