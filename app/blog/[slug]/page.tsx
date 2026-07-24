import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getBlogPostBySlug, getBlogPostMetaBySlug, getAllSlugs } from "@/lib/notion";
import type { NotionBlock } from "@/data/notion-types";
import BlogTableOfContents from "@/components/blog/BlogTableOfContents";
import BlogPostSkeleton from "@/components/blog/BlogPostSkeleton";
import BlogPostArticleContent from "@/components/blog/BlogPostArticleContent";
import BlogPostAnalytics from "@/components/analytics/BlogPostAnalytics";
import { blogPostMetadata, blogPostingJsonLd } from "@/lib/seo";
import { extractBlogHeadings, blogHeadingIdMap } from "@/lib/blog-headings";
import { highlightCodeBlock } from "@/lib/code-highlight";
import type { Metadata } from "next";

// Keep under Notion signed URL TTL (~1h); see lib/notion.ts
export const revalidate = 1800;

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
      <BlogPostArticleContent
        post={post}
        codeHtmlMap={codeHtmlMap}
        headingIdMap={headingIdMap}
      />
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
