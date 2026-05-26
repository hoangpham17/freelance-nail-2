import { useId } from "react";
import clsx from "clsx";

export type SectionHeadingLineProps = {
  className?: string;
};

const HORIZONTAL_GOLD = [
  { offset: "0%", color: "#7F4200", opacity: 0 },
  { offset: "8%", color: "#B37B28", opacity: 0.45 },
  { offset: "22%", color: "#E8B551", opacity: 0.85 },
  { offset: "50%", color: "#FFE5A0", opacity: 1 },
  { offset: "78%", color: "#E8B551", opacity: 0.85 },
  { offset: "92%", color: "#B37B28", opacity: 0.45 },
  { offset: "100%", color: "#7F4200", opacity: 0 },
] as const;

const SPARKLE_POINTS: ReadonlyArray<{ cx: number; cy: number; r: number; o: number }> =
  [
    { cx: 58, cy: 7.2, r: 0.32, o: 0.55 },
    { cx: 108, cy: 8.8, r: 0.26, o: 0.4 },
    { cx: 212, cy: 8.8, r: 0.26, o: 0.4 },
    { cx: 262, cy: 7.2, r: 0.32, o: 0.55 },
  ];

/** 4-point star path centered at origin */
const starPath = (size: number) =>
  `M 0 ${-size} L ${size * 0.28} ${-size * 0.28} L ${size} 0 L ${size * 0.28} ${size * 0.28} L 0 ${size} L ${-size * 0.28} ${size * 0.28} L ${-size} 0 L ${-size * 0.28} ${-size * 0.28} Z`;

/**
 * Golden Weave — interlacing calligraphic ribbons, rosette knot, starlit accents.
 * Ornamental divider for Madison section headings on dark backgrounds.
 */
export const SectionHeadingLine: React.FC<SectionHeadingLineProps> = ({
  className,
}) => {
  const uid = useId().replace(/:/g, "");
  const goldId = `shl-gold-${uid}`;
  const mistId = `shl-mist-${uid}`;
  const coreId = `shl-core-${uid}`;
  const bloomId = `shl-bloom-${uid}`;
  const stroke = `url(#${goldId})`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={320}
      height={22}
      viewBox="0 0 320 22"
      fill="none"
      aria-hidden
      className={clsx("block shrink-0 w-[320px] max-w-full h-[22px]", className)}
    >
      <defs>
        <linearGradient
          id={goldId}
          x1="0"
          y1="11"
          x2="320"
          y2="11"
          gradientUnits="userSpaceOnUse"
        >
          {HORIZONTAL_GOLD.map((s) => (
            <stop
              key={s.offset}
              offset={s.offset}
              stopColor={s.color}
              stopOpacity={s.opacity}
            />
          ))}
        </linearGradient>

        <radialGradient
          id={mistId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(160 11) scale(20 8)"
        >
          <stop offset="0%" stopColor="#FFF9EB" stopOpacity={0.5} />
          <stop offset="50%" stopColor="#FFE5A0" stopOpacity={0.15} />
          <stop offset="100%" stopColor="#F0BE57" stopOpacity={0} />
        </radialGradient>

        <radialGradient
          id={coreId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(160 11) scale(2.5 2.5)"
        >
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#FFF0C0" />
          <stop offset="100%" stopColor="#F9BE5C" stopOpacity={0} />
        </radialGradient>

        <filter
          id={bloomId}
          x="-45%"
          y="-180%"
          width="190%"
          height="460%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="1.05" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter={`url(#${bloomId})`}>
        <ellipse cx={160} cy={11} rx={20} ry={7} fill={`url(#${mistId})`} />

        {/* Ghost strands — depth & softness */}
        <path
          d="M 14 11 C 52 5.5, 108 7, 160 11 C 212 15, 268 5.5, 306 11"
          stroke={stroke}
          strokeWidth={1.15}
          strokeLinecap="round"
          opacity={0.12}
        />
        <path
          d="M 14 11 C 52 16.5, 108 15, 160 11 C 212 7, 268 16.5, 306 11"
          stroke={stroke}
          strokeWidth={1.15}
          strokeLinecap="round"
          opacity={0.12}
        />

        {/* Interlacing ribbons */}
        <path
          d="M 14 11 C 52 5.8, 108 7.4, 160 11 C 212 14.6, 268 5.8, 306 11"
          stroke={stroke}
          strokeWidth={0.62}
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 14 11 C 52 16.2, 108 14.6, 160 11 C 212 7.4, 268 16.2, 306 11"
          stroke={stroke}
          strokeWidth={0.62}
          strokeLinecap="round"
          fill="none"
        />

        {/* Center knot loop */}
        <path
          d="M 148 11 C 152 7.2, 158 7.2, 160 11 C 162 14.8, 168 14.8, 172 11"
          stroke={stroke}
          strokeWidth={0.48}
          strokeLinecap="round"
          fill="none"
          opacity={0.75}
        />

        {/* Rosette — four calligraphic petals */}
        <g stroke={stroke} strokeWidth={0.4} strokeLinecap="round" fill="none" opacity={0.7}>
          <path d="M 160 11 C 158.5 9.2, 157 8.5, 156 9.5" />
          <path d="M 160 11 C 161.5 9.2, 163 8.5, 164 9.5" />
          <path d="M 160 11 C 158.5 12.8, 157 13.5, 156 12.5" />
          <path d="M 160 11 C 161.5 12.8, 163 13.5, 164 12.5" />
        </g>

        {/* End hooks — calligraphic terminals */}
        <path
          d="M 14 11 C 9 10.2, 5 11, 7 11.8 C 8.5 12.4, 11 11.6, 14 11"
          stroke={stroke}
          strokeWidth={0.45}
          strokeLinecap="round"
          fill="none"
          opacity={0.8}
        />
        <path
          d="M 306 11 C 311 10.2, 315 11, 313 11.8 C 311.5 12.4, 309 11.6, 306 11"
          stroke={stroke}
          strokeWidth={0.45}
          strokeLinecap="round"
          fill="none"
          opacity={0.8}
        />

        {/* Center star & ring */}
        <circle
          cx={160}
          cy={11}
          r={2.1}
          stroke={stroke}
          strokeWidth={0.35}
          fill="none"
          opacity={0.55}
        />
        <circle cx={160} cy={11} r={0.85} fill={`url(#${coreId})`} />
        <path
          d={starPath(1.15)}
          fill={stroke}
          transform="translate(160 11)"
          opacity={0.9}
        />

        {/* Dew sparks along the weave */}
        {SPARKLE_POINTS.map((p) => (
          <circle
            key={`${p.cx}-${p.cy}`}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill={stroke}
            opacity={p.o}
          />
        ))}
      </g>
    </svg>
  );
};
