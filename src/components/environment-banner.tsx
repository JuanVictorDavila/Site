import { SITE_ENVIRONMENT } from "../lib/environment";

const environmentLabels = {
  staging: "Ambiente de homologação",
  preview: "Prévia de revisão",
  local: "Ambiente local",
} as const;

export function EnvironmentBanner() {
  if (SITE_ENVIRONMENT === "production") return null;

  return (
    <div
      role="status"
      className="fixed bottom-3 right-3 z-[100] max-w-[calc(100vw-1.5rem)] border border-amber-400 bg-amber-50 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-amber-950 shadow-lg"
    >
      {environmentLabels[SITE_ENVIRONMENT]} · use somente dados de teste
    </div>
  );
}
