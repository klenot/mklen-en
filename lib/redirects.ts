import type { Redirect } from "next/dist/lib/load-custom-routes";
import { legacyRedirects } from "../data/legacy-redirects";

export function buildRedirects(): Redirect[] {
  const rules: Redirect[] = [
    // Apex → www (configure matching domain in Vercel project settings too)
    {
      source: "/:path*",
      has: [{ type: "host", value: "mklenotic.com" }],
      destination: "https://www.mklenotic.com/:path*",
      permanent: true,
    },
  ];

  for (const rule of legacyRedirects) {
    rules.push({
      source: rule.source,
      destination: rule.destination,
      permanent: rule.permanent ?? true,
    });
  }

  return rules;
}
