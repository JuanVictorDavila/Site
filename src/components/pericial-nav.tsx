import { Link } from "@tanstack/react-router";

const serviceLinks = [
  ["/pericia-contabil", "Perícia Contábil"],
  ["/auditoria", "Auditoria"],
  ["/pericia-grafotecnica", "Grafotécnica"],
  ["/pericia-documental", "Documental"],
  ["/pericia-digital", "Digital"],
] as const;

export function PericialNav() {
  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 grid grid-cols-[auto_1fr_auto] items-center gap-7">
        <Link
          to="/"
          className="font-mono text-sm tracking-tighter font-bold uppercase whitespace-nowrap"
        >
          Vértice Perícia
        </Link>

        <div className="hidden lg:flex items-center justify-start gap-4 text-[10px] font-mono uppercase tracking-wider text-muted-foreground whitespace-nowrap">
          {serviceLinks.map(([to, label]) => (
            <Link
              key={to}
              to={to}
              activeProps={{ className: "text-accent" }}
              className="hover:text-accent transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            to="/desenvolvimento"
            className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors whitespace-nowrap"
          >
            Software
          </Link>
          <Link
            to="/"
            hash="contato"
            className="hidden xl:inline-flex bg-foreground text-background text-[10px] font-mono uppercase tracking-widest px-4 py-2 hover:bg-accent transition-colors whitespace-nowrap"
          >
            Solicitar análise
          </Link>
        </div>
      </div>

      <div className="lg:hidden overflow-x-auto border-t border-border/70">
        <div className="min-w-max px-6 h-11 flex items-center gap-6 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          {serviceLinks.map(([to, label]) => (
            <Link
              key={to}
              to={to}
              activeProps={{ className: "text-accent" }}
              className="hover:text-accent transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
