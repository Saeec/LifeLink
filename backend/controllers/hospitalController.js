const db = require('../config/db'); // Import the database pool

// Controller function to get all hospitals
const getAllHospitals = async (req, res) => {
  try {
    // Get a connection from the pool
    const connection = await db.getConnection();
    
    // Execute the query
    const [rows] = await connection.query('SELECT * FROM hospitals');
    
    // Release the connection back to the pool
    connection.release();
    
    // Send the data as JSON
    res.json(rows);

  } catch (err) {
    console.error('Error fetching hospitals:', err);
    res.status(500).json({ error: 'Server error while fetching hospitals' });
  }
};

// TODO: Add other controller functions here
// const getHospitalById = async (req, res) => { ... }
// const createHospital = async (req, res) => { ... }


// Export the controller functions
module.exports = {
  getAllHospitals
  // getHospitalById,
  // createHospital
};