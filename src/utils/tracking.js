/**
 * Intake Form Tracking Utilities
 * Handles UTM capture, A/B variant assignment, and event tracking.
 */

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid', 'gbraid', 'wbraid'];

/** Capture UTM parameters + landing context from the current URL and persist in sessionStorage */
export const captureUTMs = () => {
  const params = new URLSearchParams(window.location.search);
  const utms = {};

  UTM_KEYS.forEach(key => {
    const val = params.get(key);
    if (val) utms[key] = val;
  });

  if (Object.keys(utms).length > 0) {
    sessionStorage.setItem('vg_utms', JSON.stringify(utms));
  }

  // Store landing page URL + referrer + cookies on first visit only
  if (!sessionStorage.getItem('vg_landing')) {
    const cookies = document.cookie.split(';').reduce((acc, c) => {
      const [k, ...v] = c.trim().split('=');
      acc[k] = v.join('=');
      return acc;
    }, {});
    // Extract GA session ID from _ga_* cookie
    const gaSessionCookie = Object.entries(cookies).find(([k]) => k.startsWith('_ga_') && !k.startsWith('_gac_'));
    const gaSessionId = gaSessionCookie ? gaSessionCookie[1].split('.')[2] : '';

    sessionStorage.setItem('vg_landing', JSON.stringify({
      landingUrl: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      fbc: cookies._fbc || '',
      fbp: cookies._fbp || '',
      gaClientId: cookies._ga ? cookies._ga.split('.').slice(2).join('.') : '',
      gaSessionId,
    }));
  }

  return JSON.parse(sessionStorage.getItem('vg_utms') || '{}');
};

export const getUTMs = () => JSON.parse(sessionStorage.getItem('vg_utms') || '{}');

export const getLandingContext = () => JSON.parse(sessionStorage.getItem('vg_landing') || '{}');

/** Assign an A/B test variant using weighted random selection, persisted in localStorage */
export const assignVariant = (variants) => {
  const stored = localStorage.getItem('vg_intake_variant');
  if (stored && variants[stored]) return stored;

  const entries = Object.entries(variants);
  const totalWeight = entries.reduce((sum, [, v]) => sum + (v.weight || 1), 0);
  let random = Math.random() * totalWeight;

  for (const [key, variant] of entries) {
    random -= (variant.weight || 1);
    if (random <= 0) {
      localStorage.setItem('vg_intake_variant', key);
      return key;
    }
  }

  const fallback = entries[0][0];
  localStorage.setItem('vg_intake_variant', fallback);
  return fallback;
};

/** Reset variant assignment (useful for testing) */
export const resetVariant = () => {
  localStorage.removeItem('vg_intake_variant');
  sessionStorage.removeItem('vg_intake_session');
};

/** Get or create a unique session ID for this form visit */
export const getSessionId = () => {
  let id = sessionStorage.getItem('vg_intake_session');
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem('vg_intake_session', id);
  }
  return id;
};

/** Track an event to GTM dataLayer + our API endpoint */
export const trackEvent = (eventName, data = {}) => {
  const utms = getUTMs();
  const variant = localStorage.getItem('vg_intake_variant') || 'unknown';
  const sessionId = getSessionId();

  const payload = {
    event: eventName,
    variant,
    sessionId,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    referrer: document.referrer,
    device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
    screenWidth: window.innerWidth,
    ...utms,
    ...data,
  };

  // Push to GTM dataLayer (Meta Pixel + GA4)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...payload });

  // Send to tracking endpoint (fire and forget, prefer sendBeacon)
  const body = JSON.stringify(payload);
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/track', new Blob([body], { type: 'application/json' }));
  } else {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {});
  }
};
