import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { trackEvent } from "../lib/analytics";

export type RequestKind = "pericia" | "auditoria" | "desenvolvimento";

const formNames: Record<RequestKind, string> = {
  pericia: "solicitacao-pericia",
  auditoria: "solicitacao-auditoria",
  desenvolvimento: "solicitacao-desenvolvimento",
};

const submitLabels: Record<RequestKind, string> = {
  pericia: "Enviar solicitação pericial",
  auditoria: "Enviar solicitação de auditoria",
  desenvolvimento: "Enviar briefing de desenvolvimento",
};

const fieldLabel =
  "block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2";
const fieldInput =
  "w-full min-h-12 rounded-none border border-border bg-background px-4 py-3 text-base sm:text-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

function encodeForm(formData: FormData) {
  const params = new URLSearchParams();
  formData.forEach((value, key) => {
    if (typeof value === "string") params.append(key, value);
  });
  return params.toString();
}

export function RequestForm({ kind }: { kind: RequestKind }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    setStatus("sending");
    const formData = new FormData(form);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeForm(formData),
      });

      if (!response.ok) throw new Error(`Netlify Forms respondeu com ${response.status}`);

      trackEvent("generate_lead", {
        form_name: formNames[kind],
        request_type: kind,
      });
      form.reset();
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <form
      name={formNames[kind]}
      method="POST"
      action="/contato?enviado=1"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <input type="hidden" name="form-name" value={formNames[kind]} />
      <p className="hidden" aria-hidden="true">
        <label>
          Não preencha este campo: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${kind}-nome`} className={fieldLabel}>
            Nome completo
          </label>
          <input
            id={`${kind}-nome`}
            name="nome"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            className={fieldInput}
          />
        </div>
        <div>
          <label htmlFor={`${kind}-telefone`} className={fieldLabel}>
            Telefone / WhatsApp
          </label>
          <input
            id={`${kind}-telefone`}
            name="telefone"
            type="tel"
            autoComplete="tel"
            required
            minLength={10}
            maxLength={20}
            inputMode="tel"
            placeholder="(92) 98168-0207"
            className={fieldInput}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${kind}-email`} className={fieldLabel}>
            E-mail
          </label>
          <input
            id={`${kind}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={255}
            className={fieldInput}
          />
        </div>
        <div>
          <label htmlFor={`${kind}-cidade`} className={fieldLabel}>
            Cidade / UF
          </label>
          <input
            id={`${kind}-cidade`}
            name="cidade"
            type="text"
            autoComplete="address-level2"
            required
            maxLength={120}
            placeholder="Manaus / AM"
            className={fieldInput}
          />
        </div>
      </div>

      {kind === "pericia" ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="pericia-tipo" className={fieldLabel}>
              Categoria da perícia
            </label>
            <select id="pericia-tipo" name="tipo-pericia" required className={fieldInput}>
              <option value="">Selecione</option>
              <option value="contabil">Perícia Contábil</option>
              <option value="grafotecnica">Perícia Grafotécnica</option>
              <option value="documental">Perícia Documental</option>
              <option value="digital">Perícia Digital</option>
              <option value="nao-sei">Ainda não sei identificar</option>
            </select>
          </div>
          <div>
            <label htmlFor="pericia-contexto" className={fieldLabel}>
              Contexto
            </label>
            <select id="pericia-contexto" name="contexto" required className={fieldInput}>
              <option value="">Selecione</option>
              <option value="judicial">Processo judicial em andamento</option>
              <option value="extrajudicial">Demanda extrajudicial</option>
              <option value="preventiva">Avaliação preventiva</option>
              <option value="nao-sei">Ainda não sei informar</option>
            </select>
          </div>
        </div>
      ) : null}

      {kind === "auditoria" ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="auditoria-organizacao" className={fieldLabel}>
              Empresa / organização
            </label>
            <input
              id="auditoria-organizacao"
              name="organizacao"
              type="text"
              maxLength={160}
              className={fieldInput}
            />
          </div>
          <div>
            <label htmlFor="auditoria-foco" className={fieldLabel}>
              Foco da auditoria
            </label>
            <select id="auditoria-foco" name="foco" required className={fieldInput}>
              <option value="">Selecione</option>
              <option value="financeiro">Financeiro e contábil</option>
              <option value="estoque">Estoque e movimentações</option>
              <option value="fraude">Suspeita de fraude ou desvio</option>
              <option value="controles">Controles internos</option>
              <option value="due-diligence">Due diligence</option>
              <option value="outro">Outro / ainda não definido</option>
            </select>
          </div>
        </div>
      ) : null}

      {kind === "desenvolvimento" ? (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="desenvolvimento-empresa" className={fieldLabel}>
                Empresa
              </label>
              <input
                id="desenvolvimento-empresa"
                name="empresa"
                type="text"
                maxLength={160}
                className={fieldInput}
              />
            </div>
            <div>
              <label htmlFor="desenvolvimento-solucao" className={fieldLabel}>
                Tipo de solução
              </label>
              <select id="desenvolvimento-solucao" name="solucao" required className={fieldInput}>
                <option value="">Selecione</option>
                <option value="sistema-web">Sistema web sob medida</option>
                <option value="automacao">Automação e integrações</option>
                <option value="site">Site ou landing page</option>
                <option value="portal">Portal ou área de clientes</option>
                <option value="aplicativo">Aplicativo</option>
                <option value="outro">Outro / ainda não definido</option>
              </select>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="desenvolvimento-prazo" className={fieldLabel}>
                Prazo desejado
              </label>
              <select id="desenvolvimento-prazo" name="prazo" required className={fieldInput}>
                <option value="">Selecione</option>
                <option value="ate-30-dias">Até 30 dias</option>
                <option value="1-a-3-meses">1 a 3 meses</option>
                <option value="3-a-6-meses">3 a 6 meses</option>
                <option value="a-definir">Ainda em definição</option>
              </select>
            </div>
            <div>
              <label htmlFor="desenvolvimento-orcamento" className={fieldLabel}>
                Faixa de investimento
              </label>
              <select
                id="desenvolvimento-orcamento"
                name="orcamento"
                required
                className={fieldInput}
              >
                <option value="">Selecione</option>
                <option value="ate-10-mil">Até R$ 10 mil</option>
                <option value="10-a-30-mil">R$ 10 a 30 mil</option>
                <option value="30-a-80-mil">R$ 30 a 80 mil</option>
                <option value="acima-80-mil">Acima de R$ 80 mil</option>
                <option value="a-definir">A definir na proposta</option>
              </select>
            </div>
          </div>
        </>
      ) : null}

      <div>
        <label htmlFor={`${kind}-mensagem`} className={fieldLabel}>
          {kind === "desenvolvimento" ? "Descrição do projeto" : "Resumo da solicitação"}
        </label>
        <textarea
          id={`${kind}-mensagem`}
          name="mensagem"
          rows={6}
          required
          minLength={20}
          maxLength={3000}
          className={`${fieldInput} resize-y`}
          placeholder={
            kind === "desenvolvimento"
              ? "Descreva o processo atual, quem utilizará a solução e o resultado esperado."
              : "Explique brevemente a situação, o objetivo da análise e se existe algum prazo."
          }
        />
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Não envie senhas, dados bancários nem documentos sigilosos neste primeiro contato.
        </p>
      </div>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          name="aceite-privacidade"
          value="sim"
          required
          className="mt-1 size-4 shrink-0 accent-[var(--color-accent)]"
        />
        <span>
          Li a{" "}
          <Link to="/politica-de-privacidade" className="text-accent underline">
            Política de Privacidade
          </Link>{" "}
          e autorizo o uso destes dados para responder à solicitação.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-12 w-full items-center justify-center bg-foreground px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-accent disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" ? "Enviando..." : submitLabels[kind]}
      </button>

      <div aria-live="polite" className="min-h-6 text-sm">
        {status === "success" ? (
          <p className="border-l-2 border-emerald-600 pl-3 text-emerald-700">
            Solicitação enviada. Nossa equipe entrará em contato pelos dados informados.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="border-l-2 border-red-600 pl-3 text-red-700">
            Não foi possível enviar agora. Tente novamente ou escreva para
            vertice.pericias@gmail.com.
          </p>
        ) : null}
      </div>
    </form>
  );
}
