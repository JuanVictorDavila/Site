import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { blogPosts } from "../content/blog";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "../lib/seo";

const escapeXml = (value: string) =>
  value.replace(/[<>&"']/g, (character) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      '"': "&quot;",
      "'": "&apos;",
    };
    return entities[character];
  });

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: async () => {
        const lastBuildDate = new Date(
          `${blogPosts.reduce(
            (latest, post) => (post.updatedAt > latest ? post.updatedAt : latest),
            "1970-01-01",
          )}T12:00:00Z`,
        ).toUTCString();

        const items = blogPosts.map((post) => {
          const url = `${SITE_URL}/blog/${post.slug}`;
          return [
            "    <item>",
            `      <title>${escapeXml(post.title)}</title>`,
            `      <link>${url}</link>`,
            `      <guid isPermaLink="true">${url}</guid>`,
            `      <description>${escapeXml(post.description)}</description>`,
            `      <category>${escapeXml(post.category)}</category>`,
            `      <author>${CONTACT_EMAIL} (Equipe Técnica Vértice)</author>`,
            `      <pubDate>${new Date(`${post.publishedAt}T12:00:00Z`).toUTCString()}</pubDate>`,
            "    </item>",
          ].join("\n");
        });

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<rss version="2.0">',
          "  <channel>",
          `    <title>${SITE_NAME} — Conteúdo técnico</title>`,
          `    <link>${SITE_URL}/blog</link>`,
          "    <description>Artigos sobre perícia, auditoria, evidências digitais e tecnologia.</description>",
          "    <language>pt-BR</language>",
          `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
          ...items,
          "  </channel>",
          "</rss>",
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
