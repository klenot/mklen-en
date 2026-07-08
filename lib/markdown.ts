import type { NotionBlock, RichText } from "@/data/notion-types";

function richTextToMd(segments: RichText[]): string {
  return segments
    .map((seg) => {
      let text = seg.text;
      if (seg.code) text = `\`${text}\``;
      if (seg.bold && seg.italic) text = `***${text}***`;
      else if (seg.bold) text = `**${text}**`;
      else if (seg.italic) text = `*${text}*`;
      if (seg.strikethrough) text = `~~${text}~~`;
      if (seg.link) text = `[${text}](${seg.link})`;
      return text;
    })
    .join("");
}

function blocksToMd(blocks: NotionBlock[], depth = 0): string {
  const lines: string[] = [];
  const indent = "  ".repeat(depth);

  for (const block of blocks) {
    switch (block.type) {
      case "heading_1":
        lines.push(`# ${richTextToMd(block.text)}`);
        break;
      case "heading_2":
        lines.push(`## ${richTextToMd(block.text)}`);
        break;
      case "heading_3":
        lines.push(`### ${richTextToMd(block.text)}`);
        break;
      case "paragraph":
        lines.push(richTextToMd(block.text));
        break;
      case "bulleted_list_item": {
        lines.push(`${indent}- ${richTextToMd(block.text)}`);
        if (block.children?.length) {
          lines.push(blocksToMd(block.children, depth + 1));
        }
        break;
      }
      case "numbered_list_item": {
        lines.push(`${indent}1. ${richTextToMd(block.text)}`);
        if (block.children?.length) {
          lines.push(blocksToMd(block.children, depth + 1));
        }
        break;
      }
      case "to_do":
        lines.push(`- [${block.checked ? "x" : " "}] ${richTextToMd(block.text)}`);
        break;
      case "toggle": {
        lines.push(`<details><summary>${richTextToMd(block.text)}</summary>\n\n`);
        if (block.children.length) {
          lines.push(blocksToMd(block.children));
        }
        lines.push("</details>");
        break;
      }
      case "quote":
        lines.push(`> ${richTextToMd(block.text)}`);
        break;
      case "callout":
        lines.push(`> ${block.icon} ${richTextToMd(block.text)}`);
        break;
      case "divider":
        lines.push("---");
        break;
      case "code": {
        lines.push(`\`\`\`${block.language}\n${block.text}\n\`\`\``);
        if (block.caption) lines.push(`*${block.caption}*`);
        break;
      }
      case "image": {
        const alt = block.caption ?? "image";
        lines.push(`![${alt}](${block.url})`);
        break;
      }
      case "bookmark":
        lines.push(
          block.caption
            ? `[${block.caption}](${block.url})`
            : `[${block.url}](${block.url})`,
        );
        break;
      case "table": {
        if (block.rows.length === 0) break;
        const [header, ...body] = block.rows;
        lines.push(`| ${header.join(" | ")} |`);
        lines.push(`| ${header.map(() => "---").join(" | ")} |`);
        for (const row of body) {
          lines.push(`| ${row.join(" | ")} |`);
        }
        break;
      }
      case "equation":
        lines.push(`$$${block.expression}$$`);
        break;
    }
    lines.push("");
  }

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export function blogPostToMarkdown(post: {
  title: string;
  description: string;
  category: string;
  date: string;
  readingTime: string;
  blocks: NotionBlock[];
}): string {
  const header = [
    `# ${post.title}`,
    "",
    `> ${post.description}`,
    "",
    `**Category:** ${post.category} | **Date:** ${post.date} | **Reading time:** ${post.readingTime}`,
    "",
    "---",
    "",
  ].join("\n");

  return `${header}${blocksToMd(post.blocks)}`;
}

export function blogIndexToMarkdown(
  posts: Array<{ title: string; description: string; slug: string; date: string; category: string }>,
  siteUrl: string,
): string {
  const lines = [
    "# Blog — mklenotic",
    "",
    "> Technical writing on operations, MarTech, and startup execution.",
    "",
    "## Posts",
    "",
  ];

  for (const post of posts) {
    lines.push(
      `- [${post.title}](${siteUrl}/blog/${post.slug}.md): ${post.description} (${post.date}, ${post.category})`,
    );
  }

  return lines.join("\n");
}
