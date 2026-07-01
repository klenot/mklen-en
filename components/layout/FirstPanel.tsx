"use client";

import { useMeasuredHeight } from "@/hooks/useMeasuredHeight";

/**
 * The 1st panel overlays the pinned 2nd panel (absolute, z-10) and scrolls away.
 * Because it's out of flow, it can't create its own scroll room — so we measure
 * its height and mirror it onto a spacer. This keeps the reveal correct no matter
 * how many sections are added, and stops the panel's content from overflowing on
 * top of the 2nd panel.
 */
export default function FirstPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ref, height } = useMeasuredHeight<HTMLElement>();

  return (
    <>
      <section
        ref={ref}
        id="1st-panel"
        className="absolute inset-x-0 top-0 z-10 flex flex-col"
      >
        {children}
      </section>

      {/* scroll track mirrored to the panel's real height */}
      <div aria-hidden style={{ height }} />
    </>
  );
}
