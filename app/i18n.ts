export type SiteLocale = "en" | "pt-BR";

type HeaderReader = {
  get(name: string): string | null;
};

export function resolveSiteLocale(headers: HeaderReader): SiteLocale {
  // English is the portfolio's international default. Portuguese remains
  // available through the explicit language control in the interface.
  void headers;
  return "en";
}
