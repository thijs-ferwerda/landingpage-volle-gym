import { useState, useEffect } from 'react';
import { getConsent, setConsent, acceptAll, rejectAll, hasConsentChoice } from '../utils/consent';
import { Shield, ChevronDown, ChevronUp } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    if (!hasConsentChoice()) {
      // Small delay so the page renders first
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  function handleAcceptAll() {
    acceptAll();
    setVisible(false);
  }

  function handleRejectAll() {
    rejectAll();
    setVisible(false);
  }

  function handleSavePreferences() {
    setConsent(preferences);
    setVisible(false);
  }

  function toggleCategory(key) {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  }

  // Allow reopening from footer link
  useEffect(() => {
    function handleOpen() {
      const stored = getConsent();
      if (stored) {
        setPreferences({ analytics: stored.analytics, marketing: stored.marketing });
      }
      setShowDetails(true);
      setVisible(true);
    }
    window.__openCookieSettings = handleOpen;
    return () => { delete window.__openCookieSettings; };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10000] transition-opacity" />

      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[10001] p-4 md:p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-primary/10 overflow-hidden">

          {/* Header */}
          <div className="px-6 pt-6 pb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-heading font-bold text-lg text-primary">
                Cookie-instellingen
              </h3>
            </div>
            <p className="text-sm text-primary/60 leading-relaxed">
              We gebruiken cookies om onze website te verbeteren en om je relevante advertenties te tonen. Je kunt per categorie kiezen welke cookies je toestaat.
            </p>
          </div>

          {/* Detail toggle */}
          <div className="px-6">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-1.5 text-sm font-medium text-primary/50 hover:text-primary transition-colors cursor-pointer"
            >
              {showDetails ? 'Verberg details' : 'Toon details'}
              {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Category toggles */}
          {showDetails && (
            <div className="px-6 pt-4 pb-2 space-y-3">
              {/* Necessary — always on */}
              <CategoryRow
                label="Noodzakelijk"
                description="Essentieel voor het functioneren van de website."
                checked={true}
                disabled={true}
              />
              <CategoryRow
                label="Statistieken"
                description="Helpen ons begrijpen hoe bezoekers de website gebruiken."
                checked={preferences.analytics}
                onChange={() => toggleCategory('analytics')}
              />
              <CategoryRow
                label="Marketing"
                description="Worden gebruikt om relevante advertenties te tonen en campagnes te meten."
                checked={preferences.marketing}
                onChange={() => toggleCategory('marketing')}
              />
            </div>
          )}

          {/* Actions */}
          <div className="px-6 py-5 flex flex-col sm:flex-row gap-2.5">
            {showDetails ? (
              <>
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 bg-primary text-white text-sm font-semibold py-3 px-5 rounded-xl hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Voorkeuren opslaan
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 bg-accent text-white text-sm font-semibold py-3 px-5 rounded-xl hover:bg-accent/90 transition-colors cursor-pointer"
                >
                  Alles accepteren
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleRejectAll}
                  className="flex-1 bg-primary/5 text-primary text-sm font-semibold py-3 px-5 rounded-xl hover:bg-primary/10 transition-colors cursor-pointer"
                >
                  Alleen noodzakelijk
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 bg-accent text-white text-sm font-semibold py-3 px-5 rounded-xl hover:bg-accent/90 transition-colors cursor-pointer"
                >
                  Alles accepteren
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}


function CategoryRow({ label, description, checked, disabled, onChange }) {
  return (
    <label className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${checked ? 'border-accent/20 bg-accent/5' : 'border-primary/10 bg-primary/[0.02]'} ${disabled ? '' : 'cursor-pointer hover:border-primary/20'}`}>
      {/* Toggle */}
      <div className="pt-0.5">
        <div
          className={`relative w-10 h-6 rounded-full transition-colors ${checked ? 'bg-accent' : 'bg-primary/20'} ${disabled ? 'opacity-50' : ''}`}
          onClick={disabled ? undefined : onChange}
        >
          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? 'left-5' : 'left-1'}`} />
        </div>
      </div>
      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-primary">{label}</span>
          {disabled && (
            <span className="text-[10px] font-medium uppercase tracking-wider text-primary/40">Altijd aan</span>
          )}
        </div>
        <p className="text-xs text-primary/50 mt-0.5 leading-relaxed">{description}</p>
      </div>
    </label>
  );
}
