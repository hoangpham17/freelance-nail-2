import { useEffect, useState } from "react";

const LG_QUERY = "(min-width: 1024px)";

export function useIsLg(): boolean {
  const [isLg, setIsLg] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(LG_QUERY).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(LG_QUERY);
    const onChange = () => setIsLg(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isLg;
}
