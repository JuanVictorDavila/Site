import { useState } from "react";
import { z } from "zod";

const WHATSAPP_NUMBER = "5592981680207";

const softwareSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
  email: z.string().email("E-mail inválido").max(255, "E-mail muito longo"),
  phone: z
    .string()
    .min(10, "Telefone deve ter pelo menos 10 dígitos")
    .max(20, "Telefone muito longo"),
  solution: z.string().min(1, "Selecione o tipo de solução"),
  deadline: z.string().min(1, "Selecione um prazo desejado"),
  budget: z.string().min(1, "Selecione uma faixa de investimento"),
  message: z
    .string()
    .min(10, "Descreva o projeto em pelo menos 10 caracteres")
    .max(1000, "Mensagem muito longa"),
});

type SoftwareFormData = z.infer<typeof softwareSchema>;

const solutionLabels: Record<string, string> = {
  micro_saas: "Micro-SaaS ou sistema web interno",
  automacao: "Automação de processos e integrações",
  site: "Site institucional ou landing page",
  portal: "Portal ou área de clientes",
  painel: "Painel de indicadores e relatórios",
  app: "Aplicativo mobile",
  outro: "Outro / ainda não sei informar",
};

const deadlineLabels: Record<string, string> = {
  imediato: "Imediato (até 30 dias)",
  curto: "Curto (1 a 3 meses)",
  medio: "Médio (3 a 6 meses)",
  flexivel: "Ainda em definição",
};

const budgetLabels: Record<string, string> = {
  ate_10k: "Até R$ 10 mil",
  de_10a30k: "R$ 10 a 30 mil",
  de_30a80k: "R$ 30 a 80 mil",
  acima_80k: "Acima de R$ 80 mil",
  a_definir: "A definir na proposta",
};

const fieldLabel =
  "block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2";
const fieldInput =
  "w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors";

export function SoftwareForm() {
  const [form, setForm] = useState<SoftwareFormData>({
    name: "",
    email: "",
    phone: "",
    solution: "",
    deadline: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SoftwareFormData, string>>>({});

  const validate = (data: SoftwareFormData) => {
    const result = softwareSchema.safeParse(data);
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors: Partial<Record<keyof SoftwareFormData, string>> = {};
    result.error.errors.forEach((error) => {
      const key = error.path[0] as keyof SoftwareFormData;
      if (!fieldErrors[key]) fieldErrors[key] = error.message;
    });
    setErrors(fieldErrors);
    return false;
  };

  const handleChange = (field: keyof SoftwareFormData, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    validate(next);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate(form)) return;

    const text = `Olá, sou ${form.name}.\nGostaria de desenvolver uma solução de software com a Vértice.\n\n*Nome:* ${form.name}\n*E-mail:* ${form.email}\n*Telefone:* ${form.phone}\n*Solução:* ${solutionLabels[form.solution] || form.solution}\n*Prazo:* ${deadlineLabels[form.deadline] || form.deadline}\n*Investimento:* ${budgetLabels[form.budget] || form.budget}\n*Descrição:* ${form.message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="sw-name" className={fieldLabel}>
          Nome completo
        </label>
        <input
          id="sw-name"
          name="name"
          type="text"
          value={form.name}
          onChange={(event) => handleChange("name", event.target.value)}
          className={fieldInput}
          placeholder="Seu nome"
        />
        {errors.name && <p className="mt-2 text-xs text-red-500">{errors.name}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="sw-email" className={fieldLabel}>
            E-mail
          </label>
          <input
            id="sw-email"
            name="email"
            type="email"
            value={form.email}
            onChange={(event) => handleChange("email", event.target.value)}
            className={fieldInput}
            placeholder="seu@email.com"
          />
          {errors.email && <p className="mt-2 text-xs text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="sw-phone" className={fieldLabel}>
            Telefone / WhatsApp
          </label>
          <input
            id="sw-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(event) => handleChange("phone", event.target.value)}
            className={fieldInput}
            placeholder="(92) 98168-0207"
          />
          {errors.phone && <p className="mt-2 text-xs text-red-500">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="sw-solution" className={fieldLabel}>
          Tipo de solução
        </label>
        <select
          id="sw-solution"
          name="solution"
          value={form.solution}
          onChange={(event) => handleChange("solution", event.target.value)}
          className={`${fieldInput} appearance-none`}
        >
          <option value="">Selecione o tipo de solução</option>
          <option value="micro_saas">Micro-SaaS ou sistema web interno</option>
          <option value="automacao">Automação de processos e integrações</option>
          <option value="site">Site institucional ou landing page</option>
          <option value="portal">Portal ou área de clientes</option>
          <option value="painel">Painel de indicadores e relatórios</option>
          <option value="app">Aplicativo mobile</option>
          <option value="outro">Outro / ainda não sei informar</option>
        </select>
        {errors.solution && <p className="mt-2 text-xs text-red-500">{errors.solution}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="sw-deadline" className={fieldLabel}>
            Prazo desejado
          </label>
          <select
            id="sw-deadline"
            name="deadline"
            value={form.deadline}
            onChange={(event) => handleChange("deadline", event.target.value)}
            className={`${fieldInput} appearance-none`}
          >
            <option value="">Selecione um prazo</option>
            <option value="imediato">Imediato (até 30 dias)</option>
            <option value="curto">Curto (1 a 3 meses)</option>
            <option value="medio">Médio (3 a 6 meses)</option>
            <option value="flexivel">Ainda em definição</option>
          </select>
          {errors.deadline && <p className="mt-2 text-xs text-red-500">{errors.deadline}</p>}
        </div>
        <div>
          <label htmlFor="sw-budget" className={fieldLabel}>
            Faixa de investimento
          </label>
          <select
            id="sw-budget"
            name="budget"
            value={form.budget}
            onChange={(event) => handleChange("budget", event.target.value)}
            className={`${fieldInput} appearance-none`}
          >
            <option value="">Selecione uma faixa</option>
            <option value="ate_10k">Até R$ 10 mil</option>
            <option value="de_10a30k">R$ 10 a 30 mil</option>
            <option value="de_30a80k">R$ 30 a 80 mil</option>
            <option value="acima_80k">Acima de R$ 80 mil</option>
            <option value="a_definir">A definir na proposta</option>
          </select>
          {errors.budget && <p className="mt-2 text-xs text-red-500">{errors.budget}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="sw-message" className={fieldLabel}>
          Descrição do projeto
        </label>
        <textarea
          id="sw-message"
          name="message"
          rows={4}
          value={form.message}
          onChange={(event) => handleChange("message", event.target.value)}
          className={`${fieldInput} resize-none`}
          placeholder="Descreva o processo atual, quem vai usar e o que precisa mudar..."
        />
        {errors.message && <p className="mt-2 text-xs text-red-500">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full px-6 py-4 bg-[#25D366] text-white font-bold tracking-tight hover:brightness-110 transition-all"
      >
        Enviar briefing pelo WhatsApp
      </button>
      <p className="text-xs text-muted-foreground text-center">
        Ao enviar, você será redirecionado para o WhatsApp com os dados preenchidos.
      </p>
    </form>
  );
}
