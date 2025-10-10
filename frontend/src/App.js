import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import global styles
import './App.css';

// Import the page components you want to route to
import LandingPage from './pages/LandingPage/LandingPage';
import RegisterDonorPage from './pages/RegisterDonorPage/RegisterDonor';
// You will import other pages like LoginPage here as you create them

function App() {
  return (
    // The Router component provides the routing context for your app.
    <Router>
      <div className="App">
        {/*
          The <Routes> component is a container for all your individual routes.
          It will render the component of the first <Route> that matches the current URL.
        */}
        <Routes>
          {/* Route for the homepage (http://.../) */}
          <Route path="/" element={<LandingPage />} />

          {/* Route for the donor registration page (http://.../register-donor) */}
          <Route path="/register-donor" element={<RegisterDonorPage />} />

          {/* ADD MORE ROUTES FOR OTHER PAGES HERE AS YOU BUILD THEM */}
          {/* Example: <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;