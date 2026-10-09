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

const SITE_UPDATED_AT = "2026-10-09";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", lastmod: SITE_UPDATED_AT, changefreq: "weekly", priority: "1.0" },
          {
            path: "/desenvolvimento",
            lastmod: SITE_UPDATED_AT,
            changefreq: "monthly",
            priority: "0.8",
          },
          {
            path: "/pericia-contabil",
            lastmod: SITE_UPDATED_AT,
            changefreq: "monthly",
            priority: "0.8",
          },
          {
            path: "/auditoria",
            lastmod: SITE_UPDATED_AT,
            changefreq: "monthly",
            priority: "0.8",
          },
          {
            path: "/pericia-grafotecnica",
            lastmod: SITE_UPDATED_AT,
            changefreq: "monthly",
            priority: "0.8",
          },
          {
            path: "/pericia-documental",
            lastmod: SITE_UPDATED_AT,
            changefreq: "monthly",
            priority: "0.8",
          },
          {
            path: "/pericia-digital",
            lastmod: SITE_UPDATED_AT,
            changefreq: "monthly",
            priority: "0.8",
          },
          { path: "/blog", lastmod: SITE_UPDATED_AT, changefreq: "weekly", priority: "0.8" },
          {
            path: "/assinar-rss",
            lastmod: SITE_UPDATED_AT,
            changefreq: "yearly",
            priority: "0.3",
          },
          {
            path: "/contato",
            lastmod: SITE_UPDATED_AT,
            changefreq: "yearly",
            priority: "0.8",
          },
          { path: "/sobre", lastmod: SITE_UPDATED_AT, changefreq: "yearly", priority: "0.6" },
          {
            path: "/politica-de-privacidade",
            lastmod: SITE_UPDATED_AT,
            changefreq: "yearly",
            priority: "0.3",
          },
          {
            path: "/termos-de-uso",
            lastmod: SITE_UPDATED_AT,
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
