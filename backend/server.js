require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Imports the db connection pool

const app = express();
const PORT = process.env.PORT || 5000;

// === Middleware ===
app.use(cors());
app.use(express.json());

// === API Routes ===
app.get('/', (req, res) => {
  res.send('LifeLink API is running...');
});

app.use('/api/hospitals', require('./routes/hospitalRoutes'));

// --- ADD THESE NEW LINES ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/hospital-auth', require('./routes/hospitalAuthRoutes'));
app.use('/api/donate', require('./routes/donateRoutes'));
app.use('/api/request', require('./routes/requestRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/hospital-dashboard', require('./routes/hospitalDashboardRoutes'));
app.use('/api/stock', require('./routes/stockRoutes'));
app.use('/api/request-management', require('./routes/requestManagementRoutes'));
// ---------------------------

// === Start Server ===
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});