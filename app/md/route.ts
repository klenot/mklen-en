import { markdownResponse } from "@/lib/markdown-response";
import { absoluteUrl, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

export async function GET() {
  const content = [
    `# ${SITE_TITLE}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "## Navigation",
    "",
    `- [Agent dossier](${absoluteUrl("/for-machines.md")}): Full professional profile for AI agents`,
    `- [Blog](${absoluteUrl("/blog.md")}): All published posts`,
    `- [llms.txt](${absoluteUrl("/llms.txt")}): LLM content index`,
    `- [agents.md](${absoluteUrl("/agents.md")}): Agent navigation guide`,
    "",
    "## Contact",
    "",
    "- Email: klenoticmarek@mklenotic.com",
    "- LinkedIn: https://www.linkedin.com/in/klenoticmarek",
    "- Web: https://www.mklenotic.com",
  ].join("\n");

  return markdownResponse(content);
}
