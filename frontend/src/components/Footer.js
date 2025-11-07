import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Import the new styles

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        <div className="footer-section about">
          <h4>🩸 About LifeLink</h4>
          <p>
            LifeLink is a dedicated platform connecting blood donors with patients and hospitals in need. Our mission is to ensure a safe, reliable, and efficient blood supply for everyone.
          </p>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About & FAQ</Link></li>
            <li><Link to="/hospitals">Find Hospitals</Link></li>
            <li><Link to="/login">User Login</Link></li>
            <li><Link to="/register-hospital">Hospital Portal</Link></li>
          </ul>
        </div>

        <div className="footer-section actions">
          <h4>Get Involved</h4>
          <ul>
            <li><Link to="/donate">Register as a Donor</Link></li>
            <li><Link to="/request">Request Emergency Blood</Link></li>
            <li><Link to="/register-hospital">Partner Your Hospital</Link></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <div className="contact-info">
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Email:</strong> support@lifelink.org</p>
            <p><strong>Address:</strong> 123 Health St, Pune, Maharashtra</p>
          </div>
        </div>

      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} LifeLink. All rights reserved. | <Link to="/about">Privacy Policy</Link></p>
      </div>
    </footer>
  );
};

export default Footer;