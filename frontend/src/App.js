import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HospitalList from './components/HospitalList';
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
          <Link to="/hospitals">Find Hospitals</Link>
          <Link to="/donate">Donate</Link>
          <Link to="/request">Request Blood</Link>
          <Link to="/login" className="login-btn">Login</Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hospitals" element={<HospitalList />} />
          {/* TODO: Create components for these routes */}
          {/* <Route path="/donate" element={<DonateForm />} /> */}
          {/* <Route path="/request" element={<RequestForm />} /> */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
      </main>
    </div>
  );
}

// Simple Home Page Component
const HomePage = () => (
  <div className="homepage">
    <h2>Welcome to LifeLink</h2>
    <p>Your connection to life-saving blood donations.</p>
  </div>
);

export default App;