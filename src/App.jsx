import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Intake from './pages/Intake/Intake';
import IntakeQualified from './pages/IntakeQualified/IntakeQualified';
import Sorry from './pages/Sorry/Sorry';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService/TermsOfService';
import Footer from './components/Footer';
import NotFound from './pages/NotFound/NotFound';
import ThankYou from './pages/ThankYou/ThankYou';
import Results from './pages/Results/Results';
import OnboardingTemplate from './pages/Onboarding/OnboardingTemplate';
import Solliciteren from './pages/Solliciteren/Solliciteren';
import VacanciesOverview from './pages/VacanciesOverview/VacanciesOverview';
import VacanciesOverviewHQ from './pages/VacanciesOverviewHQ/VacanciesOverviewHQ';
import WerkenBij from './pages/WerkenBij/WerkenBij';
import VoorJeSolliciteertHQ from './pages/VoorJeSolliciteertHQ/VoorJeSolliciteertHQ';
import SolliciterenHQ from './pages/SolliciterenHQ/SolliciterenHQ';
import IntakeNative from './pages/IntakeNative/IntakeNative';
import Bedankvideo from './pages/Bedankvideo/Bedankvideo';
import MinimalLayout from './components/MinimalLayout';
import CookieConsent from './components/CookieConsent';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { captureUTMs } from './utils/tracking';

// Lazy-load pages that use react-markdown (keeps vendor-markdown chunk off homepage)
const SeoPageTemplate = lazy(() => import('./pages/SeoPageTemplate'));
const Kennisbank = lazy(() => import('./pages/Kennisbank/Kennisbank'));
const VacancyTemplate = lazy(() => import('./pages/VacancyTemplate/VacancyTemplate'));
const VacancyPage = lazy(() => import('./pages/VacancyTemplate/VacancyPage'));

// Use a smooth scrolling setup for lenis-like feel or just native CSS scroll.
// Global noise overlay is handled in index.css

const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  // Capture UTM parameters on every page load/navigation
  useEffect(() => {
    captureUTMs();
  }, [pathname]);

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
        {/* Meta Ads Landingspagina Routes (Pijler 1: Groeisysteem) */}
        <Route path="/groeisysteem" element={<><Navbar /><Home campaign="meta-groeisysteem-a" /><Footer /></>} />
        <Route path="/voorspelbare-leden" element={<><Navbar /><Home campaign="meta-groeisysteem-b" /><Footer /></>} />
        <Route path="/acquisitiesysteem" element={<><Navbar /><Home campaign="meta-groeisysteem-c" /><Footer /></>} />
        {/* Meta Ads Landingspagina Routes (Pijler 2: Community) */}
        <Route path="/community" element={<><Navbar /><Home campaign="meta-community-a" /><Footer /></>} />
        <Route path="/samen-groeien" element={<><Navbar /><Home campaign="meta-community-b" /><Footer /></>} />
        <Route path="/gymnetwerk" element={<><Navbar /><Home campaign="meta-community-c" /><Footer /></>} />
        {/* Meta Ads Landingspagina Routes (Pijler 3: Accountability) */}
        <Route path="/monitoring" element={<><Navbar /><Home campaign="meta-accountability-a" /><Footer /></>} />
        <Route path="/groeistructuur" element={<><Navbar /><Home campaign="meta-accountability-b" /><Footer /></>} />
        <Route path="/wekelijks-ritme" element={<><Navbar /><Home campaign="meta-accountability-c" /><Footer /></>} />

        {/* Resultaten Pagina */}
        <Route path="/resultaten" element={<><Navbar /><Results /><Footer /></>} />

        {/* Vacature Template Pagina */}
        <Route path="/werken-bij" element={<><Navbar /><WerkenBij /><Footer /></>} />
        <Route path="/werken-bij/hq" element={<><Navbar /><VacanciesOverviewHQ /><Footer /></>} />
        <Route path="/vacatures" element={<><Navbar /><VacanciesOverview /><Footer /></>} />
        <Route path="/vacature-template" element={<><Navbar /><Suspense fallback={null}><VacancyTemplate /></Suspense><Footer /></>} />
        <Route path="/vacatures/:slug" element={<><Navbar /><Suspense fallback={null}><VacancyPage /></Suspense><Footer /></>} />
        <Route path="/voordat-je-solliciteert-hq" element={<><Navbar /><VoorJeSolliciteertHQ /><Footer /></>} />

        {/* Dynamische SEO Pagina's Route */}
        <Route path="/kennisbank" element={<><Navbar /><Suspense fallback={null}><Kennisbank /></Suspense><Footer /></>} />
        <Route path="/kennisbank/:slug" element={<><Navbar /><Suspense fallback={null}><SeoPageTemplate expectedType="blog" /></Suspense><Footer /></>} />
        <Route path="/:slug" element={<><Navbar /><Suspense fallback={null}><SeoPageTemplate expectedType="service" /></Suspense><Footer /></>} />

        {/* Minimal Routes */}
        <Route path="/solliciteren" element={<MinimalLayout><Solliciteren /></MinimalLayout>} />
        <Route path="/solliciteren-hq" element={<MinimalLayout><SolliciterenHQ /></MinimalLayout>} />
        <Route path="/intake/gekwalificeerd" element={<MinimalLayout><IntakeQualified /></MinimalLayout>} />
        <Route path="/verdiepingsgesprek" element={<MinimalLayout><IntakeQualified /></MinimalLayout>} />
        <Route path="/onboarding" element={<MinimalLayout><OnboardingTemplate packageName="het traject" /></MinimalLayout>} />
        <Route path="/onboarding/30-leden" element={<MinimalLayout><OnboardingTemplate packageName="30 leden in 90 dagen" /></MinimalLayout>} />
        <Route path="/onboarding/45-leden" element={<MinimalLayout><OnboardingTemplate packageName="45 leden in 90 dagen" /></MinimalLayout>} />
        <Route path="/bedankt" element={<MinimalLayout><ThankYou /></MinimalLayout>} />
        <Route path="/bedankvideo" element={<><Navbar /><Bedankvideo /><Footer /></>} />

        <Route path="/aanmelding" element={<MinimalLayout><IntakeNative /></MinimalLayout>} />
        <Route path="/intake" element={<MinimalLayout><IntakeNative /></MinimalLayout>} />
        <Route path="/sorry" element={<><Navbar /><Sorry /><Footer /></>} />
        <Route path="/privacy" element={<><Navbar /><PrivacyPolicy /><Footer /></>} />
        <Route path="/voorwaarden" element={<><Navbar /><TermsOfService /><Footer /></>} />

        {/* Catch-all 404 */}
        <Route path="*" element={<><Navbar /><NotFound /><Footer /></>} />
      </Routes>
      <CookieConsent />
      <SpeedInsights />
      <Analytics />
    </Router>
  );
}

export default App;
