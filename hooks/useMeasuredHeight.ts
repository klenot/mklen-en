import { useEffect, useRef, useState } from "react";

/**
 * Tracks an element's rendered height via ResizeObserver. Used by out-of-flow
 * panels (absolute/fixed) that need to mirror their height onto a scroll spacer.
 */
export function useMeasuredHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => setHeight(el.offsetHeight);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, height };
}
