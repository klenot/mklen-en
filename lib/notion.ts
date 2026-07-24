import { cache } from "react";
import { unstable_cache } from "next/cache";
import { withRetry } from "@/lib/retry";
import { Client } from "@notionhq/client";
import { APIResponseError } from "@notionhq/client/build/src/errors";
import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import type { Post } from "@/data/types";
import type { BlogPost, NotionBlock, RichText } from "@/data/notion-types";

// Notion file URLs expire after ~1h; keep cache under that so signed covers stay valid.
const REVALIDATE_SECONDS = 1800;

function isNotionConfigured() {
  return Boolean(process.env.NOTION_API_KEY && process.env.NOTION_DATABASE_ID);
}

function getNotionClient() {
  return new Client({ auth: process.env.NOTION_API_KEY });
}

function getDataSourceId() {
  return process.env.NOTION_DATABASE_ID!;
}

async function withNotion<T>(label: string, fallback: T, fn: () => Promise<T>): Promise<T> {
  if (!isNotionConfigured()) {
    console.warn(`[notion] Skipping ${label}: NOTION_API_KEY or NOTION_DATABASE_ID is missing`);
    return fallback;
  }

  try {
    return await fn();
  } catch (error) {
    const message =
      error instanceof APIResponseError
        ? `${error.code}: ${error.message}`
        : error instanceof Error
          ? error.message
          : String(error);

    if (process.env.CI === "true") {
      console.warn(`[notion] Skipping ${label} in CI: ${message}`);
      return fallback;
    }

    console.error(`[notion] Failed ${label}: ${message}`);
    throw error;
  }
}

function extractFormulaString(formula: {
  type: string;
  string?: string | null;
}): string {
  if (formula.type === "string" && formula.string) {
    return formula.string.trim();
  }
  return "";
}

function extractSlugFromProperty(
  prop: PageObjectResponse["properties"][string] | undefined,
): string {
  if (!prop) return "";

  if (prop.type === "rich_text") {
    return richTextToPlain(prop.rich_text).trim();
  }

  if (prop.type === "formula") {
    return extractFormulaString(prop.formula);
  }

  return "";
}

function richTextToPlain(rt: RichTextItemResponse[]): string {
  return rt.map((r) => r.plain_text).join("");
}

function slugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug).trim();
  } catch {
    return slug.trim();
  }
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
    catProp?.type === "rich_text"
      ? richTextToPlain(catProp.rich_text)
      : catProp?.type === "select"
        ? (catProp.select?.name ?? "")
        : "";

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
  const explicitSlug = extractSlugFromProperty(slugProp);
  const slug = explicitSlug || slugFromTitle(title);

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
  const notion = getNotionClient();
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
  const results = await Promise.all(blocks.map((block) => transformBlock(block)));
  return results.filter((block): block is NotionBlock => block !== null);
}

async function queryPublishedPages(
  placement?: "blog" | "project",
): Promise<PageObjectResponse[]> {
  const notion = getNotionClient();
  const placementValue =
    placement === "project" ? "Projects" : placement === "blog" ? "Blog" : undefined;

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
    data_source_id: getDataSourceId(),
    filter: filter as never,
    sorts: [{ property: "date", direction: "descending" }],
  });

  return resp.results as PageObjectResponse[];
}

const getPublishedPagesCached = unstable_cache(
  async (placement: "blog" | "project" | "all") =>
    withNotion("getPublishedPages", [], () =>
      queryPublishedPages(placement === "all" ? undefined : placement),
    ),
  ["notion-published-pages"],
  { revalidate: REVALIDATE_SECONDS, tags: ["notion-posts"] },
);

async function findPublishedPageBySlug(slug: string): Promise<PageObjectResponse | null> {
  const pages = await getPublishedPagesCached("all");
  const targetSlug = normalizeSlug(slug);
  return pages.find((page) => extractPageMeta(page).slug === targetSlug) ?? null;
}

