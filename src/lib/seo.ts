import { IS_PRODUCTION } from "./environment";

export const SITE_URL = "https://verticepericia.net.br";
export const SITE_NAME = "Vértice Perícia";
export const LEGAL_NAME = "Vértice Perícia, Consultoria, Auditoria e Tecnologia LTDA";
export const CONTACT_EMAIL = "vertice.pericias@gmail.com";
export const SOCIAL_IMAGE_URL = `${SITE_URL}/og/vertice-pericia.jpg`;

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

export function seoMeta({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}) {
  const url = absoluteUrl(path);

  return [
    { title },
    { name: "description", content: description },
    {
      name: "robots",
      content: IS_PRODUCTION ? "index, follow" : "noindex, nofollow, noarchive",
    },
    { property: "og:locale", content: "pt_BR" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:image", content: SOCIAL_IMAGE_URL },
    { property: "og:image:secure_url", content: SOCIAL_IMAGE_URL },
    { property: "og:image:type", content: "image/jpeg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    {
      property: "og:image:alt",
      content: "Vértice Perícia — perícia, auditoria e tecnologia",
    },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: SOCIAL_IMAGE_URL },
    {
      name: "twitter:image:alt",
      content: "Vértice Perícia — perícia, auditoria e tecnologia",
    },
  ];
}

export function canonicalLink(path: string) {
  return [{ rel: "canonical", href: absoluteUrl(path) }];
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico.png`,
    email: CONTACT_EMAIL,
    telephone: "+55 92 98168-0207",
    taxID: "67.807.914/0001-30",
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}/#service`,
    name,
    serviceType: name,
    description,
    url,
    provider: { "@id": ORGANIZATION_ID },
  };
}

export function pageHead({
  title,
  description,
  path,
  type = "website",
  schemas = [],
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  schemas?: Array<Record<string, unknown>>;
}) {
  return {
    meta: seoMeta({ title, description, path, type }),
    links: canonicalLink(path),
    scripts: schemas.map((schema) => ({
      type: "application/ld+json",
      children: JSON.stringify(schema),
    })),
  };
}

export function servicePageHead({
  title,
  description,
  path,
  serviceName,
}: {
  title: string;
  description: string;
  path: string;
  serviceName: string;
}) {
  return pageHead({
    title,
    description,
    path,
    schemas: [
      serviceSchema({ name: serviceName, description, path }),
      breadcrumbSchema([
        { name: "Início", path: "/" },
        { name: serviceName, path },
      ]),
    ],
  });
}
