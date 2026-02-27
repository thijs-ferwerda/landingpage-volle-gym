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
import NotFound from './pages/NotFound/NotFound';
import Welcome from './pages/Welcome/Welcome';
import ThankYou from './pages/ThankYou/ThankYou';
import Results from './pages/Results/Results';
import OnboardingTemplate from './pages/Onboarding/OnboardingTemplate';
import MinimalLayout from './components/MinimalLayout';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

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

      <Routes>
        <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
        {/* Nieuwe Landingspagina Routes */}
        <Route path="/uitgeputte-trainer" element={<><Navbar /><Home campaign="uitgeputte-trainer" /><Footer /></>} />
        <Route path="/tweede-locatie" element={<><Navbar /><Home campaign="locatie-2" /><Footer /></>} />
        <Route path="/voorspelbare-groei" element={<><Navbar /><Home campaign="voorspelbaar" /><Footer /></>} />
        {/* Resultaten Pagina */}
        <Route path="/resultaten" element={<><Navbar /><Results /><Footer /></>} />

        {/* Dynamische SEO Pagina's Route */}
        <Route path="/kennisbank/:slug" element={<><Navbar /><SeoPageTemplate expectedType="blog" /><Footer /></>} />
        <Route path="/:slug" element={<><Navbar /><SeoPageTemplate expectedType="service" /><Footer /></>} />

        {/* Minimal Routes */}
        <Route path="/intake/gekwalificeerd" element={<MinimalLayout><IntakeQualified /></MinimalLayout>} />
        <Route path="/verdiepingsgesprek" element={<MinimalLayout><IntakeQualified /></MinimalLayout>} />
        <Route path="/onboarding" element={<MinimalLayout><OnboardingTemplate packageName="het traject" /></MinimalLayout>} />
        <Route path="/onboarding/30-leden" element={<MinimalLayout><OnboardingTemplate packageName="30 leden in 90 dagen" /></MinimalLayout>} />
        <Route path="/onboarding/45-leden" element={<MinimalLayout><OnboardingTemplate packageName="45 leden in 90 dagen" /></MinimalLayout>} />
        <Route path="/bedankt" element={<MinimalLayout><ThankYou /></MinimalLayout>} />
        <Route path="/welkom" element={<MinimalLayout><Welcome /></MinimalLayout>} />

        <Route path="/intake" element={<><Navbar /><Intake /><Footer /></>} />
        <Route path="/sorry" element={<><Navbar /><Sorry /><Footer /></>} />
        <Route path="/privacy" element={<><Navbar /><PrivacyPolicy /><Footer /></>} />
        <Route path="/voorwaarden" element={<><Navbar /><TermsOfService /><Footer /></>} />

        {/* Catch-all 404 */}
        <Route path="*" element={<><Navbar /><NotFound /><Footer /></>} />
      </Routes>
      <SpeedInsights />
      <Analytics />
    </Router>
  );
}

export default App;