async function queryDraftPageBySlug(slug: string): Promise<PageObjectResponse | null> {
  const notion = getNotionClient();
  const targetSlug = normalizeSlug(slug);
  let cursor: string | undefined;

  do {
    const resp = await notion.dataSources.query({
      data_source_id: getDataSourceId(),
      filter: {
        property: "published",
        select: { equals: "Draft" },
      } as never,
      sorts: [{ property: "date", direction: "descending" }],
      start_cursor: cursor,
      page_size: 100,
    });

    for (const page of resp.results as PageObjectResponse[]) {
      if (extractPageMeta(page).slug === targetSlug) {
        return page;
      }
    }

    cursor = resp.has_more ? (resp.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return null;
}

const getDraftPageBySlug = cache(async (slug: string): Promise<PageObjectResponse | null> => {
  return withNotion("getDraftPageBySlug", null, () => queryDraftPageBySlug(slug));
});

async function fetchPostsFromNotion(
  placement?: "blog" | "project",
): Promise<Post[]> {
  const pages = await getPublishedPagesCached(placement ?? "all");

  return pages.map((page) => {
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
      tag: (meta.placement.toLowerCase() === "projects" ? "project" : "blog") as
        | "blog"
        | "project",
      coverImage: meta.coverImage,
    };
  });
}

const getPostsFromNotionCached = unstable_cache(
  async (placement: "blog" | "project" | "all") =>
    withNotion("getPostsFromNotion", [], () =>
      fetchPostsFromNotion(placement === "all" ? undefined : placement),
    ),
  ["notion-posts-list"],
  { revalidate: REVALIDATE_SECONDS, tags: ["notion-posts"] },
);

export async function getPostsFromNotion(
  placement?: "blog" | "project",
): Promise<Post[]> {
  return getPostsFromNotionCached(placement ?? "all");
}

async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const page = await findPublishedPageBySlug(slug);
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

const getBlogPostBySlugCached = unstable_cache(
  async (slug: string) =>
    withNotion("getBlogPostBySlug", null, () => fetchBlogPostBySlug(slug)),
  ["notion-blog-post"],
  { revalidate: REVALIDATE_SECONDS, tags: ["notion-posts"] },
);

export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  return getBlogPostBySlugCached(slug);
});

export type BlogPostMeta = Pick<
  BlogPost,
  | "slug"
  | "title"
  | "description"
  | "category"
  | "date"
  | "coverImage"
  | "metaTitle"
  | "metaDescription"
>;

async function fetchBlogPostMetaBySlug(slug: string): Promise<BlogPostMeta | null> {
  const page = await findPublishedPageBySlug(slug);
  if (!page) return null;

  const meta = extractPageMeta(page);
  return {
    slug: meta.slug,
    title: meta.title,
    description: meta.description,
    category: meta.category,
    date: meta.date,
    coverImage: meta.coverImage,
    metaTitle: meta.metaTitle,
    metaDescription: meta.metaDescription,
  };
}

const getBlogPostMetaBySlugCached = unstable_cache(
  async (slug: string) =>
    withNotion("getBlogPostMetaBySlug", null, () => fetchBlogPostMetaBySlug(slug)),
  ["notion-blog-post-meta"],
  { revalidate: REVALIDATE_SECONDS, tags: ["notion-posts"] },
);

export const getBlogPostMetaBySlug = cache(
  async (slug: string): Promise<BlogPostMeta | null> => {
    return getBlogPostMetaBySlugCached(slug);
  },
);

async function fetchDraftBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const page = await getDraftPageBySlug(slug);
  if (!page) return null;

  const meta = extractPageMeta(page);
  const rawBlocks = await withRetry(() => fetchBlockChildren(page.id), {
    retries: 2,
    delayMs: 500,
  });
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

export const getDraftBlogPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  return withNotion("getDraftBlogPostBySlug", null, () => fetchDraftBlogPostBySlug(slug));
});

async function fetchDraftBlogPostMetaBySlug(slug: string): Promise<BlogPostMeta | null> {
  const page = await getDraftPageBySlug(slug);
  if (!page) return null;

  const meta = extractPageMeta(page);
  return {
    slug: meta.slug,
    title: meta.title,
    description: meta.description,
    category: meta.category,
    date: meta.date,
    coverImage: meta.coverImage,
    metaTitle: meta.metaTitle,
    metaDescription: meta.metaDescription,
  };
}

export const getDraftBlogPostMetaBySlug = cache(
  async (slug: string): Promise<BlogPostMeta | null> => {
    return withNotion("getDraftBlogPostMetaBySlug", null, () =>
      fetchDraftBlogPostMetaBySlug(slug),
    );
  },
);

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