import { createFileRoute } from "@tanstack/react-router";

import { PericialServicePage, pericialServices } from "../components/pericial-service-page";

export const Route = createFileRoute("/auditoria")({
  head: () => ({
    meta: [
      { title: "Auditoria Especial | Vértice Perícia" },
      { name: "description", content: pericialServices.auditoria.description },
    ],
  }),
  component: () => <PericialServicePage service={pericialServices.auditoria} />,
});
