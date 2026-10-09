import { createFileRoute } from "@tanstack/react-router";

import { PericialServicePage, pericialServices } from "../components/pericial-service-page";
import { servicePageHead } from "../lib/seo";

export const Route = createFileRoute("/pericia-documental")({
  head: () =>
    servicePageHead({
      title: "Perícia Documental e Documentoscopia | Vértice",
      description:
        "Perícia documental para investigar rasuras, acréscimos, supressões, montagens e outras alterações em documentos físicos ou digitalizados.",
      path: "/pericia-documental",
      serviceName: pericialServices.documental.title,
    }),
  component: () => <PericialServicePage service={pericialServices.documental} />,
});
