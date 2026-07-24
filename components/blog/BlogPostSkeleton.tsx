export default function BlogPostSkeleton() {
  return (
    <article
      aria-busy="true"
      aria-label="Loading blog post"
      className="flex w-full max-w-[640px] flex-col"
    >
      <p className="mb-10 font-mono text-[0.8125rem] text-black/60">Loading post…</p>
      <div className="min-h-[72dvh] animate-pulse">
        <div className="mb-16 h-4 w-28 rounded bg-black/20" />

        <div className="mb-16 space-y-4">
          <div className="h-3 w-24 rounded bg-black/20" />
          <div className="h-12 w-full max-w-lg rounded bg-black/20" />
          <div className="h-12 w-full max-w-md rounded bg-black/20" />
          <div className="space-y-2 pt-1">
            <div className="h-4 w-full rounded bg-black/20" />
            <div className="h-4 w-[92%] rounded bg-black/20" />
          </div>
          <div className="flex gap-2 pt-2">
            <div className="h-4 w-24 rounded bg-black/20" />
            <div className="h-4 w-4 rounded bg-black/20" />
            <div className="h-4 w-20 rounded bg-black/20" />
          </div>
        </div>

        <div className="space-y-4">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="h-4 rounded bg-black/20"
              style={{ width: `${68 + (i % 5) * 7}%` }}
            />
          ))}
        </div>

        <div className="mt-24 h-4 w-32 rounded bg-black/20" />
      </div>
    </article>
  );
}
