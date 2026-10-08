import { createFileRoute } from "@tanstack/react-router";

import { PericialServicePage, pericialServices } from "../components/pericial-service-page";

export const Route = createFileRoute("/pericia-contabil")({
  head: () => ({
    meta: [
      { title: "Perícia Contábil | Vértice Perícia" },
      { name: "description", content: pericialServices.contabil.description },
    ],
  }),
  component: () => <PericialServicePage service={pericialServices.contabil} />,
});
