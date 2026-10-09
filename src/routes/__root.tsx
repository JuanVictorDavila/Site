import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Analytics } from "../components/analytics";
import { CookieConsent } from "../components/cookie-consent";
import { PericialNav } from "../components/pericial-nav";
import { SiteFooter } from "../components/site-footer";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PericialNav />
      <main id="conteudo-principal" tabIndex={-1} className="px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div
            aria-hidden="true"
            className="font-mono text-[clamp(7rem,25vw,16rem)] font-bold leading-none text-accent/15"
          >
            404
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
              Endereço não localizado
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tighter md:text-6xl">
              Esta página não está disponível.
            </h1>
            <p className="mt-6 max-w-[58ch] leading-relaxed text-muted-foreground">
              O endereço pode ter sido digitado incorretamente ou o conteúdo pode ter mudado. Use um
              dos caminhos abaixo para continuar.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex min-h-11 items-center bg-foreground px-5 py-3 text-xs font-bold text-background hover:bg-accent"
              >
                Voltar ao início
              </Link>
              <Link
                to="/blog"
                className="inline-flex min-h-11 items-center border border-border px-5 py-3 text-xs font-bold hover:border-accent"
              >
                Consultar o blog
              </Link>
              <Link
                to="/contato"
                className="inline-flex min-h-11 items-center border border-border px-5 py-3 text-xs font-bold hover:border-accent"
              >
                Falar com a Vértice
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Não foi possível carregar esta página
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ocorreu um erro inesperado. Tente novamente ou volte ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Voltar ao início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Vértice Perícia" },
      { name: "theme-color", content: "#f8fafc" },
      { name: "color-scheme", content: "light" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico.png", type: "image/png" },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "Vértice Perícia — Conteúdo técnico",
        href: "/rss.xml",
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        <a href="#conteudo-principal" className="skip-link">
          Ir para o conteúdo principal
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Analytics />
      <CookieConsent />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
