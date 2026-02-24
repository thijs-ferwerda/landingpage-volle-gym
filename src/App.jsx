import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Intake from './pages/Intake/Intake';
import IntakeQualified from './pages/IntakeQualified/IntakeQualified';
import Sorry from './pages/Sorry/Sorry';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService/TermsOfService';
import SeoPageTemplate from './pages/SeoPageTemplate';
import Footer from './components/Footer';
import { SpeedInsights } from "@vercel/speed-insights/react";

// Use a smooth scrolling setup for lenis-like feel or just native CSS scroll.
// Global noise overlay is handled in index.css

const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Instant feels better for route changes
      });
    }
  }, [pathname, hash]);

  // Handle hash links
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
        {/* Dynamische SEO Pagina's Route */}
        <Route path="/:slug" element={<SeoPageTemplate />} />
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
