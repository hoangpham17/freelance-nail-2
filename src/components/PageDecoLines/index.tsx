import { useId } from "react";
import clsx from "clsx";

export type PageDecoLinesVariant =
  | "contact"
  | "host-party"
  | "about-us"
  | "our-policies"
  | "gallery";

export type PageDecoLinesProps = {
  className?: string;
  variant?: PageDecoLinesVariant;
  /** Slightly stronger strokes for dark full-bleed sections */
  intensity?: "default" | "strong";
};

type DecoPath = {
  d: string;
  strokeWidth: number;
  opacity?: number;
};

/** Landscape artboard — lines keep shape; viewport crops edges on narrow widths */
const DECO_VIEWBOX = "0 0 110 100";

const DECO_PATHS: Record<PageDecoLinesVariant, DecoPath[]> = {
  contact: [
    { d: "M2 18 C18 8, 28 26, 42 14 S70 6, 88 16", strokeWidth: 1 },
    {
      d: "M0 24 C16 14, 30 32, 48 20 S76 12, 92 22",
      strokeWidth: 0.65,
      opacity: 0.55,
    },
    { d: "M58 32 C72 44, 84 24, 96 36 S108 48, 98 58", strokeWidth: 0.9 },
    { d: "M4 78 C20 66, 34 88, 52 74 S78 64, 90 76", strokeWidth: 0.9 },
    { d: "M54 70 C68 62, 82 78, 90 66", strokeWidth: 0.75 },
  ],
  "host-party": [
    {
      d: "M92 10 C78 22, 64 12, 50 24 S28 34, 10 42",
      strokeWidth: 0.8,
      opacity: 0.7,
    },
    {
      d: "M8 38 C18 30, 22 48, 14 58 S6 76, 16 88",
      strokeWidth: 0.85,
      opacity: 0.6,
    },

    { d: "M18 72 C36 64, 52 86, 72 76 S92 70, 98 82", strokeWidth: 0.9 },
  ],
  "about-us": [
    {
      d: "M-6 62 Q22 48, 42 58 T82 52 T104 44",
      strokeWidth: 0.6,
      opacity: 0.72,
    },
    {
      d: "M108 28 Q82 42, 62 30 T28 38 T6 24",
      strokeWidth: 0.8,
      opacity: 0.58,
    },
    {
      d: "M-20 12 Q4 26, 24 14 T64 8 T72 18",
      strokeWidth: 0.7,
      opacity: 0.48,
    },
    {
      d: "M72 68 Q88 56, 100 72 T94 92",
      strokeWidth: 0.65,
      opacity: 0.45,
    },
  ],
  "our-policies": [
    { d: "M0 16 C16 8, 32 22, 45 12 S76 6, 98 16", strokeWidth: 0.9 },
    {
      d: "M0 38 C16 28, 34 44, 52 32 S80 24, 106 36",
      strokeWidth: 0.75,
      opacity: 0.58,
    },
    { d: "M10 56 C26 48, 42 66, 60 56 S86 50, 100 62", strokeWidth: 0.85 },
    { d: "M46 76 C62 68, 78 84, 96 72", strokeWidth: 0.7, opacity: 0.5 },
    {
      d: "M68 24 C82 36, 94 20, 108 32",
      strokeWidth: 0.65,
      opacity: 0.52,
    },
  ],
  gallery: [
    { d: "M-4 14 C18 4, 36 20, 52 10 S82 2, 104 14", strokeWidth: 1 },
    {
      d: "M108 22 C90 36, 68 18, 50 32 S24 38, 6 26",
      strokeWidth: 0.9,
      opacity: 0.65,
    },
    { d: "M8 48 C28 62, 48 44, 68 58 S92 52, 106 60", strokeWidth: 0.95 },
    {
      d: "M72 38 C88 50, 100 34, 110 46",
      strokeWidth: 0.75,
      opacity: 0.55,
    },
    { d: "M4 78 C22 66, 42 88, 62 74 S88 64, 102 76", strokeWidth: 0.88 },
    {
      d: "M54 86 C70 76, 86 92, 100 80",
      strokeWidth: 0.7,
      opacity: 0.48,
    },
  ],
};

const GRADIENT_AXIS: Record<
  PageDecoLinesVariant,
  { x1: string; y1: string; x2: string; y2: string }
> = {
  contact: { x1: "0%", y1: "0%", x2: "100%", y2: "100%" },
  "host-party": { x1: "100%", y1: "0%", x2: "0%", y2: "100%" },
  "about-us": { x1: "0%", y1: "100%", x2: "100%", y2: "0%" },
  "our-policies": { x1: "100%", y1: "20%", x2: "0%", y2: "80%" },
  gallery: { x1: "0%", y1: "30%", x2: "100%", y2: "70%" },
};

/** Crop anchor — narrow viewports clip inward without stretching curves */
const PRESERVE_ASPECT: Record<PageDecoLinesVariant, string> = {
  contact: "xMidYMid slice",
  "host-party": "xMidYMid slice",
  "about-us": "xMidYMin slice",
  "our-policies": "xMinYMid slice",
  gallery: "xMidYMid slice",
};

/** Full-bleed decorative wavy gold lines (uniform scale + edge crop). */
export const PageDecoLines: React.FC<PageDecoLinesProps> = ({
  className,
  variant = "contact",
  intensity = "default",
}) => {
  const gradientId = `page-deco-gold-${useId().replace(/:/g, "")}`;
  const peakOpacity = intensity === "strong" ? 0.42 : 0.28;
  const paths = DECO_PATHS[variant];
  const gradient = GRADIENT_AXIS[variant];

  return (
    <div
      className={clsx(
        "page-deco-lines pointer-events-none absolute inset-0 z-[1] overflow-hidden",
        className,
      )}
      aria-hidden
    >
      <svg
        className="h-full w-full"
        viewBox={DECO_VIEWBOX}
        preserveAspectRatio={PRESERVE_ASPECT[variant]}
        fill="none"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1={gradient.x1}
            y1={gradient.y1}
            x2={gradient.x2}
            y2={gradient.y2}
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#F9BE5C" stopOpacity="0" />
            <stop offset="45%" stopColor="#F9BE5C" stopOpacity={peakOpacity} />
            <stop offset="100%" stopColor="#F9BE5C" stopOpacity="0" />
          </linearGradient>
        </defs>
        {paths.map((path, index) => (
          <path
            key={index}
            d={path.d}
            stroke={`url(#${gradientId})`}
            strokeWidth={path.strokeWidth}
            strokeLinecap="round"
            opacity={path.opacity}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
};
