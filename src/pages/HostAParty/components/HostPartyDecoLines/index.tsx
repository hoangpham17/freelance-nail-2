import { useId } from "react";
import clsx from "clsx";

type DecoPath = {
  d: string;
  strokeWidth: number;
  opacity?: number;
};

const DECO_VIEWBOX = "0 0 110 100";

/** Gradient peak + path multiplier — tune all host-party decorative lines together */
const PEAK_OPACITY = 0.2;
const PATH_OPACITY_SCALE = 1;

const HOST_PARTY_DECO_PATHS: DecoPath[] = [
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
];

export type HostPartyDecoLinesProps = {
  className?: string;
};

/** Full-bleed decorative gold curves for Host A Party content area */
export const HostPartyDecoLines: React.FC<HostPartyDecoLinesProps> = ({
  className,
}) => {
  const gradientId = `host-party-deco-gold-${useId().replace(/:/g, "")}`;

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
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="100%"
            y1="0%"
            x2="0%"
            y2="100%"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#F9BE5C" stopOpacity="0" />
            <stop offset="45%" stopColor="#F9BE5C" stopOpacity={PEAK_OPACITY} />
            <stop offset="100%" stopColor="#F9BE5C" stopOpacity="0" />
          </linearGradient>
        </defs>
        {HOST_PARTY_DECO_PATHS.map((path, index) => (
          <path
            key={index}
            d={path.d}
            stroke={`url(#${gradientId})`}
            strokeWidth={path.strokeWidth}
            strokeLinecap="round"
            opacity={(path.opacity ?? 1) * PATH_OPACITY_SCALE}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
};
