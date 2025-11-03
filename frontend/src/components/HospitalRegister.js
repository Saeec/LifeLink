import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiService from '../services/apiService';

const HospitalRegister = () => {
  const [formData, setFormData] = useState({
    hospital_name: '',
    address: '',
    city: '',
    state: '',
    contact_number: '',
    email: '',
    password: '',
    password2: '',
    capacity: 0,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { hospital_name, address, city, state, contact_number, email, password, password2, capacity } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await apiService.registerHospital({
        hospital_name, address, city, state, contact_number, email, password, capacity
      });
      console.log(response.data); // TODO: Save token
      alert('Hospital registration successful!');
      navigate('/hospital/admin'); // TODO: Create admin page
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Register Your Hospital</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Hospital Name</label>
          <input type="text" name="hospital_name" value={hospital_name} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" name="address" value={address} onChange={onChange} />
        </div>
        <div className="form-group">
          <label>City</label>
          <input type="text" name="city" value={city} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>State</label>
          <input type="text" name="state" value={state} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input type="text" name="contact_number" value={contact_number} onChange={onChange} />
        </div>
        <div className="form-group">
          <label>Capacity</label>
          <input type="number" name="capacity" value={capacity} onChange={onChange} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={onChange} minLength="6" required />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" name="password2" value={password2} onChange={onChange} minLength="6" required />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        Already registered? <Link to="/login-hospital">Login Here</Link>
      </p>
    </div>
  );
};

export default HospitalRegister;