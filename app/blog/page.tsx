import { getPostsFromNotion } from "@/lib/notion";
import BlogPageClient from "./BlogPageClient";

export default async function BlogPage() {
  const posts = await getPostsFromNotion("blog");

  return <BlogPageClient posts={posts} />;
}
