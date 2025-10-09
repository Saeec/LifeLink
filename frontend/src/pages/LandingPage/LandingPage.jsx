import React from 'react';
import './LandingPage.css'; // Make sure to add styles for the new header in this file

// TODO: Place your actual icons in the assets folder and update the import paths
// import featureIcon1 from '../assets/images/icon-find-donor.svg';
// import featureIcon2 from '../assets-images/icon-hospital-request.svg';
// import featureIcon3 from '../assets/images/icon-community-drive.svg';

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* --- New Header Section --- */}
      <nav className="main-nav">
        <div className="nav-content">
          <div className="logo">
            <span className="logo-heart" role="img" aria-label="heart">♥</span>
            <span className="logo-text">Lifelink</span>
          </div>
          <ul className="nav-links">
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="nav-buttons">
            <button className="btn btn-nav-login">Login</button>
            <button className="btn btn-primary">Register</button>
          </div>
        </div>
      </nav>

      {/* Hero Section: The first thing the user sees. It has a strong headline and primary actions. */}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Be a Lifeline. Donate Blood.</h1>
          <p className="hero-subtitle">
            Connecting donors with hospitals to save lives. Your single donation can make a world of difference.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Register as a Donor</button>
            <button className="btn btn-secondary">Request Blood (Hospitals)</button>
          </div>
        </div>
      </header>

      {/* Features Section: Explains the core functionalities of the platform in a simple, digestible way. */}
      <section id="how-it-works" className="features-section">
        <h2 className="section-title">How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            {/* <img src={featureIcon1} alt="Find a Donor Icon" className="feature-icon" /> */}
            <h3 className="feature-title">Find Donors Instantly</h3>
            <p className="feature-description">
              Our Automated Matching Engine connects hospitals with eligible, nearby donors in seconds, based on blood type and location.
            </p>
          </div>
          <div className="feature-card">
            {/* <img src={featureIcon2} alt="Hospital Request Icon" className="feature-icon" /> */}
            <h3 className="feature-title">Urgent Requests Made Easy</h3>
            <p className="feature-description">
              Verified hospitals can raise time-sensitive blood requests, ensuring critical needs are met without delay.
            </p>
          </div>
          <div className="feature-card">
            {/* <img src={featureIcon3} alt="Community Drive Icon" className="feature-icon" /> */}
            <h3 className="feature-title">Join a Community</h3>
            <p className="feature-description">
              Stay updated on local blood donation drives and events. Earn badges and become a vital part of a life-saving community.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section: A final, compelling message to encourage user registration. */}
      <section className="cta-section">
         <div className="cta-content">
            <h2 className="section-title cta-title">Ready to Make an Impact?</h2>
            <p className="cta-text">
              Every two seconds, someone in the world needs blood. Register today and become a hero in someone's story.
            </p>
            <button className="btn btn-primary btn-large">Join Lifeline Now</button>
         </div>
      </section>

      {/* Footer: Contains copyright information and closes the page. */}
      <footer className="footer">
        <p>&copy; 2025 Lifeline. All rights reserved. Saving lives together.</p>
      </footer>
    </div>
  );
};

export default LandingPage;