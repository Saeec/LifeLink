import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiService from '../services/apiService';

const UserLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await apiService.loginUser({ email, password });
      
      // --- THIS IS THE CRITICAL UPDATE ---
      // Save the token from the response
      localStorage.setItem('token', response.data.token);
      // ---------------------------------

      alert('User logged in successfully!');
      navigate('/dashboard'); // Go to the new dashboard page
    } catch (err)
 {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="form-container">
      <h2>User Login</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      {error && <p className="error" style={{color: 'red'}}>{error}</p>}
      <p>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

export default UserLogin;