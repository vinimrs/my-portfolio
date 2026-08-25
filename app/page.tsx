import { headers } from "next/headers";
import HomeClient from "./home-client";
import { resolveSiteLocale } from "./i18n";

export default async function Home() {
  const locale = resolveSiteLocale(await headers());

  return <HomeClient locale={locale} />;
}
