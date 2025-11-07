import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HospitalList from './components/HospitalList';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';
import HospitalLogin from './components/HospitalLogin';
import HospitalRegister from './components/HospitalRegister';
import Dashboard from './components/Dashboard';
import HospitalAdminDashboard from './components/HospitalAdminDashboard';

// --- IMPORT NEW COMPONENTS ---
import DonateForm from './components/DonateForm';
import RequestForm from './components/RequestForm';
import InfoPage from './components/InfoPage';
import ProfileManagement from './components/ProfileManagement';
import Footer from './components/Footer';


import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <Link to="/" className="logo">
          <h1>🩸 LifeLink</h1>
        </Link>
        <nav>
          <Link to="/">Home</Link>
          
          <Link to="/donate">Donate</Link>
          <Link to="/request">Request Blood</Link>
          <Link to="/about">About & FAQ</Link>
          <Link to="/login">User Login</Link>
          <Link to="/register-hospital" className="login-btn">Hospital Portal</Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hospitals" element={<HospitalList />} />

          {/* Auth Routes */}
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login-hospital" element={<HospitalLogin />} />
          <Route path="/register-hospital" element={<HospitalRegister />} />

          {/* Form Routes */}
          <Route path="/donate" element={<DonateForm />} />
          <Route path="/request" element={<RequestForm />} />

          {/* --- ADD NEW DASHBOARD ROUTE --- */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hospital/admin" element={<HospitalAdminDashboard />} />
          <Route path="/about" element={<InfoPage />} />
          <Route path="/profile-settings" element={<ProfileManagement />} />

          {/* TODO: Create components for these routes */}
          {/* <Route path="/hospital/admin" element={<HospitalAdminDashboard />} /> */}

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

// Simple Home Page Component
const HomePage = () => (
  <div className="homepage">
    <h2>Welcome to LifeLink</h2>
    <p>Your connection to life-saving blood donations.</p>
    <div style={{ marginTop: '20px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
      <Link to="/login" className="btn btn-primary" style={{ width: '200px' }}>User Login</Link>
      <Link to="/register-hospital" className="btn btn-primary" style={{ width: '200px' }}>Hospital Portal</Link>
    </div>
  </div>
);

export default App;