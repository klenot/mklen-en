const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mklenotic.com";

export const SITE_NAME = "mklenotic";
export const SITE_TITLE = "Digital operations, MarTech & GTM | Marek Klenotič";
export const SITE_DESCRIPTION =
  "Welcome to my personal portfolio and blog. Need a help with operations, data-driven MarTech, and startup go-to-market execution or just want to navigate the digital space? Let's talk.";

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
