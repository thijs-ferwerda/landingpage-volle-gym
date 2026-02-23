import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Intake from './pages/Intake/Intake';
import IntakeQualified from './pages/IntakeQualified/IntakeQualified';
import Sorry from './pages/Sorry/Sorry';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService/TermsOfService';
import Footer from './components/Footer';
import { SpeedInsights } from "@vercel/speed-insights/react";

// Use a smooth scrolling setup for lenis-like feel or just native CSS scroll.
// Global noise overlay is handled in index.css

const ScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [hash]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToHash />
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
