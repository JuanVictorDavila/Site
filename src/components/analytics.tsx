import { useLocation } from "@tanstack/react-router";
import { useEffect } from "react";

import { trackEvent } from "../lib/analytics";

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

export function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (!measurementId || document.querySelector(`script[data-ga-id="${measurementId}"]`)) return;

    window.dataLayer = window.dataLayer ?? [];
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
    window.gtag("js", new Date());

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.dataset.gaId = measurementId;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!measurementId || !window.gtag) return;

    window.gtag("config", measurementId, {
      page_path: location.pathname,
      page_location: window.location.href,
      send_page_view: true,
    });
  }, [location.href, location.pathname]);

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
