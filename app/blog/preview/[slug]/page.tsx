import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getDraftBlogPostBySlug, getDraftBlogPostMetaBySlug } from "@/lib/notion";
import type { NotionBlock } from "@/data/notion-types";
import NotionRenderer from "@/components/blog/NotionRenderer";
import BlogTableOfContents from "@/components/blog/BlogTableOfContents";
import { draftBlogPostMetadata } from "@/lib/seo";
import { extractBlogHeadings, blogHeadingIdMap } from "@/lib/blog-headings";
import { highlightCodeBlock } from "@/lib/code-highlight";
import { isValidDraftPreviewToken } from "@/lib/draft-preview";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const maxDuration = 60;

async function highlightBlocks(blocks: NotionBlock[]): Promise<Record<number, string>> {
  const map: Record<number, string> = {};
  await Promise.all(
    blocks.map(async (block, i) => {
      if (block.type === "code") {
        map[i] = await highlightCodeBlock(block.text, block.language);
      }
    }),
  );
  return map;
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { token } = await searchParams;

  if (!isValidDraftPreviewToken(token)) return {};

  const post = await getDraftBlogPostMetaBySlug(slug);
  if (!post) return {};

  return draftBlogPostMetadata(post);
}

export default async function DraftBlogPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { slug } = await params;
  const { token } = await searchParams;

  if (!isValidDraftPreviewToken(token)) notFound();

  const post = await getDraftBlogPostBySlug(slug);
  if (!post) notFound();

  const codeHtmlMap = await highlightBlocks(post.blocks);
  const headings = extractBlogHeadings(post.blocks);
  const headingIdMap = blogHeadingIdMap(headings);

  return (
    <main className="flex min-h-dvh flex-col items-center bg-white px-4 pb-24 pt-16">
      <BlogTableOfContents headings={headings} />
      <div
        role="status"
        className="mb-8 w-full max-w-[640px] border border-amber-300 bg-amber-50 px-4 py-3 font-mono text-[0.8125rem] text-amber-950"
      >
        Draft preview — not published. Do not share this link publicly.
      </div>
      <article className="flex w-full max-w-[640px] flex-col">
        <nav
          aria-label="Blog post navigation"
          className="mb-16 self-start font-mono text-[0.8125rem] text-black"
        >
          <Link href="/blog" className="transition-colors hover:text-blue-600">
            ← blog
          </Link>
          <span className="text-black/40"> / </span>
          <Link href="/" className="transition-colors hover:text-blue-600">
            home
          </Link>
        </nav>

        <header className="mb-16">
          <span className="mb-4 block font-mono text-[0.6875rem] uppercase tracking-wider text-black">
            {post.category}
          </span>
          <h1 className="mb-4 font-mono text-[1.802rem] font-bold leading-[1.3] tracking-[-0.02em] text-black">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 font-mono text-[0.8125rem] text-black/70">
            <time>{post.date}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
        </header>

        <NotionRenderer
          blocks={post.blocks}
          codeHtmlMap={codeHtmlMap}
          headingIdMap={headingIdMap}
        />

        <Link
          href="/blog"
          className="mt-24 self-start font-mono text-[0.8125rem] text-black transition-colors hover:text-blue-600"
        >
          ← back to all posts
        </Link>
      </article>
    </main>
  );
}
