export type AnalyticsEvent =
  | "contact_form_submit"
  | "software_request"
  | "generate_lead"
  | "whatsapp_click"
  | "email_click"
  | "phone_click";

export type AnalyticsConsent = "granted" | "denied" | null;

export const ANALYTICS_CONSENT_KEY = "vertice.analytics-consent";
export const ANALYTICS_CONSENT_EVENT = "vertice:analytics-consent";
export const COOKIE_PREFERENCES_EVENT = "vertice:cookie-preferences";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

export function setAnalyticsConsent(consent: Exclude<AnalyticsConsent, null>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ANALYTICS_CONSENT_KEY, consent);
}

export function trackEvent(event: AnalyticsEvent, parameters: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || getAnalyticsConsent() !== "granted") return;

  if (window.gtag) {
    window.gtag("event", event, parameters);
    return;
  }

  window.dataLayer?.push({ event, ...parameters });
}
