"use client";

import { useState } from "react";
import Link from "next/link";
import BlogList from "@/components/elements/BlogList";
import { POSTS } from "@/data/posts";
import { EXAMPLE_POST } from "@/data/example-post";
import type { Post } from "@/data/posts";

const ALL_POSTS: Post[] = [
  {
    slug: EXAMPLE_POST.slug,
    icon: EXAMPLE_POST.icon,
    title: EXAMPLE_POST.title,
    description: EXAMPLE_POST.description,
    content: "",
    category: EXAMPLE_POST.category,
    date: EXAMPLE_POST.date,
    tag: "blog",
  },
  ...POSTS.filter((p) => p.tag === "blog"),
];

export default function BlogPage() {
  const [query, setQuery] = useState("");

  const filtered = ALL_POSTS.filter((post) => {
    const q = query.toLowerCase();
    return (
      post.title.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q)
    );
  });

  return (
    <main className="flex min-h-dvh flex-col items-center bg-white px-4 py-16">
      <div className="flex w-full max-w-[640px] flex-col gap-6">
        <Link
          href="/"
          className="self-start text-xs font-light font-mono text-black/60 transition-colors hover:text-blue-500"
        >
          ← back
        </Link>

        <h1 className="text-4xl font-mono font-bold text-black">Blog</h1>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full border-b border-black/15 bg-transparent py-2 font-mono text-sm text-black placeholder:text-black/40 outline-none transition-colors focus:border-black/40"
        />

        <BlogList posts={filtered} />

        {filtered.length === 0 && (
          <p className="text-sm font-light font-mono text-black/40 text-center py-8">
            No posts found for &ldquo;{query}&rdquo;
          </p>
        )}
      </div>
    </main>
  );
}
