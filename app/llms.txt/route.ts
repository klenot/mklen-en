import { getPostsFromNotion } from "@/lib/notion";
import { markdownResponse } from "@/lib/markdown-response";
import { absoluteUrl } from "@/lib/site";

export async function GET() {
  const posts = await getPostsFromNotion("blog");

  const lines = [
    "# mklenotic.com",
    "> Personal portfolio and technical blog of Ing. Marek Klenotič — operations, MarTech, and startup go-to-market execution.",
    "",
    "Machine-readable markdown versions are available by appending `.md` to any page URL.",
    "",
    "## Agent Dossier",
    `- [For Machines Dossier](${absoluteUrl("/for-machines.md")}): Complete professional profile, stack, career history, and endorsements`,
    "",
    "## Site",
    `- [Homepage](${absoluteUrl("/index.html.md")}): Site overview and navigation`,
    `- [Blog index](${absoluteUrl("/blog.md")}): All published blog posts`,
    "",
    "## Blog Posts",
  ];

  for (const post of posts) {
    lines.push(
      `- [${post.title}](${absoluteUrl(`/blog/${post.slug}.md`)}): ${post.description}`,
    );
  }

  lines.push(
    "",
    "## Optional",
    `- [Agent navigation guide](${absoluteUrl("/agents.md")}): How AI agents should navigate this site`,
    `- [Sitemap](${absoluteUrl("/sitemap.xml")}): Full URL index for crawlers`,
  );

  return markdownResponse(lines.join("\n"));
}
