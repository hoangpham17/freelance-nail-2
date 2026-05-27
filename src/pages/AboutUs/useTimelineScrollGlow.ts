import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

export function useTimelineScrollGlow(enabled: boolean) {
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  const update = useCallback(() => {
    const track = trackRef.current;
    const line = lineRef.current;
    const glow = glowRef.current;
    if (!track || !line || !glow) return;

    const rect = track.getBoundingClientRect();
    const height = rect.height;
    if (height <= 0) return;

    const viewportMid = window.innerHeight * 0.5;
    const progress = Math.max(0, Math.min(1, (viewportMid - rect.top) / height));

    glow.style.top = `${progress * 100}%`;

    const inView = rect.bottom > 0 && rect.top < window.innerHeight;
    line.classList.toggle("au-timeline__line--active", inView);
  }, []);

  useLayoutEffect(() => {
    if (!enabled) return;
    update();
  }, [enabled, update]);

  useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    schedule();

    window.addEventListener("scroll", schedule, { passive: true });
    document.addEventListener("scroll", schedule, { passive: true, capture: true });
    window.addEventListener("resize", schedule, { passive: true });

    const track = trackRef.current;
    const resizeObserver =
      track && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(schedule)
        : null;
    if (track && resizeObserver) resizeObserver.observe(track);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      document.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
      resizeObserver?.disconnect();
    };
  }, [enabled, update]);

  return { trackRef, lineRef, glowRef };
}
