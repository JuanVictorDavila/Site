import { Link } from "@tanstack/react-router";
import { useState } from "react";

const serviceLinks = [
  ["/pericia-contabil", "Perícia Contábil"],
  ["/auditoria", "Auditoria"],
  ["/pericia-grafotecnica", "Grafotécnica"],
  ["/pericia-documental", "Documental"],
  ["/pericia-digital", "Digital"],
  ["/blog", "Blog"],
] as const;

export function PericialNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      aria-label="Navegação principal"
      className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="whitespace-nowrap font-mono text-sm font-bold uppercase tracking-tighter"
        >
          Vértice Perícia
        </Link>

        <div className="hidden items-center justify-center gap-4 whitespace-nowrap font-mono text-[10px] uppercase tracking-wider text-muted-foreground lg:flex">
          {serviceLinks.map(([to, label]) => (
            <Link
              key={to}
              to={to}
              activeProps={{ className: "text-accent" }}
              className="min-h-11 content-center transition-colors hover:text-accent"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <Link
            to="/desenvolvimento"
            onClick={() => setMobileOpen(false)}
            className="hidden min-h-11 items-center whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent sm:inline-flex"
          >
            Software
          </Link>
          <Link
            to="/contato"
            className="hidden min-h-11 items-center whitespace-nowrap bg-foreground px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-background transition-colors hover:bg-accent xl:inline-flex"
          >
            Solicitar serviço
          </Link>
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex size-11 items-center justify-center border border-border lg:hidden"
          >
            <span className="sr-only">{mobileOpen ? "Fechar menu" : "Abrir menu"}</span>
            <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-px bg-current transition-transform ${mobileOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px bg-current transition-transform ${mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="menu-mobile"
          className="border-t border-border bg-background px-4 py-4 sm:px-6 lg:hidden"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden border border-border bg-border">
            {serviceLinks.map(([to, label]) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                activeProps={{ className: "text-accent" }}
                className="flex min-h-12 items-center bg-background px-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-accent"
              >
                {label}
              </Link>
            ))}
            <Link
              to="/desenvolvimento"
              onClick={() => setMobileOpen(false)}
              className="flex min-h-12 items-center bg-background px-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-accent sm:hidden"
            >
              Software
            </Link>
            <Link
              to="/contato"
              onClick={() => setMobileOpen(false)}
              className="flex min-h-12 items-center bg-foreground px-4 font-mono text-[10px] font-bold uppercase tracking-wider text-background"
            >
              Solicitar serviço
            </Link>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
