// Align with Notion data cache (lib/notion.ts) so signed URLs in markdown don't outlive CDN TTL.
export function markdownResponse(content: string, revalidate = 1800): Response {
  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": `public, max-age=${revalidate}, s-maxage=${revalidate}`,
    },
  });
}
