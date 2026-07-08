import { getPostsFromNotion } from "@/lib/notion";
import { blogIndexToMarkdown } from "@/lib/markdown";
import { markdownResponse } from "@/lib/markdown-response";
import { absoluteUrl } from "@/lib/site";

export async function GET() {
  const posts = await getPostsFromNotion("blog");
  const content = blogIndexToMarkdown(posts, absoluteUrl("/"));
  return markdownResponse(content);
}
