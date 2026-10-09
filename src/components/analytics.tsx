import { useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import {
  ANALYTICS_CONSENT_EVENT,
  getAnalyticsConsent,
  trackEvent,
  type AnalyticsConsent,
} from "../lib/analytics";
import { IS_PRODUCTION } from "../lib/environment";

const measurementId = IS_PRODUCTION ? import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() : undefined;

export function Analytics() {
  const location = useLocation();
  const [consent, setConsent] = useState<AnalyticsConsent>(null);
  const configured = useRef(false);

  useEffect(() => {
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };

    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500,
    });
    window.gtag("js", new Date());

    const initialConsent = getAnalyticsConsent();
    setConsent(initialConsent);

    const handleConsent = (event: Event) => {
      const nextConsent = (event as CustomEvent<AnalyticsConsent>).detail;
      setConsent(nextConsent);
    };

    window.addEventListener(ANALYTICS_CONSENT_EVENT, handleConsent);
    return () => window.removeEventListener(ANALYTICS_CONSENT_EVENT, handleConsent);
  }, []);

  useEffect(() => {
    if (!window.gtag || consent !== "granted") {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      return;
    }

    window.gtag("consent", "update", { analytics_storage: "granted" });

    if (!measurementId) return;

    if (!document.querySelector(`script[data-ga-id="${measurementId}"]`)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.dataset.gaId = measurementId;
      document.head.appendChild(script);
    }

    if (!configured.current) {
      window.gtag("config", measurementId, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
      configured.current = true;
    }
  }, [consent]);

  useEffect(() => {
    if (!measurementId || !window.gtag || consent !== "granted" || !configured.current) return;

    window.gtag("event", "page_view", {
      page_path: location.pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [consent, location.href, location.pathname]);

  useEffect(() => {
    const handleContactClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest("a");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      const source = link.getAttribute("data-analytics-source") ?? location.pathname;

      if (href.startsWith("https://wa.me/")) {
        trackEvent("whatsapp_click", { source });
      } else if (href.startsWith("mailto:")) {
        trackEvent("email_click", { source });
      } else if (href.startsWith("tel:")) {
        trackEvent("phone_click", { source });
      }
    };

    document.addEventListener("click", handleContactClick);
    return () => document.removeEventListener("click", handleContactClick);
  }, [location.pathname]);

  return null;
}
