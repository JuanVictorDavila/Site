import { createFileRoute } from "@tanstack/react-router";

import { PericialServicePage, pericialServices } from "../components/pericial-service-page";
import { servicePageHead } from "../lib/seo";

export const Route = createFileRoute("/auditoria")({
  head: () =>
    servicePageHead({
      title: "Auditoria Especial e Investigativa | Vértice Perícia",
      description:
        "Auditoria especial, preventiva e investigativa de fluxos financeiros, estoques, controles internos e processos empresariais.",
      path: "/auditoria",
      serviceName: pericialServices.auditoria.title,
    }),
  component: () => <PericialServicePage service={pericialServices.auditoria} />,
});
