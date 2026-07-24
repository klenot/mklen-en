import { notFound } from "next/navigation";
import { getDraftBlogPostBySlug } from "@/lib/notion";
import type { NotionBlock } from "@/data/notion-types";
import BlogTableOfContents from "@/components/blog/BlogTableOfContents";
import BlogPostArticleContent from "@/components/blog/BlogPostArticleContent";
import { extractBlogHeadings, blogHeadingIdMap } from "@/lib/blog-headings";
import { highlightCodeBlock } from "@/lib/code-highlight";

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

export default async function DraftBlogPreviewContent({ slug }: { slug: string }) {
  const post = await getDraftBlogPostBySlug(slug);
  if (!post) notFound();

  const codeHtmlMap = await highlightBlocks(post.blocks);
  const headings = extractBlogHeadings(post.blocks);
  const headingIdMap = blogHeadingIdMap(headings);

  return (
    <>
      <BlogTableOfContents headings={headings} />
      <div
        role="status"
        className="mb-8 w-full max-w-[640px] border border-amber-300 bg-amber-50 px-4 py-3 font-mono text-[0.8125rem] text-amber-950"
      >
        Draft preview — not published. Do not share this link publicly.
      </div>
      <BlogPostArticleContent
        post={post}
        codeHtmlMap={codeHtmlMap}
        headingIdMap={headingIdMap}
      />
    </>
  );
}
