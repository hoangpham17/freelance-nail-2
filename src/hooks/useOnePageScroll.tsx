import { useEffect, useRef, useCallback } from "react";

interface UseOnePageScrollOptions {
  sectionSelector: string;
  enabled?: boolean;
  firstSectionOffset?: number; // Offset to subtract when scrolling to first section (index 0)
}

export const useOnePageScroll = ({
  sectionSelector,
  enabled = true,
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
  const touchStartTimeRef = useRef<number>(0);
  const lastTouchMoveYRef = useRef<number>(0);
  const isTouchScrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef2 = useRef<NodeJS.Timeout | null>(null);
  const lastScrollYRef = useRef<number>(0);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!enabled) return;
      isScrollingRef.current = false;
      isTouchScrollingRef.current = false;
      const touch = e.touches[0];
      if (touch) {
        touchStartYRef.current = touch.clientY;
        touchStartScrollYRef.current = window.scrollY;
        touchStartTimeRef.current = Date.now();
        lastTouchMoveYRef.current = touch.clientY;
      }
    },
    [enabled]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!enabled) return;
      const touch = e.touches[0];
      if (touch) {
        lastTouchMoveYRef.current = touch.clientY;
        // Mark as scrolling if user is actively moving
        const deltaY = Math.abs(touch.clientY - touchStartYRef.current);
        if (deltaY > 10) {
          isTouchScrollingRef.current = true;
        }
      }
    },
    [enabled]
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!enabled || isScrollingRef.current) return;

      const sections = getSections();
      if (sections.length === 0) return;

      const touch = e.changedTouches[0];
      if (!touch) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const touchEndY = touch.clientY;
      const touchDuration = Date.now() - touchStartTimeRef.current;

      // Calculate swipe direction and velocity
      const deltaY = touchEndY - touchStartYRef.current;
      const scrollDelta = scrollY - touchStartScrollYRef.current;
      const absDeltaY = Math.abs(deltaY);
      const absScrollDelta = Math.abs(scrollDelta);

      // Determine if this is a quick swipe gesture (not a slow scroll)
      const isQuickSwipe = touchDuration < 300 && absDeltaY > 30;
      // Or if user scrolled very little but moved finger a lot (intentional swipe)
      const isIntentionalSwipe = absDeltaY > 50 && absScrollDelta < 100;

      if (!isQuickSwipe && !isIntentionalSwipe) {
        // Normal scroll, check if we're at boundary and should snap
        const currentIndex = getCurrentSectionIndex();
        if (currentIndex === -1) return;

        const currentSection = sections[currentIndex];
        if (!currentSection) return;

        const sectionTop = currentSection.offsetTop;
        const sectionHeight = currentSection.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;

        const boundaryTolerance = 20; // Increased tolerance for mobile

        // Check if near boundary and should snap to next/previous section
        const isNearBottom =
          scrollY + viewportHeight >= sectionBottom - boundaryTolerance;
        const isNearTop = scrollY <= sectionTop + boundaryTolerance;

        // If scrolling down and near bottom, go to next section
        if (deltaY < -20 && isNearBottom && currentIndex < sections.length - 1) {
          scrollToSection(currentIndex + 1);
          return;
        }
        // If scrolling up and near top, go to previous section
        if (deltaY > 20 && isNearTop && currentIndex > 0) {
          scrollToSection(currentIndex - 1);
          return;
        }
        return;
      }

      // Handle quick swipe gestures
      const currentIndex = getCurrentSectionIndex();
      if (currentIndex === -1) return;

      const currentSection = sections[currentIndex];
      if (!currentSection) return;

      const sectionTop = currentSection.offsetTop;
      const sectionHeight = currentSection.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;

      const boundaryTolerance = 30; // More tolerance for mobile

      const isSwipeDown = deltaY < -30;
      const isSwipeUp = deltaY > 30;

      // Only move to next/previous section if at boundary or very close
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

  // Handle scroll events for mobile - auto-snap when near boundaries
  const handleScroll = useCallback(() => {
    if (!enabled || isScrollingRef.current) return;

    // Debounce scroll events
    if (scrollTimeoutRef2.current) {
      clearTimeout(scrollTimeoutRef2.current);
    }

    scrollTimeoutRef2.current = setTimeout(() => {
      const sections = getSections();
      if (sections.length === 0) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollDelta = scrollY - lastScrollYRef.current;
      lastScrollYRef.current = scrollY;

      // Only process if scroll has stopped or is very slow
      if (Math.abs(scrollDelta) > 5) {
        return; // Still scrolling, wait
      }

      const currentIndex = getCurrentSectionIndex();
      if (currentIndex === -1) return;

      const currentSection = sections[currentIndex];
      if (!currentSection) return;

      const sectionTop = currentSection.offsetTop;
      const sectionHeight = currentSection.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;

      // Check if we're very close to section boundaries (within 50px)
      const snapThreshold = 50;
      const distanceFromTop = Math.abs(scrollY - sectionTop);
      const distanceFromBottom = Math.abs(
        scrollY + viewportHeight - sectionBottom
      );

      // Snap to current section if very close to its boundaries
      if (distanceFromTop < snapThreshold) {
        scrollToSection(currentIndex);
      } else if (distanceFromBottom < snapThreshold) {
        // Check if should go to next section
        if (currentIndex < sections.length - 1) {
          const nextSection = sections[currentIndex + 1];
          const distanceToNext = Math.abs(
            scrollY + viewportHeight - nextSection.offsetTop
          );
          if (distanceToNext < snapThreshold) {
            scrollToSection(currentIndex + 1);
          } else {
            scrollToSection(currentIndex);
          }
        } else {
          scrollToSection(currentIndex);
        }
      }
    }, 150); // Wait 150ms after scroll stops
  }, [enabled, getSections, getCurrentSectionIndex, scrollToSection]);

  useEffect(() => {
    if (!enabled) return;

    // Initialize last scroll position
    lastScrollYRef.current = window.scrollY;

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (scrollTimeoutRef2.current) {
        clearTimeout(scrollTimeoutRef2.current);
      }
    };
  }, [enabled, handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd, handleScroll]);

  return {
    scrollToSection,
    getCurrentSectionIndex,
  };
};
