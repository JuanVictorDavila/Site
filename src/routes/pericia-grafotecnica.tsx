import { createFileRoute } from "@tanstack/react-router";

import { PericialServicePage, pericialServices } from "../components/pericial-service-page";

export const Route = createFileRoute("/pericia-grafotecnica")({
  head: () => ({
    meta: [
      { title: "Perícia Grafotécnica | Vértice Perícia" },
      { name: "description", content: pericialServices.grafotecnica.description },
    ],
  }),
  component: () => <PericialServicePage service={pericialServices.grafotecnica} />,
});
