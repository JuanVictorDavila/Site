import { createFileRoute } from "@tanstack/react-router";

import { PericialServicePage, pericialServices } from "../components/pericial-service-page";
import { servicePageHead } from "../lib/seo";

export const Route = createFileRoute("/pericia-digital")({
  head: () =>
    servicePageHead({
      title: "Perícia Digital e Evidências Eletrônicas | Vértice",
      description:
        "Perícia digital para preservar, recuperar e analisar dispositivos, arquivos, mensagens, metadados, sistemas e outras evidências eletrônicas.",
      path: "/pericia-digital",
      serviceName: pericialServices.digital.title,
    }),
  component: () => <PericialServicePage service={pericialServices.digital} />,
});
