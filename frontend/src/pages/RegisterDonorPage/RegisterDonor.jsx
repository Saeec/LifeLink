import React, { useState } from 'react';
import './RegisterDonor.css';

const RegisterDonorPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    bloodType: '',
    address: '',
    city: '',
    pincode: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!formData.agreedToTerms) {
      alert("You must agree to the terms and conditions.");
      return;
    }
    // On successful validation, you would typically send this data to your backend API
    console.log('Form Submitted:', formData);
    alert('Registration successful!');
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Left Panel: Branding and Welcome Message */}
        <div className="branding-panel">
          <div className="branding-content">
            <h1>Join LifeLink</h1>
            <p>Your decision to donate can save a life. Become a part of our community of heroes today.</p>
          </div>
        </div>

        {/* Right Panel: Registration Form */}
        <div className="form-panel">
          <form className="register-form" onSubmit={handleSubmit}>
            <h2>Create Donor Account</h2>
            
            <div className="form-row">
              {/* Form fields are based on User and Donor entities  */}
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="bloodType">Blood Type</label>
                <select id="bloodType" name="bloodType" value={formData.bloodType} onChange={handleChange} required>
                  <option value="">Select Blood Type</option>
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
            </div>
            
            {/* Geolocation is essential for matching donors with nearby hospitals  */}
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" placeholder="Street and Area" value={formData.address} onChange={handleChange} required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <input type="text" id="pincode" name="pincode" pattern="\d{6}" title="Pincode must be 6 digits" value={formData.pincode} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" minLength="8" value={formData.password} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
              </div>
            </div>
            
            <div className="form-group-checkbox">
              <input type="checkbox" id="agreedToTerms" name="agreedToTerms" checked={formData.agreedToTerms} onChange={handleChange} required />
              <label htmlFor="agreedToTerms">I certify that I meet the donor eligibility criteria and agree to the <a href="/terms">Terms and Conditions</a>.</label>
            </div>

            <button type="submit" className="btn-register">Register Now</button>
            
            <p className="login-link">
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterDonorPage;