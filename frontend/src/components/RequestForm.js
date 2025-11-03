import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';

const RequestForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    age: '',
    healthcard: '',
    address: '',
    bloodtype: 'A+',
    gender: 'Male',
    phone: '',
    reason: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const { firstname, lastname, age, healthcard, address, bloodtype, gender, phone, reason } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await apiService.submitRequestForm(formData);
      setSuccess('Blood request submitted successfully. A hospital will contact you soon.');
      // Clear form
      setFormData({
        firstname: '', lastname: '', age: '', healthcard: '',
        address: '', bloodtype: 'A+', gender: 'Male', phone: '', reason: '',
      });
      // Optional: redirect after a few seconds
      // setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Submission failed. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Request Emergency Blood</h2>
      <p>Fill out the form below to request blood. This will be sent to nearby hospitals.</p>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Patient First Name *</label>
          <input type="text" name="firstname" value={firstname} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Patient Last Name *</label>
          <input type="text" name="lastname" value={lastname} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Patient Age *</label>
          <input type="number" name="age" value={age} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Required Blood Type *</label>
          <select name="bloodtype" value={bloodtype} onChange={onChange} required>
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
          <label>Patient Gender *</label>
          <select name="gender" value={gender} onChange={onChange} required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Contact Phone Number *</label>
          <input type="tel" name="phone" value={phone} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Reason for Request *</label>
          <textarea 
            name="reason" 
            value={reason} 
            onChange={onChange} 
            rows="4"
            placeholder="e.g., Scheduled surgery, accident, etc."
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" name="address" value={address} onChange={onChange} />
        </div>
        <div className="form-group">
          <label>Patient Health Card Number </label>
          <input type="text" name="healthcard" value={healthcard} onChange={onChange} required/>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit Blood Request</button>
      </form>
      {error && <p className="error" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {success && <p className="success" style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
    </div>
  );
};

export default RequestForm;