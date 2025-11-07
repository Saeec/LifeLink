import React, { useState, useEffect } from 'react';
// --- 1. IMPORT Link ---
import { useNavigate, Link } from 'react-router-dom';
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
  
  const pendingRequests = requests.filter(r => r.approval_status === 'Pending').length;
  const totalDonatedMl = donations.reduce((acc, curr) => acc + curr.quantity_ml, 0);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {profile.firstname}!</h2>
        <button onClick={handleLogout} className="btn btn-logout">Logout</button>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>{donations.length}</h3>
          <p>Total Donations Made</p>
        </div>
        <div className="stat-card">
          <h3>{totalDonatedMl} ml</h3>
          <p>Total Blood Donated</p>
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

      {/* --- MY REQUESTS SECTION (Updated Table) --- */}
      <div className="dashboard-section">
        <h3>My Blood Requests</h3>
        {requests.length > 0 ? (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Blood Type</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Approved By</th>
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
                  <td>
                    {req.approval_status === 'Approved' ? (
                      <>
                        <strong>{req.hospital_name}</strong>
                        <br />
                        <small>{req.contact_number}</small>
                      </>
                    ) : (
                      'N/A'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>You have not made any blood requests.</p>
        )}
      </div>

      {/* --- MY DONATION HISTORY SECTION --- */}
      <div className="dashboard-section">
        <h3>My Donation History</h3>
        {donations.length > 0 ? (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Hospital</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((don, index) => (
                <tr key={index}>
                  <td>{new Date(don.date_of_donation).toLocaleDateString()}</td>
                  <td>{don.hospital_name}</td>
                  <td>{don.quantity_ml} ml</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>You have no completed donations in your history.</p>
        )}
      </div>

      {/* --- MY PROFILE SECTION --- */}
      <div className="dashboard-section">
        {/* --- 2. ADD THIS 'section-header' DIV --- */}
        <div className="section-header">
          <h3>My Profile</h3>
          {/* --- 3. ADD THIS LINK/BUTTON --- */}
          <Link to="/profile-settings" className="btn-action manage">Edit Profile</Link>
        </div>
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