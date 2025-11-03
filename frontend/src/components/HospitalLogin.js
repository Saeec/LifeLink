import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiService from '../services/apiService';

const HospitalLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await apiService.loginHospital({ email, password });
      
      // Save the token
      localStorage.setItem('token', response.data.token);

      alert('Hospital logged in successfully!');
      navigate('/hospital/admin'); // Go to the hospital admin page
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Hospital Login</h2>
      <form onSubmit={onSubmit}>
        {/* --- THESE WERE THE MISSING LINES --- */}
        <div className="form-group">
          <label>Hospital Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        {/* ---------------------------------- */}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      {error && <p className="error" style={{color: 'red'}}>{error}</p>}
      <p>
        Need to register your hospital? <Link to="/register-hospital">Register Here</Link>
      </p>
    </div>
  );
};

export default HospitalLogin;