import Link from "next/link";
import type { BlogPost, NotionBlock } from "@/data/notion-types";
import NotionRenderer from "@/components/blog/NotionRenderer";
import { blogPostSummary } from "@/lib/seo";

type BlogPostArticleContentProps = {
  post: Pick<
    BlogPost,
    | "title"
    | "description"
    | "metaDescription"
    | "category"
    | "date"
    | "readingTime"
    | "blocks"
  >;
  codeHtmlMap: Record<number, string>;
  headingIdMap: Record<number, string>;
};

export default function BlogPostArticleContent({
  post,
  codeHtmlMap,
  headingIdMap,
}: BlogPostArticleContentProps) {
  const summary = blogPostSummary(post);

  return (
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
        {summary ? (
          <p className="mb-4 font-mono text-base font-light leading-relaxed text-black/70">
            {summary}
          </p>
        ) : null}
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
  );
}
