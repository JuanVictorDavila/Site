import { createFileRoute } from "@tanstack/react-router";

import { PericialServicePage, pericialServices } from "../components/pericial-service-page";

export const Route = createFileRoute("/pericia-documental")({
  head: () => ({
    meta: [
      { title: "Perícia Documental | Vértice Perícia" },
      { name: "description", content: pericialServices.documental.description },
    ],
  }),
  component: () => <PericialServicePage service={pericialServices.documental} />,
});
