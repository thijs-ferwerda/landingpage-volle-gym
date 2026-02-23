import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Intake from './pages/Intake/Intake';
import IntakeQualified from './pages/IntakeQualified/IntakeQualified';
import Sorry from './pages/Sorry/Sorry';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService/TermsOfService';
import Footer from './components/Footer';

// Use a smooth scrolling setup for lenis-like feel or just native CSS scroll.
// Global noise overlay is handled in index.css

function App() {
  return (
    <Router>
      <div className="noise-overlay"></div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intake/gekwalificeerd" element={<IntakeQualified />} />
        <Route path="/intake" element={<Intake />} />
        <Route path="/sorry" element={<Sorry />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/voorwaarden" element={<TermsOfService />} />
      </Routes>
      <Footer />
      <SpeedInsights />
    </Router>
  );
}

export default App;
