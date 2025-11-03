const jwt = require('jsonwebtoken');

const protectHospital = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // --- Check if user is a hospital ---
      if (decoded.type !== 'hospital') {
        return res.status(401).json({ msg: 'Not authorized, not a hospital account' });
      }

      // Attach user (which is the hospital) to the request
      req.user = decoded; 

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ msg: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ msg: 'Not authorized, no token' });
  }
};

module.exports = { protectHospital };