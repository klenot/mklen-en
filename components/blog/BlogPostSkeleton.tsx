import { skeletonBarClass } from "@/lib/skeleton-styles";

export default function BlogPostSkeleton() {
  return (
    <article
      aria-busy="true"
      aria-label="Loading blog post"
      className="flex w-full max-w-[640px] flex-col"
    >
      <p className="mb-10 font-mono text-[0.8125rem] text-black/60">Loading post…</p>
      <div className="min-h-[72dvh] animate-pulse">
        <div className={`mb-16 h-4 w-28 ${skeletonBarClass}`} />

        <div className="mb-16 space-y-4">
          <div className={`h-3 w-24 ${skeletonBarClass}`} />
          <div className="flex gap-2">
            <div className={`h-4 w-24 ${skeletonBarClass}`} />
            <div className={`h-4 w-4 ${skeletonBarClass}`} />
            <div className={`h-4 w-20 ${skeletonBarClass}`} />
          </div>
          <div className={`h-12 w-full max-w-lg ${skeletonBarClass}`} />
          <div className={`h-12 w-full max-w-md ${skeletonBarClass}`} />
          <div className="space-y-2 pt-1">
            <div className={`h-4 w-full ${skeletonBarClass}`} />
            <div className={`h-4 w-[92%] ${skeletonBarClass}`} />
          </div>
        </div>

        <div className="space-y-4">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className={`h-4 ${skeletonBarClass}`}
              style={{ width: `${68 + (i % 5) * 7}%` }}
            />
          ))}
        </div>

        <div className={`mt-24 h-4 w-32 ${skeletonBarClass}`} />
      </div>
    </article>
  );
}
