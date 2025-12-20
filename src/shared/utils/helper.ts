/**
 * Tailwind breakpoints mapping
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

/**
 * Design breakpoints
 */
const MOBILE_WIDTH = 375;
const DESKTOP_WIDTH = 1920;

/**
 * Linear interpolation function
 */
const lerp = (min: number, max: number, t: number): number => {
  return min + (max - min) * t;
};

/**
 * Clamp value between min and max
 */
const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

/**
 * Round to nearest integer and clamp between 8-200
 */
const roundFontSize = (size: number): number => {
  return clamp(Math.round(size), 8, 200);
};

/**
 * Calculate responsive font size based on design breakpoints
 * Returns an object with separate class names
 *
 * @param minSize - Font size at mobile (390px)
 * @param maxSize - Font size at desktop (1920px)
 * @returns Object with base and breakpoint-specific classes
 *
 * @example
 * import clsx from 'clsx';
 * const fontSizeClasses = responsiveFontSize(14, 20);
 * className={clsx(fontSizeClasses.base, fontSizeClasses.sm, fontSizeClasses.md, fontSizeClasses.lg, fontSizeClasses.xl, fontSizeClasses["2xl"])}
 */
export const responsiveFontSize = (
  minSize: number,
  maxSize: number
): {
  base: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
} => {
  // Calculate interpolation factor for each breakpoint
  const calculateSize = (width: number): number => {
    const t = (width - MOBILE_WIDTH) / (DESKTOP_WIDTH - MOBILE_WIDTH);
    const clampedT = Math.max(0, Math.min(1, t));
    const interpolatedSize = lerp(minSize, maxSize, clampedT);
    return roundFontSize(interpolatedSize);
  };

  return {
    base: `text-[${roundFontSize(minSize)}px]`,
    sm: `sm:text-[${calculateSize(BREAKPOINTS.sm)}px]`,
    md: `md:text-[${calculateSize(BREAKPOINTS.md)}px]`,
    lg: `lg:text-[${calculateSize(BREAKPOINTS.lg)}px]`,
    xl: `xl:text-[${calculateSize(BREAKPOINTS.xl)}px]`,
    "2xl": `2xl:text-[${roundFontSize(maxSize)}px]`,
  };
};

/**
 * Calculate responsive font size and return as array of classes
 * Perfect for use with clsx
 *
 * @param minSize - Font size at mobile (390px)
 * @param maxSize - Font size at desktop (1920px)
 * @returns Array of class strings
 *
 * @example
 * import clsx from 'clsx';
 * className={clsx(...responsiveFontSizeArray(14, 20), "other-classes")}
 */
export const responsiveFontSizeArray = (
  minSize: number,
  maxSize: number
): string[] => {
  const classes = responsiveFontSize(minSize, maxSize);
  return Object.values(classes);
};

/**
 * Clean HTML description by removing escaped characters
 * Removes backslashes before asterisks and newlines
 *
 * @param html - HTML string that may contain escaped characters
 * @returns Cleaned HTML string
 *
 * @example
 * cleanDescription("\\* Item 1") // Returns "* Item 1"
 */
export const cleanDescription = (html?: string): string => {
  if (!html) return "";
  // Remove backslashes before asterisks (e.g., \* becomes *)
  return html.replace(/\\\*/g, "*").replace(/\\n/g, "\n");
};
