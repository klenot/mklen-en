export default function BlogIndexSkeleton() {
  return (
    <main className="flex min-h-dvh flex-col items-center bg-white px-4 py-16">
      <div className="flex w-full max-w-[640px] animate-pulse flex-col gap-6">
        <div className="h-4 w-16 rounded bg-black/5" />
        <div className="h-10 w-24 rounded bg-black/5" />
        <div className="h-8 w-full rounded bg-black/5" />
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 rounded bg-black/5" />
          ))}
        </div>
      </div>
    </main>
  );
}
