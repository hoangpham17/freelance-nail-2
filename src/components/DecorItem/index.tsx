import React, { useEffect, useState } from "react";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  isMovingWhenScroll?: boolean;
  className?: string;
  width?: number;
  height?: number;
};

export const DecorItem = ({
  children,
  isMovingWhenScroll = false,
  className,
  width,
  height,
}: Props) => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const lastScrollY = React.useRef(
    typeof window !== "undefined" ? window.scrollY : 0,
  );
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const isScrollingRef = React.useRef(false);
  const lastUpdateTime = React.useRef(0);

  useEffect(() => {
    if (!isMovingWhenScroll) return;

    if (typeof window === "undefined") return;

    // Disable scroll-based movement on small screens and when users prefer reduced motion
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isSmallScreen = window.innerWidth < 768;

    if (prefersReducedMotion || isSmallScreen) {
      setScrollOffset(0);
      return;
    }

    const MOVE_OFFSET = 15; // Reduced from 50px to 15px for gentler movement
    const THROTTLE_MS = 16; // ~60fps throttle

    const updateScrollOffset = (direction: number) => {
      const now = Date.now();
      // Throttle updates to prevent too frequent state changes
      if (now - lastUpdateTime.current < THROTTLE_MS) {
        return;
      }
      lastUpdateTime.current = now;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        setScrollOffset(-direction * MOVE_OFFSET);
        isScrollingRef.current = true;
      });
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY.current ? 1 : -1;

      updateScrollOffset(direction);
      lastScrollY.current = currentScrollY;

      // Reset to original position after scrolling stops
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
        rafRef.current = requestAnimationFrame(() => {
          setScrollOffset(0);
        });
      }, 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMovingWhenScroll]);

  const animationConfig = React.useMemo(() => {
    const type = Math.floor(Math.random() * 3) + 1;
    const delay = Math.random() * 5; // 0-5s delay
    return {
      className: `animate-organic-floating-${type}`,
      delay: `${-delay}s`, // Negative delay so they start at different points in their cycle
    };
  }, []);

  return (
    <div
      className={clsx(
        "absolute pointer-events-none transition-transform",
        className,
      )}
      style={{
        transform: isMovingWhenScroll
          ? `translateY(${scrollOffset}px)`
          : undefined,
        // Smooth transition: longer when resetting, shorter when moving
        transitionDuration: scrollOffset === 0 ? "1000ms" : "500ms",
        transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        willChange: "transform",
        width,
        height,
      }}
    >
      <div
        className={clsx(
          animationConfig.className,
          "h-full w-full flex items-center justify-center",
        )}
        style={{ animationDelay: animationConfig.delay }}
      >
        {children}
      </div>
    </div>
  );
};
