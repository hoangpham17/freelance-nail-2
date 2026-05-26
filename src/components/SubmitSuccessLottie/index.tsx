import {
  lazy,
  Suspense,
  useEffect,
  useState,
  type LazyExoticComponent,
  type ComponentType,
} from "react";
import { createPortal } from "react-dom";

export const SUBMIT_SUCCESS_LOTTIE_URL = "/assets/images/submit-success.json";

type LottieComponent = ComponentType<{
  animationData: object;
  loop?: boolean;
  className?: string;
  onComplete?: () => void;
}>;

let cachedAnimation: object | null = null;
let fetchPromise: Promise<object | null> | null = null;
let lottieModule: LazyExoticComponent<LottieComponent> | null = null;

function getLottie() {
  if (!lottieModule) {
    lottieModule = lazy(() =>
      import("lottie-react").then((mod) => ({ default: mod.default as LottieComponent })),
    );
  }
  return lottieModule;
}

function loadSubmitSuccessLottie(): Promise<object | null> {
  if (cachedAnimation) return Promise.resolve(cachedAnimation);
  if (!fetchPromise) {
    fetchPromise = fetch(SUBMIT_SUCCESS_LOTTIE_URL)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) cachedAnimation = data;
        return data;
      })
      .catch(() => null);
  }
  return fetchPromise;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useMinViewportWidth(minWidth: number, enabled: boolean): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [enabled, minWidth]);

  return matches;
}

export type SubmitSuccessLottieOverlayProps = {
  active: boolean;
  zIndex?: number;
  onComplete?: () => void;
  /** Hide on small screens (entry burst — avoids covering mobile UI) */
  desktopOnly?: boolean;
};

/** Full-screen confetti burst — transparent blend, no black letterbox */
export function SubmitSuccessLottieOverlay({
  active,
  zIndex = 100000,
  onComplete,
  desktopOnly = false,
}: SubmitSuccessLottieOverlayProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDesktop = useMinViewportWidth(1024, desktopOnly);
  const [animationData, setAnimationData] = useState<object | null>(
    cachedAnimation,
  );

  const shouldShow =
    active && !prefersReducedMotion && (!desktopOnly || isDesktop);

  useEffect(() => {
    if (!shouldShow) return;
    if (cachedAnimation) {
      setAnimationData(cachedAnimation);
      return;
    }
    loadSubmitSuccessLottie().then(setAnimationData);
  }, [shouldShow]);

  useEffect(() => {
    if (!shouldShow) return;
    const timeout = window.setTimeout(() => onComplete?.(), 6000);
    return () => window.clearTimeout(timeout);
  }, [shouldShow, onComplete]);

  if (!shouldShow || !animationData) return null;

  const Lottie = getLottie();

  const overlay = (
    <div
      className="submit-success-lottie pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex }}
      aria-hidden
    >
      <div
        className="absolute left-1/2 top-1/2 h-[max(100%,56.25vw)] w-[max(100%,177.78vh)] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        style={{ maxWidth: "none", maxHeight: "none" }}
      >
        <Suspense fallback={null}>
          <Lottie
            animationData={animationData}
            loop={false}
            className="h-full w-full [&_canvas]:!bg-transparent"
            onComplete={onComplete}
          />
        </Suspense>
      </div>
    </div>
  );

  if (typeof document === "undefined") return overlay;
  return createPortal(overlay, document.body);
}

export type HostPartyEntryLottieProps = {
  zIndex?: number;
};

/** Plays submit-success.json once on host-a-party load (desktop, nail-ver2-style). */
export function HostPartyEntryLottie({ zIndex = 50 }: HostPartyEntryLottieProps) {
  const [active, setActive] = useState(true);

  return (
    <SubmitSuccessLottieOverlay
      active={active}
      zIndex={zIndex}
      desktopOnly
      onComplete={() => setActive(false)}
    />
  );
}
