import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import heroImage from "../assets/hero-forensic.jpg";
import { PericialNav } from "../components/pericial-nav";

const WHATSAPP_NUMBER = "5592981680207";
const SHOW_LEGACY_SOFTWARE_SECTION = false;

const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
  email: z.string().email("E-mail inválido").max(255, "E-mail muito longo"),
  phone: z
    .string()
    .min(10, "Telefone deve ter pelo menos 10 dígitos")
    .max(20, "Telefone muito longo"),
  service: z.string().min(1, "Selecione um tipo de serviço"),
  message: z
    .string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(1000, "Mensagem muito longa"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const serviceLabels: Record<string, string> = {
  pericia_contabil: "Perícia Contábil",
  pericia_grafotecnica: "Perícia Grafotécnica",
  pericia_documental: "Perícia Documental",
  pericia_digital: "Perícia Digital",
  auditoria: "Auditoria Especial",
  outro: "Outro / Não sei informar",
};

function ContactForm() {
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({});

  const validate = (data: ContactFormData) => {
    const result = contactSchema.safeParse(data);
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
    result.error.errors.forEach((err) => {
      const key = err.path[0] as keyof ContactFormData;
      if (!fieldErrors[key]) fieldErrors[key] = err.message;
    });
    setErrors(fieldErrors);
    return false;
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    validate(next);
  };

  const handleBlur = (field: keyof ContactFormData, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate(next);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: ContactFormData = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      service: String(formData.get("service") ?? ""),
      message: String(formData.get("message") ?? ""),
    };
    setForm(data);
    setTouched({ name: true, email: true, phone: true, service: true, message: true });
    if (!validate(data)) return;

    const text = `Olá, sou ${data.name}.\nGostaria de solicitar uma análise da Vértice Perícia.\n\n*Nome:* ${data.name}\n*E-mail:* ${data.email}\n*Telefone:* ${data.phone}\n*Serviço:* ${serviceLabels[data.service] || data.service}\n*Mensagem:* ${data.message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label
          htmlFor="name"
          className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2"
        >
          Nome completo
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={(e) => handleBlur("name", e.target.value)}
          className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
          placeholder="Seu nome"
        />
        {errors.name && <p className="mt-2 text-xs text-red-500">{errors.name}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="email"
            className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2"
          >
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={(e) => handleBlur("email", e.target.value)}
            className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
            placeholder="seu@email.com"
          />
          {errors.email && <p className="mt-2 text-xs text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2"
          >
            Telefone / WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={(e) => handleBlur("phone", e.target.value)}
            className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
            placeholder="(92) 98168-0207"
          />
          {errors.phone && <p className="mt-2 text-xs text-red-500">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label
          htmlFor="service"
          className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2"
        >
          Tipo de serviço
        </label>
        <select
          id="service"
          name="service"
          value={form.service}
          onChange={(e) => handleChange("service", e.target.value)}
          onBlur={(e) => handleBlur("service", e.target.value)}
          className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors appearance-none"
        >
          <option value="">Selecione um serviço</option>
          <option value="pericia_contabil">Perícia Contábil</option>
          <option value="pericia_grafotecnica">Perícia Grafotécnica</option>
          <option value="pericia_documental">Perícia Documental</option>
          <option value="pericia_digital">Perícia Digital</option>
          <option value="auditoria">Auditoria Especial</option>
          <option value="outro">Outro / Não sei informar</option>
        </select>
        {errors.service && <p className="mt-2 text-xs text-red-500">{errors.service}</p>}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2"
        >
          Descrição do caso
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={(e) => handleBlur("message", e.target.value)}
          className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
          placeholder="Conte resumidamente o que precisa..."
        />
        {errors.message && <p className="mt-2 text-xs text-red-500">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full px-6 py-4 bg-[#25D366] text-white font-bold tracking-tight hover:brightness-110 transition-all flex items-center justify-center gap-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.009-.57-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.751.982.998-3.648-.235-.374a9.86 9.86 0 01-1.53-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Enviar solicitação pelo WhatsApp
      </button>

      <p className="text-xs text-muted-foreground text-center">
        Ao enviar, você será redirecionado para o WhatsApp com os dados preenchidos.
      </p>
    </form>
  );
}

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

function SoftwareForm() {
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
  const [touched, setTouched] = useState<Partial<Record<keyof SoftwareFormData, boolean>>>({});

  const validate = (data: SoftwareFormData) => {
    const result = softwareSchema.safeParse(data);
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors: Partial<Record<keyof SoftwareFormData, string>> = {};
    result.error.errors.forEach((err) => {
      const key = err.path[0] as keyof SoftwareFormData;
      if (!fieldErrors[key]) fieldErrors[key] = err.message;
    });
    setErrors(fieldErrors);
    return false;
  };

  const handleChange = (field: keyof SoftwareFormData, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    validate(next);
  };

  const handleBlur = (field: keyof SoftwareFormData, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate(next);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      solution: true,
      deadline: true,
      budget: true,
      message: true,
    });
    if (!validate(form)) return;

    const text = `Olá, sou ${form.name}.\nGostaria de desenvolver uma solução de software com a Vértice Perícia.\n\n*Nome:* ${form.name}\n*E-mail:* ${form.email}\n*Telefone:* ${form.phone}\n*Solução:* ${solutionLabels[form.solution] || form.solution}\n*Prazo:* ${deadlineLabels[form.deadline] || form.deadline}\n*Investimento:* ${budgetLabels[form.budget] || form.budget}\n*Descrição:* ${form.message}`;
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
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={(e) => handleBlur("name", e.target.value)}
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
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={(e) => handleBlur("email", e.target.value)}
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
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={(e) => handleBlur("phone", e.target.value)}
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
          onChange={(e) => handleChange("solution", e.target.value)}
          onBlur={(e) => handleBlur("solution", e.target.value)}
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
            onChange={(e) => handleChange("deadline", e.target.value)}
            onBlur={(e) => handleBlur("deadline", e.target.value)}
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
            onChange={(e) => handleChange("budget", e.target.value)}
            onBlur={(e) => handleBlur("budget", e.target.value)}
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
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={(e) => handleBlur("message", e.target.value)}
          className={`${fieldInput} resize-none`}
          placeholder="Descreva o processo atual, quem vai usar e o que precisa mudar..."
        />
        {errors.message && <p className="mt-2 text-xs text-red-500">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full px-6 py-4 bg-[#25D366] text-white font-bold tracking-tight hover:brightness-110 transition-all flex items-center justify-center gap-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.009-.57-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.751.982.998-3.648-.235-.374a9.86 9.86 0 01-1.53-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Enviar briefing pelo WhatsApp
      </button>

      <p className="text-xs text-muted-foreground text-center">
        Ao enviar, você será redirecionado para o WhatsApp com os dados preenchidos.
      </p>
    </form>
  );
}

function WhatsAppFloatButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.009-.57-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.751.982.998-3.648-.235-.374a9.86 9.86 0 01-1.53-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Vértice Perícia | Perícias Contábil, Grafotécnica, Documental e Digital",
      },
      {
        name: "description",
        content:
          "Perícias contábil, grafotécnica, documental e digital e auditoria especial. Atuação judicial e extrajudicial.",
      },
      {
        property: "og:title",
        content:
          "Vértice Perícia | Perícia Contábil, Grafotécnica, Documental, Digital e Auditoria",
      },
      {
        property: "og:description",
        content:
          "Perícias contábil, grafotécnica, documental e digital e auditoria. Atuação judicial e extrajudicial.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: heroImage },
      { name: "twitter:image", content: heroImage },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/10 selection:text-accent">
      <PericialNav />

      {/* Hero: Documentary Style */}
      <header className="relative pt-24 pb-16 px-6 border-b border-border overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_400px] gap-12">
          <div className="animate-entry">
            <div className="inline-flex items-center gap-2 px-2 py-1 bg-accent/5 border border-accent/10 mb-8">
              <div className="size-1.5 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                Pronto para Evidência
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] text-balance mb-8">
              Precisão técnica onde a <span className="text-accent">prova</span> reside.
            </h1>
            <p className="max-w-[50ch] text-lg text-muted-foreground text-pretty leading-relaxed mb-12">
              Escritório especializado em perícia contábil de alta complexidade, auditoria forense,
              exame grafotécnico e documental e recuperação de evidências digitais.
            </p>
            <div className="flex flex-wrap gap-12">
              <div>
                <span className="block font-mono text-2xl font-bold">R$ 100.2M</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Ativos Auditados
                </span>
              </div>
              <div>
                <span className="block font-mono text-2xl font-bold">98.4%</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Aprovação em Laudos
                </span>
              </div>
            </div>
          </div>

          <div className="relative animate-entry [animation-delay:200ms]">
            <div className="relative w-full min-h-[400px] lg:min-h-full overflow-hidden">
              <img
                src={heroImage}
                alt="Estação de trabalho forense digital com múltiplos monitores e documentos técnicos organizados"
                width={1024}
                height={1280}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-[2px] bg-accent/30 animate-scanline opacity-50" />
            </div>
          </div>
        </div>
      </header>

      {/* Services: Detailed Grid */}
      <section id="servicos" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="animate-entry [animation-delay:300ms]">
              <span className="font-mono text-[10px] text-accent uppercase tracking-widest mb-4 block">
                01 — Especialidades
              </span>
              <h2 className="text-4xl font-bold tracking-tighter">Nossas Frentes de Atuação</h2>
            </div>
            <p className="max-w-[40ch] text-sm text-muted-foreground animate-entry [animation-delay:400ms]">
              Atuação judicial e extrajudicial, inclusive por contratação particular, em litígios
              corporativos, disputas societárias e conformidade regulatória.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6 animate-entry [animation-delay:500ms]">
            <article
              id="pericia-contabil"
              className="scroll-mt-32 lg:scroll-mt-20 group bg-background border border-border p-8 hover:border-accent/50 transition-colors duration-500 flex flex-col lg:col-span-2"
            >
              <span className="font-mono text-xs text-accent mb-6 block">
                CASE_TYPE: ACCOUNTING
              </span>
              <h3 className="text-2xl font-bold tracking-tight mb-4">
                <Link to="/pericia-contabil" className="hover:text-accent transition-colors">
                  Perícia Contábil
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Apuração de haveres, cálculos judiciais complexos e perícia arbitral com foco em
                liquidez e valorização econômica.
              </p>
              <ul className="text-sm text-muted-foreground space-y-3 mb-8 flex-1">
                <li className="flex gap-3">
                  <span className="text-accent">›</span>
                  <span>Cálculos de liquidação de sentença</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">›</span>
                  <span>Perícia contábil em dissolução societária</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">›</span>
                  <span>Arbitramento de perdas e danos</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">›</span>
                  <span>Análise de haveres e partilha</span>
                </li>
              </ul>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3 block">
                Atuação: judicial e extrajudicial
              </span>
              <a
                href={waLink("Olá, gostaria de solicitar uma Perícia Contábil.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-foreground text-background text-xs font-mono uppercase tracking-widest hover:bg-accent transition-colors"
              >
                Solicitar Perícia Contábil
              </a>
            </article>

            <article
              id="pericia-digital"
              className="scroll-mt-32 lg:scroll-mt-20 group bg-background border border-border p-8 hover:border-accent/50 transition-colors duration-500 flex flex-col lg:col-span-2"
            >
              <span className="font-mono text-xs text-accent mb-6 block">
                CASE_TYPE: FORENSIC_DIGITAL
              </span>
              <h3 className="text-2xl font-bold tracking-tight mb-4">
                <Link to="/pericia-digital" className="hover:text-accent transition-colors">
                  Perícia Digital
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Recuperação de dados, análise de metadados e perícia em sistemas de ERP, nuvem e
                blockchain.
              </p>
              <ul className="text-sm text-muted-foreground space-y-3 mb-8 flex-1">
                <li className="flex gap-3">
                  <span className="text-accent">›</span>
                  <span>Forense de dispositivos e mídias</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">›</span>
                  <span>Recuperação e análise de metadados</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">›</span>
                  <span>Perícia em e-mails, mensagens e nuvem</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">›</span>
                  <span>Rastreamento em criptoativos</span>
                </li>
              </ul>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3 block">
                Atuação: judicial e extrajudicial
              </span>
              <a
                href={waLink("Olá, gostaria de solicitar uma Perícia Digital.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-foreground text-background text-xs font-mono uppercase tracking-widest hover:bg-accent transition-colors"
              >
                Solicitar Perícia Digital
              </a>
            </article>

            <article
              id="auditoria"
              className="scroll-mt-32 lg:scroll-mt-20 group bg-background border border-border p-8 hover:border-accent/50 transition-colors duration-500 flex flex-col lg:col-span-2"
            >
              <span className="font-mono text-xs text-accent mb-6 block">CASE_TYPE: AUDIT</span>
              <h3 className="text-2xl font-bold tracking-tight mb-4">
                <Link to="/auditoria" className="hover:text-accent transition-colors">
                  Auditoria Especial
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Auditoria preventiva e investigativa (fraud detection) em fluxos de caixa, estoques
                e processos internos.
              </p>
              <ul className="text-sm text-muted-foreground space-y-3 mb-8 flex-1">
                <li className="flex gap-3">
                  <span className="text-accent">›</span>
                  <span>Auditoria de fraudes e desvios</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">›</span>
                  <span>Due diligence financeira e contábil</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">›</span>
                  <span>Análise de controles internos</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">›</span>
                  <span>Relatórios para conselhos e reguladores</span>
                </li>
              </ul>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3 block">
                Atuação: judicial e extrajudicial
              </span>
              <a
                href={waLink("Olá, gostaria de solicitar uma Auditoria Especial.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-foreground text-background text-xs font-mono uppercase tracking-widest hover:bg-accent transition-colors"
              >
                Solicitar Auditoria
              </a>
            </article>

            <article
              id="pericia-grafotecnica"
              className="scroll-mt-32 lg:scroll-mt-20 group bg-background border border-border p-8 hover:border-accent/50 transition-colors duration-500 flex flex-col lg:col-span-3"
            >
              <span className="font-mono text-xs text-accent mb-6 block">
                CASE_TYPE: HANDWRITING
              </span>
              <h3 className="text-2xl font-bold tracking-tight mb-4">
                <Link to="/pericia-grafotecnica" className="hover:text-accent transition-colors">
                  Perícia Grafotécnica
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-[60ch]">
                Exame de autenticidade de assinaturas e escritas manuscritas, com laudo técnico para
                processo judicial ou para resolver o conflito direto entre as partes.
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 content-start text-sm text-muted-foreground mb-8 flex-1">
                <li className="flex gap-3">
                  <span className="text-accent">›</span>
                  <span>Contestação e reconhecimento de assinaturas</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">›</span>
                  <span>Contratos, cheques, notas promissórias e procurações</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">›</span>
                  <span>Cotejo com documentos de confronto</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">›</span>
                  <span>Parecer para mediação e acordo extrajudicial</span>
                </li>
              </ul>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3 block">
                Atuação: judicial e extrajudicial
              </span>
              <a
                href={waLink("Olá, gostaria de solicitar uma Perícia Grafotécnica.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-foreground text-background text-xs font-mono uppercase tracking-widest hover:bg-accent transition-colors sm:max-w-[340px]"
              >
                Solicitar Perícia Grafotécnica
              </a>
            </article>

            <article
              id="pericia-documental"
              className="scroll-mt-32 lg:scroll-mt-20 group bg-background border border-border p-8 hover:border-accent/50 transition-colors duration-500 flex flex-col md:col-span-2 lg:col-span-3"
            >
              <span className="font-mono text-xs text-accent mb-6 block">CASE_TYPE: DOCUMENTS</span>
              <h3 className="text-2xl font-bold tracking-tight mb-4">
                <Link to="/pericia-documental" className="hover:text-accent transition-colors">
                  Perícia Documental
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-[60ch]">
                Análise da materialidade do documento: rasuras, adulterações e incompatibilidades de
                papel, tinta e impressão, em demandas judiciais ou contratação particular.
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 content-start text-sm text-muted-foreground mb-8 flex-1">
                <li className="flex gap-3">
                  <span className="text-accent">›</span>
                  <span>Detecção de rasuras, supressões e acréscimos</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">›</span>
                  <span>Exame de originais, cópias e documentos antigos</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">›</span>
                  <span>Fraude em contratos, comprovantes e recibos</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">›</span>
                  <span>Laudo para negociação direta ou instrução de ação</span>
                </li>
              </ul>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3 block">
                Atuação: judicial e extrajudicial
              </span>
              <a
                href={waLink("Olá, gostaria de solicitar uma Perícia Documental.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-foreground text-background text-xs font-mono uppercase tracking-widest hover:bg-accent transition-colors sm:max-w-[340px]"
              >
                Solicitar Perícia Documental
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* About / Credibility */}
      <section id="sobre" className="py-24 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-entry">
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest mb-4 block">
              02 — Metodologia
            </span>
            <h2 className="text-4xl font-bold tracking-tighter mb-6">
              Rigor técnico em cada etapa da prova.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Nossa equipe é formada por peritos contadores, auditores e especialistas em forense
              digital certificados nos principais conselhos de classe. Atuamos com cadeia de
              custódia, sigilo absoluto e laudos fundamentados para sustentar decisões judiciais e
              estratégias corporativas.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <span className="block font-mono text-2xl font-bold">1.200+</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Laudos Emitidos
                </span>
              </div>
              <div>
                <span className="block font-mono text-2xl font-bold">15+</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Anos de Experiência
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border animate-entry [animation-delay:200ms]">
            <div className="bg-background p-6">
              <h4 className="text-sm font-semibold mb-2">Cadeia de Custódia</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Preservação da integridade da evidência do início ao fim do processo.
              </p>
            </div>
            <div className="bg-background p-6">
              <h4 className="text-sm font-semibold mb-2">Pareceres Técnicos</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Fundamentação sólida com respaldo doutrinário e jurisprudencial.
              </p>
            </div>
            <div className="bg-background p-6">
              <h4 className="text-sm font-semibold mb-2">Tecnologia Avançada</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Cruzamento de grandes volumes de dados com ferramentas forenses especializadas.
              </p>
            </div>
            <div className="bg-background p-6">
              <h4 className="text-sm font-semibold mb-2">Sigilo Absoluto</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Protocolos de segurança para proteger informações sensíveis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* A fábrica de software agora possui uma página e um formulário próprios. */}
      {SHOW_LEGACY_SOFTWARE_SECTION && (
        <section id="software" className="py-24 px-6 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="animate-entry">
                <span className="font-mono text-[10px] text-accent uppercase tracking-widest mb-4 block">
                  03 — Engenharia de Software
                </span>
                <h2 className="text-4xl font-bold tracking-tighter">
                  Micro soluções de software, sob encomenda.
                </h2>
              </div>
              <p className="max-w-[42ch] text-sm text-muted-foreground animate-entry [animation-delay:100ms]">
                Atuação como fábrica de software enxuta: diagnóstico, protótipo, desenvolvimento e
                manutenção de ferramentas web feitas para um problema específico da sua operação.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 animate-entry [animation-delay:200ms]">
              <article
                id="micro-saas"
                className="bg-background border border-border p-8 hover:border-accent/50 transition-colors duration-500 flex flex-col"
              >
                <span className="font-mono text-xs text-accent mb-6 block">MODULE: MICRO_SAAS</span>
                <h3 className="text-2xl font-bold tracking-tight mb-4">
                  Micro-SaaS &amp; Sistemas Internos
                </h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Ferramentas web sob medida para organizar uma rotina que hoje vive em planilhas.
                </p>
                <ul className="text-sm text-muted-foreground space-y-3 mb-8 flex-1">
                  <li className="flex gap-3">
                    <span className="text-accent">›</span>
                    <span>Controles de estoque, ordens de serviço e agendamentos</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">›</span>
                    <span>Áreas de cliente com documentos e histórico</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">›</span>
                    <span>Rotinas de cálculo, cotação e precificação</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">›</span>
                    <span>Painéis administrativos com níveis de acesso</span>
                  </li>
                </ul>
                <a
                  href="#software-contato"
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-foreground text-background text-xs font-mono uppercase tracking-widest hover:bg-accent transition-colors"
                >
                  Solicitar Proposta
                </a>
              </article>

              <article
                id="automacao"
                className="bg-background border border-border p-8 hover:border-accent/50 transition-colors duration-500 flex flex-col"
              >
                <span className="font-mono text-xs text-accent mb-6 block">MODULE: AUTOMATION</span>
                <h3 className="text-2xl font-bold tracking-tight mb-4">
                  Automação &amp; Integrações
                </h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Robôs e integrações que movem dados entre sistemas sem digitação manual.
                </p>
                <ul className="text-sm text-muted-foreground space-y-3 mb-8 flex-1">
                  <li className="flex gap-3">
                    <span className="text-accent">›</span>
                    <span>Integração de ERPs, CRMs, planilhas e APIs</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">›</span>
                    <span>Leitura de documentos e extração de dados</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">›</span>
                    <span>Rotinas agendadas, alertas e relatórios periódicos</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">›</span>
                    <span>Publicação automática de notas fiscais e arquivos</span>
                  </li>
                </ul>
                <a
                  href="#software-contato"
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-foreground text-background text-xs font-mono uppercase tracking-widest hover:bg-accent transition-colors"
                >
                  Solicitar Proposta
                </a>
              </article>

              <article
                id="web-apps"
                className="bg-background border border-border p-8 hover:border-accent/50 transition-colors duration-500 flex flex-col"
              >
                <span className="font-mono text-xs text-accent mb-6 block">MODULE: WEB_APPS</span>
                <h3 className="text-2xl font-bold tracking-tight mb-4">Web Apps &amp; Portais</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  Sites, portais e aplicações web rápidas, com foco em conversão e usabilidade.
                </p>
                <ul className="text-sm text-muted-foreground space-y-3 mb-8 flex-1">
                  <li className="flex gap-3">
                    <span className="text-accent">›</span>
                    <span>Sites institucionais e landing pages</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">›</span>
                    <span>Formulários e fluxos de captação qualificados</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">›</span>
                    <span>Portais com login, área logada e documentos</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">›</span>
                    <span>Painéis de indicadores e relatórios gerenciais</span>
                  </li>
                </ul>
                <a
                  href="#software-contato"
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-foreground text-background text-xs font-mono uppercase tracking-widest hover:bg-accent transition-colors"
                >
                  Solicitar Proposta
                </a>
              </article>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border mt-6 animate-entry [animation-delay:300ms]">
              <div className="bg-background p-6">
                <span className="font-mono text-[10px] text-accent block mb-3">ETAPA 01</span>
                <h4 className="text-sm font-semibold mb-2">Diagnóstico</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Mapeamento do processo atual, dos dados e de quem vai usar a solução.
                </p>
              </div>
              <div className="bg-background p-6">
                <span className="font-mono text-[10px] text-accent block mb-3">ETAPA 02</span>
                <h4 className="text-sm font-semibold mb-2">Protótipo</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Versão navegável para validar telas e fluxo antes de codar.
                </p>
              </div>
              <div className="bg-background p-6">
                <span className="font-mono text-[10px] text-accent block mb-3">ETAPA 03</span>
                <h4 className="text-sm font-semibold mb-2">Desenvolvimento</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Construção em ciclos curtos, com entregas parciais testáveis.
                </p>
              </div>
              <div className="bg-background p-6">
                <span className="font-mono text-[10px] text-accent block mb-3">ETAPA 04</span>
                <h4 className="text-sm font-semibold mb-2">Sustentação</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ajustes, melhorias e monitoramento após a entrada em uso.
                </p>
              </div>
            </div>

            <div
              id="software-contato"
              className="grid lg:grid-cols-[1fr_460px] gap-16 items-start mt-20 pt-16 border-t border-border"
            >
              <div className="animate-entry">
                <span className="font-mono text-[10px] text-accent uppercase tracking-widest mb-4 block">
                  Briefing de Projeto
                </span>
                <h3 className="text-3xl font-bold tracking-tighter mb-6">
                  Conte o que precisa ser construído.
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  O formulário ao lado abre o WhatsApp com o escopo já redigido. A partir daí
                  alinhamos viabilidade, etapas, prazo e investimento.
                </p>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="text-accent">›</span>
                    <span>Descreva o problema atual e quem vai usar a solução.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">›</span>
                    <span>Informe os sistemas envolvidos: ERPs, planilhas, e-mails, APIs.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent">›</span>
                    <span>Se possível, envie dados de exemplo e o prazo desejado.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-background border border-border p-8 animate-entry [animation-delay:200ms]">
                <SoftwareForm />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contato" className="py-24 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="animate-entry">
              <span className="font-mono text-[10px] text-accent uppercase tracking-widest mb-4 block">
                03 — Contato
              </span>
              <h2 className="text-4xl font-bold tracking-tighter mb-6">
                Solicite uma análise forense.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-10">
                Preencha o formulário ao lado. Você será redirecionado para o WhatsApp com os dados
                do caso, e nossa equipe dará sequência à sua solicitação.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.009-.57-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.751.982.998-3.648-.235-.374a9.86 9.86 0 01-1.53-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                      WhatsApp
                    </span>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:text-accent transition-colors"
                    >
                      +55 92 98168-0207
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                      E-mail
                    </span>
                    <a
                      href="mailto:vertice.pericias@gmail.com"
                      className="font-semibold hover:text-accent transition-colors"
                    >
                      vertice.pericias@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#25D366] text-white font-bold tracking-tight hover:brightness-110 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.009-.57-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.751.982.998-3.648-.235-.374a9.86 9.86 0 01-1.53-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Falar pelo WhatsApp
              </a>
            </div>

            <div className="bg-background border border-border p-8 animate-entry [animation-delay:200ms]">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] text-foreground uppercase tracking-[0.3em] font-bold">
              Vértice Perícia
            </span>
            <span className="text-[10px] text-muted-foreground leading-relaxed max-w-md">
              Vértice Perícia, Consultoria, Auditoria e Tecnologia LTDA
              <br />
              CNPJ 67.807.914/0001-30
            </span>
          </div>
          <div className="flex gap-8 font-mono text-[10px] text-muted-foreground uppercase">
            <Link to="/desenvolvimento" className="hover:text-foreground transition-colors">
              Desenvolvimento
            </Link>
            <Link to="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <a href="#" className="hover:text-foreground transition-colors">
              Termos
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacidade
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              ISO 27001
            </a>
          </div>
        </div>
      </footer>

      <WhatsAppFloatButton />
    </div>
  );
}
