import Link from "next/link";
import BlogList from "@/components/elements/BlogList";
import { getPostsFromNotion } from "@/lib/notion";

export default async function Blog() {
  const posts = await getPostsFromNotion("blog");

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="flex w-full justify-center py-16 shrink-0">
      <div className="flex flex-col items-center w-full max-w-[1200px] px-4">
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-4xl font-mono font-bold text-black mb-4">Blog</h2>

          <BlogList posts={posts.slice(0, 6)} />

          <Link
            href="/blog"
            className="mt-12 self-end pr-4 text-xs font-light font-mono text-black/60 transition-colors hover:text-blue-500"
          >
            see all
          </Link>
        </div>
      </div>
    </section>
  );
}
