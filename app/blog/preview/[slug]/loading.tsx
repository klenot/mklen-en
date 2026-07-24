import BlogPostSkeleton from "@/components/blog/BlogPostSkeleton";

export default function DraftBlogPreviewLoading() {
  return (
    <main className="flex min-h-dvh flex-col items-center bg-white px-4 pb-24 pt-16">
      <BlogPostSkeleton />
    </main>
  );
}
