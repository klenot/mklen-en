export default function BlogSectionSkeleton() {
  return (
    <section className="flex w-full shrink-0 justify-center py-16">
      <div className="flex w-full max-w-[1200px] flex-col gap-4 px-4">
        <div className="mb-4 h-10 w-24 animate-pulse rounded bg-black/5" />
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded bg-black/5" />
          ))}
        </div>
      </div>
    </section>
  );
}
