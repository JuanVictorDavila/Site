import { createFileRoute } from "@tanstack/react-router";

import { PericialServicePage, pericialServices } from "../components/pericial-service-page";

export const Route = createFileRoute("/pericia-digital")({
  head: () => ({
    meta: [
      { title: "Perícia Digital | Vértice Perícia" },
      { name: "description", content: pericialServices.digital.description },
    ],
  }),
  component: () => <PericialServicePage service={pericialServices.digital} />,
});
