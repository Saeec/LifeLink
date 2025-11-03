require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Imports the db connection pool

const app = express();
const PORT = process.env.PORT || 5000;

// === Middleware ===
// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());
// Parse JSON request bodies
app.use(express.json());

// === API Routes ===
// Test route
app.get('/', (req, res) => {
  res.send('LifeLink API is running...');
});

// Mount hospital routes
app.use('/api/hospitals', require('./routes/hospitalRoutes'));

// TODO: Add other routes here
// app.use('/api/inventory', require('./routes/inventoryRoutes'));
// app.use('/api/donations', require('./routes/donationRoutes'));
// app.use('/api/requests', require('./routes/requestRoutes'));
// app.use('/api/auth', require('./routes/authRoutes'));


// === Start Server ===
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});