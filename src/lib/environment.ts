export type SiteEnvironment = "production" | "staging" | "preview" | "local";

const configuredEnvironment = import.meta.env.VITE_SITE_ENV?.trim().toLowerCase();

export const SITE_ENVIRONMENT: SiteEnvironment =
  configuredEnvironment === "production" ||
  configuredEnvironment === "staging" ||
  configuredEnvironment === "preview"
    ? configuredEnvironment
    : "local";

export const IS_PRODUCTION = SITE_ENVIRONMENT === "production";
