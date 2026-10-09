import { createFileRoute } from "@tanstack/react-router";

import { PericialServicePage, pericialServices } from "../components/pericial-service-page";
import { servicePageHead } from "../lib/seo";

export const Route = createFileRoute("/pericia-grafotecnica")({
  head: () =>
    servicePageHead({
      title: "Perícia Grafotécnica de Assinaturas | Vértice",
      description:
        "Perícia grafotécnica para exame técnico de assinaturas e escritas manuscritas em demandas judiciais e extrajudiciais.",
      path: "/pericia-grafotecnica",
      serviceName: pericialServices.grafotecnica.title,
    }),
  component: () => <PericialServicePage service={pericialServices.grafotecnica} />,
});
