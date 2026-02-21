import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Intake from './components/Intake';
import IntakeQualified from './components/IntakeQualified';
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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
