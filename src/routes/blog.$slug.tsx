import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { PericialNav } from "../components/pericial-nav";
import { blogPosts, getBlogPost } from "../content/blog";

const BASE_URL = "https://www.verticepericia.net.br";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getBlogPost(params.slug);

    if (!post) {
      throw notFound();
    }

    return post;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.title} | Vértice Perícia` },
      { name: "description", content: loaderData.description },
      { property: "og:title", content: loaderData.title },
      { property: "og:description", content: loaderData.description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${BASE_URL}/blog/${loaderData.slug}` },
      { property: "article:published_time", content: loaderData.publishedAt },
      { property: "article:modified_time", content: loaderData.updatedAt },
      { property: "article:section", content: loaderData.category },
      { name: "robots", content: "index, follow" },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: loaderData.title,
          description: loaderData.description,
          datePublished: loaderData.publishedAt,
          dateModified: loaderData.updatedAt,
          mainEntityOfPage: `${BASE_URL}/blog/${loaderData.slug}`,
          author: {
            "@type": "Organization",
            name: "Equipe Técnica Vértice",
          },
          publisher: {
            "@type": "Organization",
            name: "Vértice Perícia",
            url: BASE_URL,
          },
        },
      },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/blog/${loaderData.slug}` }],
  }),
  component: BlogPostPage,
});

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));

function BlogPostPage() {
  const post = Route.useLoaderData();
  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/10 selection:text-accent">
      <PericialNav />

      <main>
        <header className="border-b border-border px-6 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] mb-9">
              <Link
                to="/blog"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                Blog
              </Link>
              <span className="text-border">/</span>
              <span className="text-accent">{post.category}</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[0.98] text-balance mb-7">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[70ch] mb-9">
              {post.description}
            </p>
            <div className="flex flex-wrap gap-x-7 gap-y-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              <span>Equipe Técnica Vértice</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span>{post.readingTime}</span>
            </div>
          </div>
        </header>

        <div className="px-6 py-14 md:py-20">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-[minmax(0,1fr)_270px] gap-12 lg:gap-16 items-start">
            <article className="min-w-0">
              <p className="text-lg md:text-xl leading-relaxed text-foreground border-l-2 border-accent pl-6 md:pl-8 mb-14">
                {post.introduction}
              </p>

              <div className="space-y-14">
                {post.sections.map((section, index) => (
                  <section key={section.title} aria-labelledby={`section-${index + 1}`}>
                    <div className="flex items-baseline gap-4 mb-6">
                      <span className="font-mono text-[10px] text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2
                        id={`section-${index + 1}`}
                        className="text-2xl md:text-3xl font-extrabold tracking-tight text-balance"
                      >
                        {section.title}
                      </h2>
                    </div>
                    <div className="space-y-5 text-base leading-8 text-muted-foreground">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {section.bullets ? (
                        <ul className="space-y-3 pt-2" role="list">
                          {section.bullets.map((item) => (
                            <li key={item} className="flex gap-3">
                              <span className="text-accent" aria-hidden="true">
                                ›
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-16 border border-border p-6 md:p-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent block mb-3">
                  Importante
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Este artigo tem caráter informativo e não constitui conclusão pericial, parecer
                  jurídico ou orientação aplicável automaticamente a um caso concreto. A análise
                  depende do objeto, dos materiais disponíveis e das limitações identificadas.
                </p>
              </div>
            </article>

            <aside className="lg:sticky lg:top-28 border border-border p-6 md:p-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent block mb-4">
                Serviço relacionado
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Precisa avaliar um caso ou entender quais documentos serão necessários?
              </p>
              <Link
                to={post.relatedService.path}
                className="inline-flex font-mono text-[10px] uppercase tracking-[0.16em] text-foreground hover:text-accent transition-colors"
              >
                {post.relatedService.label} →
              </Link>
            </aside>
          </div>
        </div>

        <section className="border-t border-border px-6 py-14 md:py-18">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                Continue lendo
              </span>
              <span className="h-px bg-border flex-1" />
            </div>
            <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  to="/blog/$slug"
                  params={{ slug: relatedPost.slug }}
                  className="group bg-background p-7 md:p-8"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.17em] text-accent block mb-5">
                    {relatedPost.category}
                  </span>
                  <h2 className="text-xl font-bold tracking-tight mb-4 group-hover:text-accent transition-colors">
                    {relatedPost.title}
                  </h2>
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    Ler artigo →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between gap-5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <span>Vértice Perícia</span>
          <Link to="/blog" className="hover:text-accent transition-colors">
            Ver todos os artigos
          </Link>
        </div>
      </footer>
    </div>
  );
}
