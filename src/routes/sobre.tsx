import { createFileRoute, Link } from "@tanstack/react-router";

import { InstitutionalPage } from "../components/institutional-page";
import { breadcrumbSchema, organizationSchema, pageHead } from "../lib/seo";

export const Route = createFileRoute("/sobre")({
  head: () =>
    pageHead({
      title: "Sobre a Vértice | Perícia, Auditoria e Tecnologia",
      description:
        "Conheça a Vértice, sua atuação em perícias, auditoria especial e desenvolvimento de software sob medida.",
      path: "/sobre",
      schemas: [
        organizationSchema(),
        breadcrumbSchema([
          { name: "Início", path: "/" },
          { name: "Sobre a Vértice", path: "/sobre" },
        ]),
      ],
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <InstitutionalPage
      eyebrow="Institucional"
      title="Sobre a Vértice"
      description="Perícia, auditoria e tecnologia reunidas para transformar questões complexas em trabalhos claros, delimitados e verificáveis."
    >
      <section>
        <h2>Quem somos</h2>
        <p>
          A Vértice Perícia, Consultoria, Auditoria e Tecnologia LTDA atua em demandas técnicas
          judiciais e extrajudiciais e no desenvolvimento de soluções digitais para empresas. A
          organização dos trabalhos parte do problema apresentado, das fontes disponíveis e dos
          limites que precisam ser respeitados.
        </p>
      </section>

      <section>
        <h2>Frentes de atuação</h2>
        <ul>
          <li>Perícia contábil e assistência técnica.</li>
          <li>Auditoria especial, preventiva e investigativa.</li>
          <li>Perícia grafotécnica e documental.</li>
          <li>Perícia digital e preservação de evidências eletrônicas.</li>
          <li>Desenvolvimento de sistemas, automações e integrações sob medida.</li>
        </ul>
        <p>
          Conheça as <Link to="/">especialidades periciais</Link> ou a área de{" "}
          <Link to="/desenvolvimento">desenvolvimento de software</Link>.
        </p>
      </section>

      <section>
        <h2>Forma de trabalho</h2>
        <p>
          Cada solicitação é avaliada antes da definição do escopo. Buscamos identificar a questão
          técnica, os documentos ou dados necessários, os procedimentos adequados e as limitações
          relevantes. Conclusões e entregas são apresentadas dentro do alcance efetivamente
          contratado e do material que pôde ser examinado.
        </p>
      </section>

      <section>
        <h2>Identificação e contato</h2>
        <p>Vértice Perícia, Consultoria, Auditoria e Tecnologia LTDA — CNPJ 67.807.914/0001-30.</p>
        <p>
          E-mail: <a href="mailto:vertice.pericias@gmail.com">vertice.pericias@gmail.com</a>
        </p>
        <p>
          Para iniciar uma conversa, use o{" "}
          <Link to="/contato">formulário da área correspondente</Link>.
        </p>
      </section>
    </InstitutionalPage>
  );
}
