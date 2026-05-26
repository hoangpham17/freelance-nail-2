import { useId } from "react";
import clsx from "clsx";

export type PageDecoLinesVariant = "contact" | "host-party";

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
};

const GRADIENT_AXIS: Record<
  PageDecoLinesVariant,
  { x1: string; y1: string; x2: string; y2: string }
> = {
  contact: { x1: "0%", y1: "0%", x2: "100%", y2: "100%" },
  "host-party": { x1: "100%", y1: "0%", x2: "0%", y2: "100%" },
};

/** Crop anchor — narrow viewports clip inward without stretching curves */
const PRESERVE_ASPECT: Record<PageDecoLinesVariant, string> = {
  contact: "xMidYMid slice",
  "host-party": "xMidYMid slice",
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
