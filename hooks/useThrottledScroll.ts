import { useEffect } from "react";

/**
 * Subscribes to scroll + resize events with requestAnimationFrame throttling.
 * The callback fires at most once per frame. Automatically cleans up on unmount.
 */
export function useThrottledScroll(
  callback: () => void,
  deps: React.DependencyList = [],
) {
  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        callback();
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
