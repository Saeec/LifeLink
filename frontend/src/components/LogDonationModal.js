import React, { useState } from 'react';
import apiService from '../services/apiService';
import './AddStockModal.css'; // We re-use the same modal CSS

const LogDonationModal = ({ donor, onClose, onDonationLogged }) => {
  const [formData, setFormData] = useState({
    quantity_ml: '500', // Default
    dateOfDonation: new Date().toISOString().split('T')[0], // Default to today
  });
  const [error, setError] = useState('');

  const { quantity_ml, dateOfDonation } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      await apiService.logDonation(token, {
        donorHealthcard: donor.healthcard,
        bloodType: donor.bloodtype,
        quantity_ml,
        dateOfDonation,
      });
      alert('Donation logged successfully!');
      onDonationLogged(); // This will refresh the dashboard
      onClose(); // Close the modal
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to log donation');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button onClick={onClose} className="btn-close">&times;</button>
        <h2>Log Donation for {donor.firstname}</h2>
        <div className="stock-info">
          <p>Donor Healthcard: <strong>{donor.healthcard}</strong></p>
          <p>Blood Type: <strong>{donor.bloodtype}</strong></p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date of Donation</label>
            <input
              type="date"
              name="dateOfDonation"
              value={dateOfDonation}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Quantity (in ml)</label>
            <input
              type="number"
              name="quantity_ml"
              value={quantity_ml}
              onChange={onChange}
              placeholder="e.g., 500"
              required
            />
          </div>
          {error && <p className="error" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <button type="submit" className="btn btn-primary">Log Completed Donation</button>
        </form>
      </div>
    </div>
  );
};

export default LogDonationModal;