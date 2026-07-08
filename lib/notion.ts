import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import type { Post } from "@/data/types";
import type { BlogPost, NotionBlock, RichText } from "@/data/notion-types";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATA_SOURCE_ID = process.env.NOTION_DATABASE_ID!;

function richTextToPlain(rt: RichTextItemResponse[]): string {
  return rt.map((r) => r.plain_text).join("");
}

function transformRichText(rt: RichTextItemResponse[]): RichText[] {
  return rt.map((r) => {
    const segment: RichText = { text: r.plain_text };
    if (r.annotations.bold) segment.bold = true;
    if (r.annotations.italic) segment.italic = true;
    if (r.annotations.strikethrough) segment.strikethrough = true;
    if (r.annotations.underline) segment.underline = true;
    if (r.annotations.code) segment.code = true;
    if (r.type === "text" && r.text.link) segment.link = r.text.link.url;
    return segment;
  });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function estimateReadingTime(blocks: NotionBlock[]): string {
  let words = 0;
  for (const block of blocks) {
    if ("text" in block && Array.isArray(block.text)) {
      words += (block.text as RichText[]).reduce(
        (sum, seg) => sum + seg.text.split(/\s+/).length,
        0,
      );
    }
  }
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

function getFileUrl(prop: { type: string } & Record<string, unknown>): string | undefined {
  if (prop.type === "files") {
    const files = prop.files as Array<{
      type: string;
      file?: { url: string };
      external?: { url: string };
    }>;
    if (files.length === 0) return undefined;
    const f = files[0];
    return f.type === "file" ? f.file?.url : f.external?.url;
  }
  return undefined;
}

function extractPageMeta(page: PageObjectResponse) {
  const props = page.properties;

  const titleProp = props["title"] ?? props["Title"] ?? props["Name"];
  const title =
    titleProp?.type === "title" ? richTextToPlain(titleProp.title) : "Untitled";

  const descProp = props["description"] ?? props["Description"];
  const description =
    descProp?.type === "rich_text" ? richTextToPlain(descProp.rich_text) : "";

  const catProp = props["category"] ?? props["Category"];
  const category =
    catProp?.type === "select" ? (catProp.select?.name ?? "") : "";

  const publishedProp = props["published"] ?? props["Published"];
  const published =
    publishedProp?.type === "select"
      ? (publishedProp.select?.name ?? "")
      : "";

  const placementProp = props["placement"] ?? props["Placement"];
  const placement =
    placementProp?.type === "select"
      ? (placementProp.select?.name ?? "")
      : "";

  const dateProp = props["date"] ?? props["Date"];
  const date =
    dateProp?.type === "date" && dateProp.date?.start
      ? formatDate(dateProp.date.start)
      : formatDate(page.created_time);

  const metaTitleProp = props["meta title"] ?? props["Meta title"] ?? props["Meta Title"];
  const metaTitle =
    metaTitleProp?.type === "rich_text"
      ? richTextToPlain(metaTitleProp.rich_text)
      : undefined;

  const metaDescProp =
    props["meta description"] ?? props["Meta description"] ?? props["Meta Description"];
  const metaDescription =
    metaDescProp?.type === "rich_text"
      ? richTextToPlain(metaDescProp.rich_text)
      : undefined;

  const coverImageProp = props["cover image"] ?? props["Cover image"] ?? props["Cover Image"];
  const coverImage = coverImageProp ? getFileUrl(coverImageProp as never) : undefined;

  const slugProp = props["slug"] ?? props["Slug"];
  const explicitSlug =
    slugProp?.type === "rich_text" ? richTextToPlain(slugProp.rich_text).trim() : "";
  const slug =
    explicitSlug ||
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const updatedAt =
    dateProp?.type === "date" && dateProp.date?.start
      ? dateProp.date.start
      : page.last_edited_time;

  const iconRaw = page.icon;
  const icon = iconRaw?.type === "emoji" ? iconRaw.emoji : "📝";

  return {
    title,
    description,
    category,
    published,
    placement,
    date,
    slug,
    icon,
    metaTitle,
    metaDescription,
    coverImage,
    updatedAt,
  };
}

async function fetchBlockChildren(blockId: string): Promise<BlockObjectResponse[]> {
  const blocks: BlockObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const resp = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });
    for (const b of resp.results) {
      if ("type" in b) blocks.push(b as BlockObjectResponse);
    }
    cursor = resp.has_more ? (resp.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return blocks;
}

async function transformBlock(block: BlockObjectResponse): Promise<NotionBlock | null> {
  switch (block.type) {
    case "heading_1":
      return { type: "heading_1", text: transformRichText(block.heading_1.rich_text) };
    case "heading_2":
      return { type: "heading_2", text: transformRichText(block.heading_2.rich_text) };
    case "heading_3":
      return { type: "heading_3", text: transformRichText(block.heading_3.rich_text) };
    case "paragraph":
      return { type: "paragraph", text: transformRichText(block.paragraph.rich_text) };
    case "bulleted_list_item": {
      const children = block.has_children
        ? await transformBlocks(await fetchBlockChildren(block.id))
        : undefined;
      return {
        type: "bulleted_list_item",
        text: transformRichText(block.bulleted_list_item.rich_text),
        ...(children && children.length > 0 ? { children } : {}),
      };
    }
    case "numbered_list_item": {
      const children = block.has_children
        ? await transformBlocks(await fetchBlockChildren(block.id))
        : undefined;
      return {
        type: "numbered_list_item",
        text: transformRichText(block.numbered_list_item.rich_text),
        ...(children && children.length > 0 ? { children } : {}),
      };
    }
    case "to_do":
      return {
        type: "to_do",
        text: transformRichText(block.to_do.rich_text),
        checked: block.to_do.checked,
      };
    case "toggle": {
      const children = block.has_children
        ? await transformBlocks(await fetchBlockChildren(block.id))
        : [];
      return {
        type: "toggle",
        text: transformRichText(block.toggle.rich_text),
        children,
      };
    }
    case "quote":
      return { type: "quote", text: transformRichText(block.quote.rich_text) };
    case "callout":
      return {
        type: "callout",
        text: transformRichText(block.callout.rich_text),
        icon: block.callout.icon?.type === "emoji" ? block.callout.icon.emoji : "💡",
      };
    case "divider":
      return { type: "divider" };
    case "code":
      return {
        type: "code",
        text: richTextToPlain(block.code.rich_text),
        language: block.code.language.replace(/ /g, ""),
        ...(block.code.caption.length > 0
          ? { caption: richTextToPlain(block.code.caption) }
          : {}),
      };
    case "image": {
      const url =
        block.image.type === "external"
          ? block.image.external.url
          : block.image.file.url;
      const caption =
        block.image.caption.length > 0
          ? richTextToPlain(block.image.caption)
          : undefined;
      return { type: "image", url, caption };
    }
    case "bookmark":
      return {
        type: "bookmark",
        url: block.bookmark.url,
        ...(block.bookmark.caption.length > 0
          ? { caption: richTextToPlain(block.bookmark.caption) }
          : {}),
      };
    case "table": {
      if (!block.has_children) return { type: "table", rows: [] };
      const rowBlocks = await fetchBlockChildren(block.id);
      const rows = rowBlocks
        .filter((r) => r.type === "table_row")
        .map((r) =>
          (r as unknown as { table_row: { cells: RichTextItemResponse[][] } }).table_row.cells.map(
            (cell) => richTextToPlain(cell),
          ),
        );
      return { type: "table", rows };
    }
    case "equation":
      return { type: "equation", expression: block.equation.expression };
    default:
      return null;
  }
}

async function transformBlocks(blocks: BlockObjectResponse[]): Promise<NotionBlock[]> {
  const results: NotionBlock[] = [];
  for (const block of blocks) {
    const transformed = await transformBlock(block);
    if (transformed) results.push(transformed);
  }
  return results;
}

export async function getPostsFromNotion(
  placement?: "blog" | "project",
): Promise<Post[]> {
  const placementValue = placement === "project" ? "Projects" : placement === "blog" ? "Blog" : undefined;

  const filter: Record<string, unknown> = {
    and: [
      {
        property: "published",
        select: { equals: "Published" },
      },
      ...(placementValue
        ? [{ property: "placement", select: { equals: placementValue } }]
        : []),
    ],
  };

  const resp = await notion.dataSources.query({
    data_source_id: DATA_SOURCE_ID,
    filter: filter as never,
    sorts: [{ property: "date", direction: "descending" }],
  });

  return (resp.results as PageObjectResponse[]).map((page) => {
    const meta = extractPageMeta(page);
    return {
      slug: meta.slug,
      icon: meta.icon,
      title: meta.title,
      description: meta.description,
      content: meta.description,
      category: meta.category,
      date: meta.date,
      updatedAt: meta.updatedAt,
      tag: (meta.placement.toLowerCase() === "projects" ? "project" : "blog") as "blog" | "project",
      coverImage: meta.coverImage,
    };
  });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const resp = await notion.dataSources.query({
    data_source_id: DATA_SOURCE_ID,
    filter: {
      property: "published",
      select: { equals: "Published" },
    },
    sorts: [{ property: "date", direction: "descending" }],
  });

  const page = (resp.results as PageObjectResponse[]).find((p) => {
    const meta = extractPageMeta(p);
    return meta.slug === slug;
  });

  if (!page) return null;

  const meta = extractPageMeta(page);
  const rawBlocks = await fetchBlockChildren(page.id);
  const blocks = await transformBlocks(rawBlocks);

  return {
    slug: meta.slug,
    icon: meta.icon,
    title: meta.title,
    description: meta.description,
    category: meta.category,
    date: meta.date,
    readingTime: estimateReadingTime(blocks),
    coverImage: meta.coverImage,
    metaTitle: meta.metaTitle,
    metaDescription: meta.metaDescription,
    blocks,
  };
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getPostsFromNotion();
  return posts.map((p) => p.slug);
}

export type SitemapEntry = {
  slug: string;
  updatedAt: string;
  tag: "blog" | "project";
};

export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  const posts = await getPostsFromNotion();
  return posts.map((p) => ({
    slug: p.slug,
    updatedAt: p.updatedAt ?? new Date().toISOString(),
    tag: p.tag,
  }));
}
