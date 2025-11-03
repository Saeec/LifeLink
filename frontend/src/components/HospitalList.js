import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService'; // Import the service

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an async function to fetch data
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use the apiService to make the call
        const response = await apiService.getHospitals();
        
        setHospitals(response.data); // Set data on success
      } catch (err) {
        console.error("Error fetching hospitals:", err);
        setError('Failed to fetch hospital data. Please try again later.');
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };

    fetchHospitals(); // Call the function
  }, []); // Empty dependency array means this runs once on component mount

  // --- Render Logic ---
  if (loading) {
    return <div className="loading">Loading hospitals...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h2>Available Hospitals</h2>
      <table className="hospital-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>State</th>
            <th>Contact</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital) => (
            <tr key={hospital.hospital_id}>
              <td>{hospital.hospital_name}</td>
              <td>{hospital.city}</td>
              <td>{hospital.state}</td>
              <td>{hospital.contact_number}</td>
              <td>{hospital.capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HospitalList;