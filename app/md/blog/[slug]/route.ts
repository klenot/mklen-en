import { notFound } from "next/navigation";
import { getBlogPostBySlug, getAllSlugs } from "@/lib/notion";
import { blogPostToMarkdown } from "@/lib/markdown";
import { markdownResponse } from "@/lib/markdown-response";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  return markdownResponse(blogPostToMarkdown(post));
}
