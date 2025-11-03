import React, { useState } from 'react';
import apiService from '../services/apiService';
import './AddStockModal.css'; // We will create this file next

const AddStockModal = ({ currentStock, hospitalCapacity, onClose, onStockAdded }) => {
  const [bloodType, setBloodType] = useState('A+');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');

  // Calculate current total stock
  const currentTotalStock = currentStock.reduce((acc, item) => acc + item.quantity_ml, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      await apiService.updateStock(token, {
        blood_type: bloodType,
        quantity_ml: quantity,
      });
      onStockAdded(); // This will refresh the dashboard
      onClose(); // Close the modal
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to add stock');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button onClick={onClose} className="btn-close">&times;</button>
        <h2>Manage Blood Stock</h2>
        <div className="stock-info">
          <p>Current Total Stock: <strong>{currentTotalStock} ml</strong></p>
          <p>Hospital Capacity: <strong>{hospitalCapacity} ml</strong></p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Blood Type</label>
            <select value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="form-group">
            <label>Set New Quantity (in ml)</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g., 1500"
              required
            />
          </div>
          {error && <p className="error" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <button type="submit" className="btn btn-primary">Update Stock</button>
        </form>
      </div>
    </div>
  );
};

export default AddStockModal;