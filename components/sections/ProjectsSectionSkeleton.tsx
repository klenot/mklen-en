export default function ProjectsSectionSkeleton() {
  return (
    <section className="flex w-full shrink-0 justify-center pb-16 pt-12">
      <div className="flex w-full max-w-[1200px] flex-col gap-4 px-4">
        <div className="mb-4 h-10 w-32 animate-pulse rounded bg-black/5" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded bg-black/5" />
          ))}
        </div>
      </div>
    </section>
  );
}
