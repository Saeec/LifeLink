import React from 'react';

// Import the global stylesheet
import './App.css';

// Import the LandingPage component
import LandingPage from './pages/LandingPage/LandingPage.jsx';

function App() {
  return (
    <div className="App">
      {/* For now, we are only displaying the LandingPage */}
      <LandingPage />
    </div>
  );
}

export default App;