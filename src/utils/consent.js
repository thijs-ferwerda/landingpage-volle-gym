/**
 * Cookie Consent Manager
 * Handles localStorage persistence + Google Consent Mode v2 integration.
 *
 * Categories:
 *   necessary   – always granted (session, security)
 *   analytics   – GA4, Vercel Analytics
 *   marketing   – Meta Pixel, Google Ads, remarketing
 */

const STORAGE_KEY = 'vg_cookie_consent';

const DEFAULT_CONSENT = {
  necessary: true,   // always true, non-togglable
  analytics: false,
  marketing: false,
};

/** Read stored consent, or return null if no choice was made yet. */
export function getConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Persist consent choice and push update to GTM / Consent Mode. */
export function setConsent(consent) {
  const merged = { ...DEFAULT_CONSENT, ...consent, necessary: true };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  pushConsentUpdate(merged);
}

/** Accept all categories. */
export function acceptAll() {
  setConsent({ analytics: true, marketing: true });
}

/** Reject all optional categories. */
export function rejectAll() {
  setConsent({ analytics: false, marketing: false });
}

/** Push Google Consent Mode v2 update via gtag. */
function pushConsentUpdate(consent) {
  if (typeof window.gtag !== 'function') return;

  window.gtag('consent', 'update', {
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    ad_storage: consent.marketing ? 'granted' : 'denied',
    ad_user_data: consent.marketing ? 'granted' : 'denied',
    ad_personalization: consent.marketing ? 'granted' : 'denied',
  });
}

/**
 * Set the default consent state. Must run BEFORE GTM loads.
 * Called from index.html inline script.
 */
export function initDefaultConsent() {
  // If user already made a choice, apply it immediately
  const stored = getConsent();

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };

  if (stored) {
    window.gtag('consent', 'default', {
      analytics_storage: stored.analytics ? 'granted' : 'denied',
      ad_storage: stored.marketing ? 'granted' : 'denied',
      ad_user_data: stored.marketing ? 'granted' : 'denied',
      ad_personalization: stored.marketing ? 'granted' : 'denied',
      functionality_storage: 'granted',
      personalization_storage: 'granted',
      security_storage: 'granted',
    });
  } else {
    // No choice yet — deny everything by default (GDPR compliant)
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      functionality_storage: 'granted',
      personalization_storage: 'granted',
      security_storage: 'granted',
    });
  }
}

/** Check if user has already made a consent choice. */
export function hasConsentChoice() {
  return getConsent() !== null;
}
