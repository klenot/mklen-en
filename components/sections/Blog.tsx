import BlogList from "@/components/elements/BlogList";

export default function Blog() {
  return (
    <section id="blog" className="flex justify-center py-16 shrink-0">
      <div className="flex flex-col items-center w-full max-w-[1200px] px-4">
        {/* wrapper hugs the list; heading, list and CTA all share its width */}
        <div className="inline-flex flex-col gap-4 w-full max-w-[640px]">
          <h2 className="text-2xl font-mono font-bold text-black">Blog</h2>

          <BlogList />

          <a
            href="/blog"
            className="mt-12 self-end text-xs font-light font-mono text-black/60 transition-colors hover:text-blue-500"
          >
            see all
          </a>
        </div>
      </div>
    </section>
  );
}
