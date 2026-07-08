export default function BlogPostSkeleton() {
  return (
    <article className="flex w-full max-w-[640px] flex-col animate-pulse">
      <div className="mb-16 h-4 w-16 rounded bg-black/5" />
      <div className="mb-16 space-y-4">
        <div className="h-3 w-20 rounded bg-black/5" />
        <div className="h-10 w-full max-w-md rounded bg-black/5" />
        <div className="h-4 w-40 rounded bg-black/5" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-4 rounded bg-black/5"
            style={{ width: `${85 + (i % 3) * 5}%` }}
          />
        ))}
      </div>
    </article>
  );
}
