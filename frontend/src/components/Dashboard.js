import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // If no token, redirect to login
        return;
      }

      try {
        const response = await apiService.getDashboardData(token);
        setData(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          setError('Session expired. Please log in again.');
          navigate('/login');
        } else {
          setError('Failed to fetch dashboard data.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Loading Dashboard...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!data) {
    return null;
  }

  const { profile, donations, requests } = data;
  
  // --- UPDATED STATS ---
  const pendingRequests = requests.filter(r => r.approval_status === 'Pending').length;
  const totalPledges = donations.length; // Changed from totalDonatedMl

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {profile.firstname}!</h2>
        <button onClick={handleLogout} className="btn btn-logout">Logout</button>
      </div>

      {/* --- STATS CARDS (Updated) --- */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>{totalPledges}</h3>
          <p>Total Pledges Made</p>
        </div>
        <div className="stat-card">
          <h3>{requests.length}</h3>
          <p>Total Requests Made</p>
        </div>
        <div className="stat-card">
          <h3>{pendingRequests}</h3>
          <p>Pending Requests</p>
        </div>
      </div>

      {/* --- MY REQUESTS SECTION (This was already correct) --- */}
      <div className="dashboard-section">
        <h3>My Blood Requests</h3>
        {requests.length > 0 ? (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Blood Type</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={index}>
                  <td>{req.bloodtype}</td>
                  <td>{req.reason}</td>
                  <td>
                    <span className={`status-badge status-${req.approval_status?.toLowerCase() || 'pending'}`}>
                      {req.approval_status || 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>You have not made any blood requests.</p>
        )}
      </div>

      {/* --- MY DONATIONS SECTION (Updated Table) --- */}
      <div className="dashboard-section">
        <h3>My Donation Pledges</h3>
        {donations.length > 0 ? (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Blood Type</th>
                <th>Phone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((don, index) => (
                <tr key={index}>
                  <td>{don.firstname} {don.lastname}</td>
                  <td>{don.bloodtype}</td>
                  <td>{don.phone}</td>
                  <td>
                    <span className="status-badge status-pending">
                      Pledged
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>You have not pledged to donate yet.</p>
        )}
      </div>

      {/* --- MY PROFILE SECTION (This was already correct) --- */}
      <div className="dashboard-section">
        <h3>My Profile</h3>
        <div className="profile-card">
          <p><strong>Name:</strong> {profile.firstname} {profile.lastname}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Health Card:</strong> {profile.healthcard || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;