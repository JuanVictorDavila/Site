import { createFileRoute } from "@tanstack/react-router";

import { PericialServicePage, pericialServices } from "../components/pericial-service-page";
import { servicePageHead } from "../lib/seo";

export const Route = createFileRoute("/pericia-contabil")({
  head: () =>
    servicePageHead({
      title: "Perícia Contábil Judicial e Extrajudicial | Vértice",
      description:
        "Perícia contábil judicial e extrajudicial, cálculos, apuração de haveres e análise financeira com metodologia e conclusões verificáveis.",
      path: "/pericia-contabil",
      serviceName: pericialServices.contabil.title,
    }),
  component: () => <PericialServicePage service={pericialServices.contabil} />,
});
