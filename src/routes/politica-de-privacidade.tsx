import { createFileRoute } from "@tanstack/react-router";

import { InstitutionalPage } from "../components/institutional-page";
import { breadcrumbSchema, pageHead } from "../lib/seo";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () =>
    pageHead({
      title: "Política de Privacidade | Vértice Perícia",
      description:
        "Saiba como a Vértice trata informações fornecidas durante a navegação e o contato pelo site.",
      path: "/politica-de-privacidade",
      schemas: [
        breadcrumbSchema([
          { name: "Início", path: "/" },
          { name: "Política de Privacidade", path: "/politica-de-privacidade" },
        ]),
      ],
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <InstitutionalPage
      eyebrow="Atualizada em 9 de outubro de 2026"
      title="Política de Privacidade"
      description="Esta política explica, de forma objetiva, como as informações relacionadas ao uso deste site e aos contatos iniciados por ele podem ser tratadas."
    >
      <section>
        <h2>Responsável pelo site</h2>
        <p>
          O site é mantido pela Vértice Perícia, Consultoria, Auditoria e Tecnologia LTDA, CNPJ
          67.807.914/0001-30. Dúvidas sobre privacidade podem ser enviadas para{" "}
          <a href="mailto:vertice.pericias@gmail.com">vertice.pericias@gmail.com</a>.
        </p>
      </section>

      <section>
        <h2>Informações fornecidas pelo visitante</h2>
        <p>
          Os formulários de contato coletam os dados necessários para identificar a solicitação e
          responder ao visitante. As respostas são processadas pela infraestrutura de hospedagem da
          Netlify e ficam disponíveis à Vértice para triagem e atendimento. Contatos iniciados pelo
          WhatsApp também passam a observar os termos e as políticas desse serviço.
        </p>
        <p>
          O visitante deve evitar o envio inicial de senhas, dados bancários, documentos completos
          ou informações sigilosas. Materiais necessários a um trabalho deverão ser compartilhados
          pelo canal e no momento definidos para o atendimento.
        </p>
      </section>

      <section>
        <h2>Cookies, dados técnicos e métricas</h2>
        <p>
          A hospedagem pode registrar informações técnicas necessárias à segurança e à entrega do
          site, como endereço IP, data, horário, navegador e páginas solicitadas. O site guarda no
          navegador a preferência do visitante sobre métricas para não solicitar a mesma decisão a
          cada página.
        </p>
        <p>
          Quando autorizado no banner de cookies, o Google Analytics 4 poderá medir visualizações de
          páginas e interações de contato. O carregamento da ferramenta permanece bloqueado quando o
          visitante escolhe somente cookies essenciais. A preferência pode ser revista a qualquer
          momento pelo botão “Cookies” no rodapé.
        </p>
      </section>

      <section>
        <h2>Finalidades e compartilhamento</h2>
        <p>
          As informações podem ser utilizadas para responder solicitações, avaliar escopo, manter a
          segurança, cumprir obrigações legais e melhorar o site. Elas poderão ser processadas por
          fornecedores necessários à operação, como hospedagem, comunicação e mensuração, ou
          compartilhadas quando houver obrigação legal ou autorização válida.
        </p>
      </section>

      <section>
        <h2>Direitos e atualizações</h2>
        <p>
          Solicitações relativas a acesso, correção, informação, oposição ou eliminação podem ser
          encaminhadas ao e-mail de contato e serão avaliadas conforme a legislação aplicável e as
          obrigações de conservação. Esta política poderá ser atualizada quando os serviços ou as
          ferramentas do site forem modificados.
        </p>
      </section>
    </InstitutionalPage>
  );
}
