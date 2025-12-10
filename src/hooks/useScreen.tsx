import { useState, useEffect } from "react";

import { BREAKPOINTS } from "../shared/utils/helper";

export const useScreen = () => {
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

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = screenSize.width < BREAKPOINTS.md; // < 768px
  const isTablet =
    screenSize.width >= BREAKPOINTS.md && screenSize.width < BREAKPOINTS.lg; // >= 768px && < 1024px
  const isDesktop = screenSize.width >= BREAKPOINTS.lg; // >= 1024px

  return {
    isMobile,
    isTablet,
    isDesktop,
    width: screenSize.width,
    height: screenSize.height,
  };
};
