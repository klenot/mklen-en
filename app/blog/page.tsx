import type { Metadata } from "next";
import { Suspense } from "react";
import { getPostsFromNotion } from "@/lib/notion";
import { absoluteUrl } from "@/lib/site";
import BlogIndexSkeleton from "@/components/blog/BlogIndexSkeleton";
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

// Keep under Notion signed URL TTL (~1h); see lib/notion.ts
export const revalidate = 1800;

async function BlogPosts() {
  const posts = await getPostsFromNotion("blog");
  return <BlogPageClient posts={posts} />;
}

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogIndexSkeleton />}>
      <BlogPosts />
    </Suspense>
  );
}
