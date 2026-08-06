export type SiteLocale = "en" | "pt-BR";

type HeaderReader = {
  get(name: string): string | null;
};

export function resolveSiteLocale(headers: HeaderReader): SiteLocale {
  const country = headers.get("x-vercel-ip-country")?.toUpperCase();
  if (country === "BR") return "pt-BR";

  const preferredLanguage = headers
    .get("accept-language")
    ?.split(",", 1)[0]
    ?.trim()
    .toLowerCase();

  return preferredLanguage === "pt-br" || preferredLanguage?.startsWith("pt-br-")
    ? "pt-BR"
    : "en";
}
