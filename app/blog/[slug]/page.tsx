import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug, getAllSlugs } from "@/lib/notion";
import type { NotionBlock } from "@/data/notion-types";
import NotionRenderer from "@/components/blog/NotionRenderer";
import { codeToHtml } from "shiki";
import type { Metadata } from "next";

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
    })
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
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.metaTitle || `${post.title} — mklen`,
    description: post.metaDescription || post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  const codeHtmlMap = await highlightBlocks(post.blocks);

  return (
    <main className="flex min-h-dvh flex-col items-center bg-white px-4 pt-16 pb-24">
      <article className="flex w-full max-w-[640px] flex-col">
        <Link
          href="/blog"
          className="self-start text-[0.8125rem] font-mono text-black transition-colors hover:text-blue-600 mb-16"
        >
          ← blog
        </Link>

        <header className="mb-16">
          <span className="text-[0.6875rem] font-mono uppercase tracking-wider text-black mb-4 block">
            {post.category}
          </span>
          <h1 className="text-[1.802rem] font-bold font-mono leading-[1.3] tracking-[-0.02em] text-black mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-[0.8125rem] font-mono text-black/70">
            <time>{post.date}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
        </header>

        <NotionRenderer blocks={post.blocks} codeHtmlMap={codeHtmlMap} />

        <Link
          href="/blog"
          className="self-start text-[0.8125rem] font-mono text-black transition-colors hover:text-blue-600 mt-24"
        >
          ← back to all posts
        </Link>
      </article>
    </main>
  );
}
