import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import AddStockModal from './AddStockModal'; // Import the stock modal

// --- 1. IMPORT THE NEW DONATION MODAL ---
import LogDonationModal from './LogDonationModal';

const HospitalAdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showStockModal, setShowStockModal] = useState(false);

  // --- 2. ADD NEW STATE FOR DONATION MODAL ---
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);

  const navigate = useNavigate();

  // Use useCallback to create a stable function for useEffect
  const fetchData = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login-hospital');
      return;
    }
    try {
      setLoading(true); // Show loading spinner on refresh
      const response = await apiService.getHospitalDashboardData(token);
      setData(response.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
        setError('Session expired. Please log in again.');
        navigate('/login-hospital');
      } else {
        setError('Failed to fetch dashboard data.');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login-hospital');
  };

  // --- Button Handlers ---
  const handleClaim = async (healthcard) => {
    try {
      const token = localStorage.getItem('token');
      await apiService.claimRequest(token, healthcard);
      alert('Request Claimed!');
      fetchData(); // Refresh all data
    } catch (err) {
      alert(err.response?.data?.msg || 'Failed to claim request');
    }
  };

  const handleUpdateStatus = async (requestId, status) => {
    try {
      const token = localStorage.getItem('token');
      await apiService.updateRequestStatus(token, requestId, status);
      alert(`Request ${status}!`);
      fetchData(); // Refresh all data
    } catch (err) {
      alert(err.response?.data?.msg || 'Failed to update status');
    }
  };

  // --- 3. ADD A HANDLER FOR THE DONATION BUTTON ---
  const handleAcceptDonationClick = (donor) => {
    setSelectedDonor(donor);
    setShowDonationModal(true);
  };

  // --- Render ---
  if (loading) {
    return <div className="loading">Loading Hospital Dashboard...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!data) {
    return null;
  }

  const { profile, inventory, assignedRequests, unassignedRequests, donorPledges } = data;

  return (
    <> {/* Use Fragment to allow modal to be a sibling */}
      {showStockModal && (
        <AddStockModal
          currentStock={inventory}
          hospitalCapacity={profile.capacity}
          onClose={() => setShowStockModal(false)}
          onStockAdded={fetchData} // Refresh data on success
        />
      )}

      {/* --- 4. RENDER THE NEW MODAL --- */}
      {showDonationModal && selectedDonor && (
        <LogDonationModal
          donor={selectedDonor}
          onClose={() => setShowDonationModal(false)}
          onDonationLogged={fetchData}
        />
      )}

      <div className="dashboard-container hospital-admin">
        <div className="dashboard-header">
          <h2>{profile.hospital_name} - Admin Panel</h2>
          <button onClick={handleLogout} className="btn btn-logout">Logout</button>
        </div>

        {/* --- STATS CARDS --- */}
        <div className="stats-container">
          <div className="stat-card">
            <h3>{assignedRequests.length}</h3>
            <p>Your Pending Requests</p>
          </div>
          <div className="stat-card">
            <h3>{unassignedRequests.length}</h3>
            <p>Public Requests Pool</p>
          </div>
          <div className="stat-card">
            <h3>{donorPledges.length}</h3>
            <p>Public Donor Pledges</p>
          </div>
        </div>

        {/* --- CURRENT INVENTORY SECTION --- */}
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Current Blood Inventory</h3>
            <button onClick={() => setShowStockModal(true)} className="btn-action manage">Manage Stock</button>
          </div>
          {inventory.length > 0 ? (
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Blood Type</th>
                  <th>Quantity (ml)</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.blood_type}>
                    <td>{item.blood_type}</td>
                    <td>{item.quantity_ml}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No inventory data. Please add stock.</p>
          )}
        </div>

        {/* --- ASSIGNED (YOUR) PENDING REQUESTS --- */}
        <div className="dashboard-section">
          <h3>Your Claimed Requests</h3>
          {assignedRequests.length > 0 ? (
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Blood Type</th>
                  <th>Reason</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignedRequests.map((req) => (
                  <tr key={req.hospital_request_id}>
                    <td>{req.firstname} {req.lastname}</td>
                    <td>{req.bloodtype}</td>
                    <td>{req.reason}</td>
                    <td>
                      <button onClick={() => handleUpdateStatus(req.hospital_request_id, 'Approved')} className="btn-action approve">Approve</button>
                      <button onClick={() => handleUpdateStatus(req.hospital_request_id, 'Rejected')} className="btn-action reject">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>You have not claimed any pending requests.</p>
          )}
        </div>

        {/* --- UNASSIGNED PUBLIC REQUESTS --- */}
        <div className="dashboard-section">
          <h3>Public Request Pool (Unclaimed)</h3>
          {unassignedRequests.length > 0 ? (
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Blood Type</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {unassignedRequests.map((req) => (
                  <tr key={req.healthcard}>
                    <td>{req.firstname} {req.lastname}</td>
                    <td>{req.bloodtype}</td>
                    <td>{req.phone}</td>
                    <td>
                      <button onClick={() => handleClaim(req.healthcard)} className="btn-action manage">Claim</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No public requests available.</p>
          )}
        </div>
        
        {/* --- UNASSIGNED DONOR PLEDGES --- */}
        <div className="dashboard-section">
          <h3>Public Donor Pledges</h3>
          {donorPledges.length > 0 ? (
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Donor</th>
                  <th>Blood Type</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {donorPledges.map((don) => (
                  <tr key={don.healthcard}>
                    <td>{don.firstname} {don.lastname}</td>
                    <td>{don.bloodtype}</td>
                    <td>{don.phone}</td>
                    <td>
                      {/* --- 5. UPDATE THIS BUTTON --- */}
                      <button 
                        onClick={() => handleAcceptDonationClick(don)} 
                        className="btn-action approve"
                      >
                        Accept & Log Donation
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No public donor pledges available.</p>
          )}
        </div>

      </div>
    </>
  );
};

export default HospitalAdminDashboard;