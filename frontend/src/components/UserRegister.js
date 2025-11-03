import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiService from '../services/apiService';

const UserRegister = () => {
  // --- UPDATED: Add new fields to state ---
  const [formData, setFormData] = useState({ 
    firstname: '', 
    lastname: '', 
    phone: '', 
    healthcard: '', 
    email: '', 
    password: '', 
    password2: '' 
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { firstname, lastname, phone, healthcard, email, password, password2 } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }
    try {
      // --- UPDATED: Send all fields to the API ---
      const response = await apiService.registerUser({ firstname, lastname, phone, healthcard, email, password });
      
      // Save token to local storage and log in
      localStorage.setItem('token', response.data.token);
      alert('Registration successful!');
      navigate('/dashboard'); // Go directly to dashboard
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="form-container">
      <h2>User Registration</h2>
      <form onSubmit={onSubmit}>
        {/* --- ADD NEW FIELDS TO FORM --- */}
        <div className="form-group">
          <label>First Name *</label>
          <input type="text" name="firstname" value={firstname} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Last Name *</label>
          <input type="text" name="lastname" value={lastname} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Phone *</label>
          <input type="tel" name="phone" value={phone} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Health Card Number </label>
          <input type="number" name="healthcard" value={healthcard} onChange={onChange} required/>
        </div>
        <hr />
        {/* --- Existing fields --- */}
        <div className="form-group">
          <label>Email *</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Password * (Min 6 chars)</label>
          <input type="password" name="password" value={password} onChange={onChange} minLength="6" required />
        </div>
        <div className="form-group">
          <label>Confirm Password *</label>
          <input type="password" name="password2" value={password2} onChange={onChange} minLength="6" required />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      {error && <p className="error" style={{color: 'red'}}>{error}</p>}
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default UserRegister;