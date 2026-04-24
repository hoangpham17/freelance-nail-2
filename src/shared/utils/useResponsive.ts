import { useState, useEffect } from "react";
import { BREAKPOINTS } from "./helper";

/**
 * Hook to detect screen size and device type
 *
 * @example
 * const { isMobile, isTablet, isDesktop } = useResponsive();
 */
export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Set initial size
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = screenSize.width < BREAKPOINTS.md; // < 768px
  const isTablet =
    screenSize.width >= BREAKPOINTS.md && screenSize.width < BREAKPOINTS.lg; // 768px - 1024px
  const isDesktop = screenSize.width >= BREAKPOINTS.lg; // > 1024px
  const isLargeDesktop = screenSize.width >= BREAKPOINTS.xl; // > 1280px
  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    width: screenSize.width,
    height: screenSize.height,
  };
};
