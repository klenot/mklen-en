import type { Metadata } from "next";
import { getPostsFromNotion } from "@/lib/notion";
import { absoluteUrl } from "@/lib/site";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical writing on operations, MarTech infrastructure, and startup go-to-market execution.",
  alternates: {
    canonical: absoluteUrl("/blog"),
    types: {
      "text/markdown": absoluteUrl("/blog.md"),
    },
  },
  openGraph: {
    title: "Blog — mklenotic",
    description:
      "Technical writing on operations, MarTech infrastructure, and startup go-to-market execution.",
    url: absoluteUrl("/blog"),
  },
};

export default async function BlogPage() {
  const posts = await getPostsFromNotion("blog");

  return <BlogPageClient posts={posts} />;
}
