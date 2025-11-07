const db = require('../config/db');
const bcrypt = require('bcryptjs');

// @desc    Update a user's profile information
// @route   PUT /api/profile/update
// @access  Private
const updateUserProfile = async (req, res) => {
  const { firstname, lastname, phone } = req.body;
  const userID = req.user.id; // From 'protect' middleware

  if (!firstname || !lastname || !phone) {
    return res.status(400).json({ msg: 'Please provide firstname, lastname, and phone' });
  }

  try {
    await db.query(
      'UPDATE registration SET firstname = ?, lastname = ?, phone = ? WHERE userID = ?',
      [firstname, lastname, phone, userID]
    );

    res.json({ msg: 'Profile updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Change a user's password
// @route   PUT /api/profile/change-password
// @access  Private
const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userID = req.user.id; // From 'protect' middleware

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ msg: 'Please provide old and new password' });
  }

  try {
    // 1. Get the user's current hashed password
    const [users] = await db.query('SELECT password FROM registration WHERE userID = ?', [userID]);
    if (users.length === 0) {
      return res.status(404).json({ msg: 'User not found' });
    }
    const user = users[0];

    // 2. Compare oldPassword with the stored hash
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials. Old password does not match.' });
    }

    // 3. Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 4. Update the password in the database
    await db.query('UPDATE registration SET password = ? WHERE userID = ?', [hashedPassword, userID]);

    res.json({ msg: 'Password changed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  updateUserProfile,
  changePassword,
};