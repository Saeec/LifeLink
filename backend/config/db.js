const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
pool.getConnection()
  .then(connection => {
    console.log('🎉 Successfully connected to MySQL database!');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Error connecting to MySQL:', err.stack);
  });

module.exports = pool;