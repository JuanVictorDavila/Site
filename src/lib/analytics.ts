export type AnalyticsEvent =
  "contact_form_submit" | "software_request" | "whatsapp_click" | "email_click" | "phone_click";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, parameters: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    window.gtag("event", event, parameters);
    return;
  }

  window.dataLayer?.push({ event, ...parameters });
}
