import { useEffect, useRef, useCallback } from "react";

interface UseOnePageScrollOptions {
  sectionSelector: string;
  enabled?: boolean;
  scrollThreshold?: number; // Percentage of section scrolled before snapping to next
  firstSectionOffset?: number; // Offset to subtract when scrolling to first section (index 0)
}

export const useOnePageScroll = ({
  sectionSelector,
  enabled = true,
  scrollThreshold = 0.8, // 80% scrolled
  firstSectionOffset = 0,
}: UseOnePageScrollOptions) => {
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTimeRef = useRef(0);

  const getSections = useCallback(() => {
    return Array.from(
      document.querySelectorAll<HTMLElement>(sectionSelector)
    ).filter((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });
  }, [sectionSelector]);

  const getCurrentSectionIndex = useCallback(() => {
    const sections = getSections();
    if (sections.length === 0) return -1;

    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const viewportCenter = scrollY + viewportHeight / 2;

    // Find section that contains the center of viewport
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;

      if (viewportCenter >= sectionTop && viewportCenter <= sectionBottom) {
        return i;
      }
    }

    // If scrolled past all sections, return last index
    const lastSection = sections[sections.length - 1];
    if (
      scrollY + viewportHeight >=
      lastSection.offsetTop + lastSection.offsetHeight
    ) {
      return sections.length - 1;
    }

    // If before first section, return first
    if (scrollY < sections[0].offsetTop) {
      return 0;
    }

    return 0;
  }, [getSections]);

  const scrollToSection = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const sections = getSections();
      if (index < 0 || index >= sections.length) return;

      const section = sections[index];
      if (!section) return;

      isScrollingRef.current = true;

      // If scrolling to first section (index 0), subtract offset
      const scrollTop = index === 0 
        ? Math.max(0, section.offsetTop - firstSectionOffset)
        : section.offsetTop;

      window.scrollTo({
        top: scrollTop,
        behavior,
      });

      // Reset scrolling flag after animation
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    },
    [getSections, firstSectionOffset]
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!enabled || isScrollingRef.current) {
        return;
      }

      const now = Date.now();
      // Throttle wheel events
      if (now - lastScrollTimeRef.current < 100) {
        return;
      }

      const sections = getSections();
      if (sections.length === 0) return;

      const currentIndex = getCurrentSectionIndex();
      if (currentIndex === -1) return;

      const currentSection = sections[currentIndex];
      if (!currentSection) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const sectionTop = currentSection.offsetTop;
      const sectionHeight = currentSection.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      // Tolerance for checking if at boundary (in pixels)
      const boundaryTolerance = 5;

      // Scrolling down - only scroll to next section if already at bottom
      if (isScrollingDown) {
        const isAtBottom =
          scrollY + viewportHeight >= sectionBottom - boundaryTolerance;
        if (isAtBottom && currentIndex < sections.length - 1) {
          e.preventDefault();
          lastScrollTimeRef.current = now;
          scrollToSection(currentIndex + 1);
        }
      }
      // Scrolling up - only scroll to previous section if already at top
      else if (isScrollingUp) {
        const isAtTop = scrollY <= sectionTop + boundaryTolerance;
        if (isAtTop && currentIndex > 0) {
          e.preventDefault();
          lastScrollTimeRef.current = now;
          scrollToSection(currentIndex - 1);
        }
      }
    },
    [enabled, getSections, getCurrentSectionIndex, scrollToSection]
  );

  const touchStartYRef = useRef<number>(0);
  const touchStartScrollYRef = useRef<number>(0);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!enabled) return;
      isScrollingRef.current = false;
      const touch = e.touches[0];
      if (touch) {
        touchStartYRef.current = touch.clientY;
        touchStartScrollYRef.current = window.scrollY;
      }
    },
    [enabled]
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!enabled || isScrollingRef.current) return;

      const sections = getSections();
      if (sections.length === 0) return;

      const currentIndex = getCurrentSectionIndex();
      if (currentIndex === -1) return;

      const touch = e.changedTouches[0];
      if (!touch) return;

      const scrollY = window.scrollY;
      const currentSection = sections[currentIndex];
      if (!currentSection) return;

      const sectionTop = currentSection.offsetTop;
      const sectionHeight = currentSection.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;
      const viewportHeight = window.innerHeight;

      // Calculate swipe direction
      const deltaY = touch.clientY - touchStartYRef.current;
      const scrollDelta = scrollY - touchStartScrollYRef.current;
      const isSwipeDown = deltaY < -30 && Math.abs(scrollDelta) < 50; // Swipe down
      const isSwipeUp = deltaY > 30 && Math.abs(scrollDelta) < 50; // Swipe up

      const boundaryTolerance = 5;

      // Only move to next/previous section if at boundary
      if (isSwipeDown) {
        const isAtBottom =
          scrollY + viewportHeight >= sectionBottom - boundaryTolerance;
        if (isAtBottom && currentIndex < sections.length - 1) {
          scrollToSection(currentIndex + 1);
        }
      } else if (isSwipeUp) {
        const isAtTop = scrollY <= sectionTop + boundaryTolerance;
        if (isAtTop && currentIndex > 0) {
          scrollToSection(currentIndex - 1);
        }
      }
    },
    [enabled, getSections, getCurrentSectionIndex, scrollToSection]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [enabled, handleWheel, handleTouchStart, handleTouchEnd]);

  return {
    scrollToSection,
    getCurrentSectionIndex,
  };
};
