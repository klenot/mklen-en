export default function BlogPostSkeleton() {
  return (
    <article
      aria-busy="true"
      aria-label="Loading blog post"
      className="flex w-full max-w-[640px] flex-col"
    >
      <p className="mb-10 font-mono text-[0.8125rem] text-black/50">Loading post…</p>
      <div className="animate-pulse">
        <div className="mb-16 h-4 w-24 rounded bg-black/15" />
        <div className="mb-16 space-y-4">
          <div className="h-3 w-24 rounded bg-black/15" />
          <div className="h-10 w-full max-w-md rounded bg-black/15" />
          <div className="h-4 w-48 rounded bg-black/15" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-4 rounded bg-black/15"
              style={{ width: `${85 + (i % 3) * 5}%` }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
