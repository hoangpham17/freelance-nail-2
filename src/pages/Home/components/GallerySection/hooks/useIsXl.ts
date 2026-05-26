import { useEffect, useState } from "react";
import { BREAKPOINTS } from "@/shared/utils/helper";

const XL_QUERY = `(min-width: ${BREAKPOINTS.xl}px)`;

export function useIsXl(): boolean {
  const [isXl, setIsXl] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(XL_QUERY).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(XL_QUERY);
    const onChange = () => setIsXl(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isXl;
}
