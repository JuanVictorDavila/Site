import { createFileRoute } from "@tanstack/react-router";

import { InstitutionalPage } from "../components/institutional-page";
import { breadcrumbSchema, pageHead } from "../lib/seo";

export const Route = createFileRoute("/termos-de-uso")({
  head: () =>
    pageHead({
      title: "Termos de Uso | Vértice Perícia",
      description:
        "Condições de acesso e uso do site da Vértice Perícia, Consultoria, Auditoria e Tecnologia.",
      path: "/termos-de-uso",
      schemas: [
        breadcrumbSchema([
          { name: "Início", path: "/" },
          { name: "Termos de Uso", path: "/termos-de-uso" },
        ]),
      ],
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <InstitutionalPage
      eyebrow="Atualizados em 9 de outubro de 2026"
      title="Termos de Uso"
      description="Ao acessar este site, o visitante concorda em utilizá-lo de maneira lícita e compatível com estas condições."
    >
      <section>
        <h2>Finalidade do conteúdo</h2>
        <p>
          O conteúdo do site apresenta áreas de atuação e informações gerais. Artigos e páginas não
          constituem laudo, parecer, consultoria jurídica ou conclusão aplicável automaticamente a
          um caso. Cada demanda depende de escopo, materiais, contexto e limitações próprios.
        </p>
      </section>

      <section>
        <h2>Solicitações e contratação</h2>
        <p>
          O envio de uma mensagem não representa aceitação automática do trabalho nem cria relação
          contratual. Escopo, responsabilidades, entregas, prazo, remuneração e condições de uso de
          documentos ou dados serão definidos em proposta ou instrumento específico.
        </p>
      </section>

      <section>
        <h2>Uso adequado</h2>
        <p>
          Não é permitido utilizar o site para prática ilícita, tentativa de acesso indevido,
          interferência em seu funcionamento ou reprodução que viole direitos aplicáveis. Links
          externos são disponibilizados por conveniência e podem possuir termos próprios.
        </p>
      </section>

      <section>
        <h2>Propriedade intelectual e disponibilidade</h2>
        <p>
          Textos, identidade visual e demais materiais próprios são protegidos nos termos da
          legislação aplicável. O site poderá receber correções, atualizações ou interrupções
          temporárias, sem garantia de disponibilidade contínua.
        </p>
      </section>

      <section>
        <h2>Contato</h2>
        <p>
          Dúvidas sobre estes termos podem ser enviadas para{" "}
          <a href="mailto:vertice.pericias@gmail.com">vertice.pericias@gmail.com</a>.
        </p>
      </section>
    </InstitutionalPage>
  );
}
