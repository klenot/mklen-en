import { getPostsFromNotion } from "@/lib/notion";
import { markdownResponse } from "@/lib/markdown-response";
import { absoluteUrl } from "@/lib/site";

export async function GET() {
  const posts = await getPostsFromNotion("blog");

  const lines = [
    "# mklenotic.com — Agent Navigation Guide",
    "> Personal portfolio and blog of Ing. Marek Klenotič. Prefer markdown endpoints for content consumption.",
    "",
    "## How to navigate",
    "",
    "This site provides clean Markdown versions of all important content. Use these instead of parsing HTML:",
    "",
    `- **Homepage:** ${absoluteUrl("/index.html.md")}`,
    `- **Agent dossier (recommended starting point):** ${absoluteUrl("/for-machines.md")}`,
    `- **Blog index:** ${absoluteUrl("/blog.md")}`,
    `- **Individual posts:** ${absoluteUrl("/blog/{slug}.md")} — append \`.md\` to any blog post URL`,
    "",
    "## Discovery files",
    "",
    `- [llms.txt](${absoluteUrl("/llms.txt")}): Curated content index for LLMs`,
    `- [sitemap.xml](${absoluteUrl("/sitemap.xml")}): Full sitemap for search crawlers`,
    `- [robots.txt](${absoluteUrl("/robots.txt")}): Crawler access rules`,
    "",
    "## Published blog posts",
    "",
  ];

  for (const post of posts) {
    lines.push(`- [${post.title}](${absoluteUrl(`/blog/${post.slug}.md`)})`);
  }

  lines.push(
    "",
    "## Contact",
    "",
    "- Email: klenoticmarek@mklenotic.com",
    "- LinkedIn: https://www.linkedin.com/in/klenoticmarek",
    "- Web: https://www.mklenotic.com",
  );

  return markdownResponse(lines.join("\n"));
}
