export default function Experiences() {
  return (
    <section id="experiences" className="mx-4 mt-4">
      {/* Liquid glass panel: pure ~20px backdrop blur (no color tint), with an
          orange refractive edge and a top specular highlight. */}
      <div className="relative flex min-h-[60vh] items-center justify-center overflow-hidden rounded-4xl border border-blue-900/40 bg-black/20 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/20 to-transparent" />

        <div className="relative flex flex-col items-center gap-10 px-6 py-24 text-center">
          <p className="font-mono text-lg text-white md:text-2xl">
            Got experience, got the <span className="font-regular">juice</span>.
          </p>

          <div className="flex h-16 items-center md:h-20">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                style={{ zIndex: 5 - i }}
                className="-ml-4 size-14 rounded-full bg-black ring-2 ring-white transition-[width,height] duration-200 hover:size-16 first:ml-0 md:size-16 md:hover:size-18"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
