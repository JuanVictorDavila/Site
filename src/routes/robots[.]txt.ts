import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { IS_PRODUCTION } from "../lib/environment";
import { SITE_URL } from "../lib/seo";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const body = IS_PRODUCTION
          ? [`User-agent: *`, `Allow: /`, ``, `Sitemap: ${SITE_URL}/sitemap.xml`, ``].join("\n")
          : [`User-agent: *`, `Disallow: /`, ``].join("\n");

        return new Response(body, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=300",
          },
        });
      },
    },
  },
});
