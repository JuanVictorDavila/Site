import { useEffect, useState } from "react";

import {
  ANALYTICS_CONSENT_EVENT,
  COOKIE_PREFERENCES_EVENT,
  getAnalyticsConsent,
  setAnalyticsConsent,
  type AnalyticsConsent,
} from "../lib/analytics";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getAnalyticsConsent() === null);

    const openPreferences = () => setVisible(true);
    window.addEventListener(COOKIE_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(COOKIE_PREFERENCES_EVENT, openPreferences);
  }, []);

  const choose = (consent: AnalyticsConsent) => {
    if (!consent) return;
    setAnalyticsConsent(consent);
    window.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: consent }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Preferências de cookies"
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-4xl border border-border bg-background p-5 shadow-2xl sm:p-6"
    >
      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-base font-bold tracking-tight">Privacidade e métricas de acesso</h2>
          <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-muted-foreground">
            Cookies essenciais mantêm o site funcionando. Com sua autorização, o Google Analytics
            será usado para medir visitas e interações sem liberar cookies de publicidade.
          </p>
          <a
            href="/politica-de-privacidade"
            className="mt-2 inline-flex text-xs text-accent underline underline-offset-4"
          >
            Consultar a Política de Privacidade
          </a>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row md:flex-col">
          <button
            type="button"
            onClick={() => choose("granted")}
            className="min-h-11 bg-foreground px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-background hover:bg-accent"
          >
            Aceitar métricas
          </button>
          <button
            type="button"
            onClick={() => choose("denied")}
            className="min-h-11 border border-border px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-widest hover:border-accent"
          >
            Somente essenciais
          </button>
        </div>
      </div>
    </aside>
  );
}
