import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { blogPosts } from "../content/blog";
import { SITE_URL } from "../lib/seo";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/desenvolvimento", changefreq: "monthly", priority: "0.8" },
          { path: "/pericia-contabil", changefreq: "monthly", priority: "0.8" },
          { path: "/auditoria", changefreq: "monthly", priority: "0.8" },
          { path: "/pericia-grafotecnica", changefreq: "monthly", priority: "0.8" },
          { path: "/pericia-documental", changefreq: "monthly", priority: "0.8" },
          { path: "/pericia-digital", changefreq: "monthly", priority: "0.8" },
          { path: "/blog", changefreq: "weekly", priority: "0.8" },
          { path: "/sobre", lastmod: "2026-10-09", changefreq: "yearly", priority: "0.6" },
          {
            path: "/politica-de-privacidade",
            lastmod: "2026-10-09",
            changefreq: "yearly",
            priority: "0.3",
          },
          {
            path: "/termos-de-uso",
            lastmod: "2026-10-09",
            changefreq: "yearly",
            priority: "0.3",
          },
          ...blogPosts.map((post) => ({
            path: `/blog/${post.slug}`,
            lastmod: post.updatedAt,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${SITE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
