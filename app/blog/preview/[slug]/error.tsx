"use client";

type PreviewErrorProps = {
  reset: () => void;
};

export default function PreviewError({ reset }: PreviewErrorProps) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-white px-4 py-16">
      <div className="flex w-full max-w-[640px] flex-col gap-6 font-mono">
        <h1 className="text-lg font-bold text-black">Could not load draft preview</h1>
        <p className="text-sm leading-relaxed text-black/70">
          Notion took too long or returned an error. This can happen on a cold start. Try again
          before changing the preview link.
        </p>
        <button
          type="button"
          onClick={reset}
          className="self-start border border-black px-4 py-2 text-sm text-black transition-colors hover:bg-black hover:text-white"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
