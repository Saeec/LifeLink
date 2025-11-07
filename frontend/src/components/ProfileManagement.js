import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';

const ProfileManagement = () => {
  const [profile, setProfile] = useState({ firstname: '', lastname: '', phone: '' });
  const [password, setPassword] = useState({ oldPassword: '', newPassword: '', confirmNew: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // We need to get the user's current profile data to pre-fill the form
  useEffect(() => {
    const getProfileData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        // We re-use the dashboard endpoint to get profile info
        const res = await apiService.getDashboardData(token);
        const { firstname, lastname, phone } = res.data.profile;
        setProfile({ firstname, lastname, phone });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profile data.');
        setLoading(false);
      }
    };
    getProfileData();
  }, [navigate]);

  const onProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const onPasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      await apiService.updateUserProfile(token, profile);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to update profile.');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password.newPassword !== password.confirmNew) {
      setError('New passwords do not match.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await apiService.changePassword(token, {
        oldPassword: password.oldPassword,
        newPassword: password.newPassword,
      });
      setSuccess('Password changed successfully!');
      // Clear password fields
      setPassword({ oldPassword: '', newPassword: '', confirmNew: '' });
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to change password.');
    }
  };

  if (loading) {
    return <div className="loading">Loading Profile...</div>;
  }

  return (
    <div className="info-page-container">
      {/* --- Update Profile Form --- */}
      <div className="form-container" style={{ maxWidth: '600px', margin: 'auto' }}>
        <h2>Update Profile</h2>
        {error && <p className="error" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        {success && <p className="success" style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
        <form onSubmit={handleProfileSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstname"
              value={profile.firstname}
              onChange={onProfileChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastname"
              value={profile.lastname}
              onChange={onProfileChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={onProfileChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Update Profile</button>
        </form>
      </div>

      {/* --- Change Password Form --- */}
      <div className="form-container" style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <h2>Change Password</h2>
        <form onSubmit={handlePasswordSubmit}>
          <div className="form-group">
            <label>Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={password.oldPassword}
              onChange={onPasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={password.newPassword}
              onChange={onPasswordChange}
              minLength="6"
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmNew"
              value={password.confirmNew}
              onChange={onPasswordChange}
              minLength="6"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileManagement;