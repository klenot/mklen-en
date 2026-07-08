import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { getBlogPostBySlug, getBlogPostMetaBySlug, getAllSlugs } from "@/lib/notion";
import type { NotionBlock } from "@/data/notion-types";
import NotionRenderer from "@/components/blog/NotionRenderer";
import BlogTableOfContents from "@/components/blog/BlogTableOfContents";
import BlogPostSkeleton from "@/components/blog/BlogPostSkeleton";
import BlogPostAnalytics from "@/components/analytics/BlogPostAnalytics";
import { blogPostMetadata, blogPostingJsonLd } from "@/lib/seo";
import { extractBlogHeadings, blogHeadingIdMap } from "@/lib/blog-headings";
import { codeToHtml } from "shiki";
import type { Metadata } from "next";

export const revalidate = 3600;

async function highlightBlocks(blocks: NotionBlock[]): Promise<Record<number, string>> {
  const map: Record<number, string> = {};
  await Promise.all(
    blocks.map(async (block, i) => {
      if (block.type === "code") {
        try {
          map[i] = await codeToHtml(block.text, {
            lang: block.language,
            theme: "github-light",
          });
        } catch {
          // fallback to plain text if language is unsupported
        }
      }
    }),
  );
  return map;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostMetaBySlug(slug);
  if (!post) return {};
  return blogPostMetadata(post);
}

async function BlogPostArticle({ slug }: { slug: string }) {
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const codeHtmlMap = await highlightBlocks(post.blocks);
  const jsonLd = blogPostingJsonLd(post);
  const headings = extractBlogHeadings(post.blocks);
  const headingIdMap = blogHeadingIdMap(headings);

  return (
    <>
      <BlogTableOfContents headings={headings} />
      <BlogPostAnalytics
        slug={post.slug}
        title={post.title}
        category={post.category}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="flex w-full max-w-[640px] flex-col">
        <Link
          href="/blog"
          className="mb-16 self-start font-mono text-[0.8125rem] text-black transition-colors hover:text-blue-600"
        >
          ← blog
        </Link>

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
    </>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="flex min-h-dvh flex-col items-center bg-white px-4 pb-24 pt-16">
      <Suspense fallback={<BlogPostSkeleton />}>
        <BlogPostArticle slug={slug} />
      </Suspense>
    </main>
  );
}
