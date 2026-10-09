import { createFileRoute, Link } from "@tanstack/react-router";

import { PericialNav } from "../components/pericial-nav";
import { SiteFooter } from "../components/site-footer";
import { blogPosts } from "../content/blog";
import { ORGANIZATION_ID, SITE_URL, breadcrumbSchema, pageHead } from "../lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () =>
    pageHead({
      title: "Blog sobre Perícia, Auditoria e Tecnologia | Vértice",
      description:
        "Artigos técnicos sobre perícia contábil, auditoria, documentoscopia, grafotécnica, evidências digitais e tecnologia.",
      path: "/blog",
      schemas: [
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Blog Vértice Perícia",
          description:
            "Conteúdo técnico sobre perícia, auditoria, evidências digitais e tecnologia.",
          url: `${SITE_URL}/blog`,
          publisher: { "@id": ORGANIZATION_ID },
        },
        breadcrumbSchema([
          { name: "Início", path: "/" },
          { name: "Blog", path: "/blog" },
        ]),
      ],
    }),
  component: BlogPage,
});

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));

function BlogPage() {
  const [featuredPost, ...otherPosts] = blogPosts;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/10 selection:text-accent">
      <PericialNav />

      <main id="conteudo-principal" tabIndex={-1}>
        <header className="relative overflow-hidden border-b border-border px-6 py-20 md:py-28">
          <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1fr_360px] gap-12 items-end">
            <div>
              <span className="inline-block font-mono text-[10px] text-accent uppercase tracking-[0.25em] border border-accent/20 px-3 py-2 mb-7">
                Vértice · Conteúdo técnico
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.94] text-balance mb-7">
                Informação para decisões mais{" "}
                <span className="text-accent">bem fundamentadas.</span>
              </h1>
              <p className="max-w-[65ch] text-lg text-muted-foreground leading-relaxed">
                Artigos sobre perícia, auditoria, preservação de evidências e tecnologia, escritos
                para explicar conceitos técnicos com clareza e responsabilidade.
              </p>
            </div>
            <div className="border-l border-border pl-6 py-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent block mb-3">
                Nota editorial
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">
                O conteúdo é informativo. Cada caso exige avaliação própria do objeto, dos
                documentos disponíveis e das limitações técnicas.
              </p>
            </div>
          </div>
        </header>

        {featuredPost ? (
          <section className="px-6 py-16 md:py-20 border-b border-border">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-7">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                  Em destaque
                </span>
                <span className="h-px bg-border flex-1" />
              </div>
              <Link
                to="/blog/$slug"
                params={{ slug: featuredPost.slug }}
                className="group grid lg:grid-cols-[0.75fr_1.25fr] border border-border hover:border-accent/50 transition-colors"
              >
                <div className="min-h-64 lg:min-h-96 bg-foreground text-background p-8 md:p-12 flex flex-col justify-between overflow-hidden relative">
                  <div className="absolute -right-10 -bottom-16 text-[14rem] leading-none font-extrabold text-background/5 select-none">
                    01
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-background/60">
                    {featuredPost.category}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-background/60">
                    {formatDate(featuredPost.publishedAt)} · {featuredPost.readingTime}
                  </span>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-balance mb-6 group-hover:text-accent transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed max-w-[62ch] mb-8">
                    {featuredPost.description}
                  </p>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    Ler artigo →
                  </span>
                </div>
              </Link>
            </div>
          </section>
        ) : null}

        <section className="px-6 py-16 md:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between gap-8 mb-10">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent block mb-3">
                  Biblioteca
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  Artigos recentes
                </h2>
              </div>
              <span className="hidden md:block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {blogPosts.length.toString().padStart(2, "0")} publicações
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
              {otherPosts.map((post, index) => (
                <Link
                  key={post.slug}
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group bg-background p-8 md:p-10 min-h-80 flex flex-col"
                >
                  <div className="flex justify-between gap-5 mb-12 font-mono text-[10px] uppercase tracking-[0.18em]">
                    <span className="text-accent">{post.category}</span>
                    <span className="text-muted-foreground">
                      {String(index + 2).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-balance mb-5 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                    {post.description}
                  </p>
                  <div className="mt-auto flex justify-between gap-5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    <span className="group-hover:text-accent transition-colors">Ler →</span>
                  </div>
                </Link>
              ))}
            </div>
            <a
              href="/rss.xml"
              className="mt-8 inline-flex min-h-11 items-center border border-border px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:border-accent hover:text-accent"
            >
              Assinar atualizações por RSS
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
