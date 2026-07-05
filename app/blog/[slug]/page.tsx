import { notFound } from "next/navigation";
import Link from "next/link";
import { POSTS } from "@/data/posts";
import { EXAMPLE_POST } from "@/data/example-post";
import type { BlogPost, NotionBlock } from "@/data/notion-types";
import NotionRenderer from "@/components/blog/NotionRenderer";
import { codeToHtml } from "shiki";
import type { Metadata } from "next";

const BLOG_POSTS: BlogPost[] = [EXAMPLE_POST];

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

function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function generateStaticParams() {
  return [
    ...POSTS.map((post) => ({ slug: post.slug })),
    ...BLOG_POSTS.map((post) => ({ slug: post.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug) || POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — mklen`,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const richPost = getPost(slug);

  if (richPost) {
    const codeHtmlMap = await highlightBlocks(richPost.blocks);

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
              {richPost.category}
            </span>
            <h1 className="text-[1.802rem] font-bold font-mono leading-[1.3] tracking-[-0.02em] text-black mb-4">
              {richPost.title}
            </h1>
            <div className="flex items-center gap-2 text-[0.8125rem] font-mono text-black/70">
              <time>{richPost.date}</time>
              <span>·</span>
              <span>{richPost.readingTime}</span>
            </div>
          </header>

          <NotionRenderer blocks={richPost.blocks} codeHtmlMap={codeHtmlMap} />

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

  const legacyPost = POSTS.find((p) => p.slug === slug);
  if (!legacyPost) notFound();

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
            {legacyPost.category}
          </span>
          <h1 className="text-[1.802rem] font-bold font-mono leading-[1.3] tracking-[-0.02em] text-black mb-4">
            {legacyPost.title}
          </h1>
          <div className="flex items-center gap-2 text-[0.8125rem] font-mono text-black/70">
            <time>{legacyPost.date}</time>
          </div>
        </header>

        <div className="blog-content">
          {legacyPost.content.split("\n\n").map((paragraph, i) => (
            <p key={i} className="blog-paragraph">
              {paragraph}
            </p>
          ))}
        </div>

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
