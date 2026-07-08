import type { NotionBlock, RichText } from "@/data/notion-types";

export type BlogHeading = {
  id: string;
  text: string;
  level: 1 | 2 | 3;
  blockIndex: number;
};

function richTextToPlain(segments: RichText[]): string {
  return segments.map((s) => s.text).join("");
}

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60) || "section"
  );
}

function headingLevel(
  type: "heading_1" | "heading_2" | "heading_3",
): 1 | 2 | 3 {
  if (type === "heading_1") return 1;
  if (type === "heading_2") return 2;
  return 3;
}

export function extractBlogHeadings(blocks: NotionBlock[]): BlogHeading[] {
  const headings: BlogHeading[] = [];
  const usedIds = new Map<string, number>();

  blocks.forEach((block, blockIndex) => {
    if (
      block.type !== "heading_1" &&
      block.type !== "heading_2" &&
      block.type !== "heading_3"
    ) {
      return;
    }

    const text = richTextToPlain(block.text).trim();
    if (!text) return;

    const base = slugify(text);
    const count = usedIds.get(base) ?? 0;
    usedIds.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count + 1}`;

    headings.push({
      id,
      text,
      level: headingLevel(block.type),
      blockIndex,
    });
  });

  return headings;
}

export function blogHeadingIdMap(
  headings: BlogHeading[],
): Record<number, string> {
  return Object.fromEntries(headings.map((h) => [h.blockIndex, h.id]));
}
