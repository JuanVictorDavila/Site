import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
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
        <nav
          aria-label="Links institucionais"
          className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-[10px] text-muted-foreground uppercase"
        >
          <Link to="/sobre" className="hover:text-foreground transition-colors">
            Sobre
          </Link>
          <Link to="/desenvolvimento" className="hover:text-foreground transition-colors">
            Desenvolvimento
          </Link>
          <Link to="/blog" className="hover:text-foreground transition-colors">
            Blog
          </Link>
          <Link to="/termos-de-uso" className="hover:text-foreground transition-colors">
            Termos
          </Link>
          <Link to="/politica-de-privacidade" className="hover:text-foreground transition-colors">
            Privacidade
          </Link>
        </nav>
      </div>
    </footer>
  );
}
