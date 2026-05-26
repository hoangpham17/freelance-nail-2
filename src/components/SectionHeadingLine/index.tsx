import { useId } from "react";
import clsx from "clsx";

export type SectionHeadingLineProps = {
  className?: string;
};

/** Soft gold fade — gradual, creamy highlights */
const HORIZONTAL_GOLD = [
  { offset: "0%", color: "#7F4200", opacity: 0 },
  { offset: "5%", color: "#854905", opacity: 0.2 },
  { offset: "18%", color: "#B37B28", opacity: 0.55 },
  { offset: "35%", color: "#E8B551", opacity: 0.82 },
  { offset: "50%", color: "#FFF4D4", opacity: 1 },
  { offset: "65%", color: "#E8B551", opacity: 0.82 },
  { offset: "82%", color: "#B37B28", opacity: 0.55 },
  { offset: "95%", color: "#854905", opacity: 0.2 },
  { offset: "100%", color: "#7F4200", opacity: 0 },
] as const;

const AURA_GOLD = [
  { offset: "0%", color: "#F0BE57", opacity: 0 },
  { offset: "25%", color: "#FFE5A0", opacity: 0.12 },
  { offset: "50%", color: "#FFF9EB", opacity: 0.22 },
  { offset: "75%", color: "#FFE5A0", opacity: 0.12 },
  { offset: "100%", color: "#F0BE57", opacity: 0 },
] as const;

/** Tapered lens — one filled shape, thin tips / soft belly at center */
const SOFT_LINE =
  "M 24 11 C 78 11, 118 10.55, 156 10.32 C 158.5 10.28, 161.5 10.28, 164 10.32 C 202 10.55, 242 11, 296 11 C 242 11.58, 202 11.68, 164 11.68 C 161.5 11.68, 158.5 11.68, 156 11.68 C 118 11.58, 78 11.55, 24 11 Z";

const SPARKLES = [
  { cx: 68, cy: 10.85, r: 0.55, o: 0.45 },
  { cx: 112, cy: 10.7, r: 0.45, o: 0.32 },
  { cx: 208, cy: 10.7, r: 0.45, o: 0.32 },
  { cx: 252, cy: 10.85, r: 0.55, o: 0.45 },
] as const;

const starPath = (size: number) =>
  `M 0 ${-size} L ${size * 0.26} ${-size * 0.26} L ${size} 0 L ${size * 0.26} ${size * 0.26} L 0 ${size} L ${-size * 0.26} ${size * 0.26} L ${-size} 0 L ${-size * 0.26} ${-size * 0.26} Z`;

const diamondPath = (w: number, h: number) =>
  `M 0 ${-h} L ${w} 0 L 0 ${h} L ${-w} 0 Z`;

/**
 * Golden Veil — soft tapered line, gentle aura, jewel center.
 * Single filled path (no twin strokes) for crisp rendering.
 */
export const SectionHeadingLine: React.FC<SectionHeadingLineProps> = ({
  className,
}) => {
  const uid = useId().replace(/:/g, "");
  const goldId = `shl-gold-${uid}`;
  const auraId = `shl-aura-${uid}`;
  const mistId = `shl-mist-${uid}`;
  const coreId = `shl-core-${uid}`;
  const jewelId = `shl-jewel-${uid}`;
  const stroke = `url(#${goldId})`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={320}
      height={22}
      viewBox="0 0 320 22"
      fill="none"
      aria-hidden
      shapeRendering="geometricPrecision"
      className={clsx(
        "block shrink-0 w-[320px] max-w-full h-[22px]",
        className,
      )}
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

        <linearGradient
          id={auraId}
          x1="0"
          y1="11"
          x2="320"
          y2="11"
          gradientUnits="userSpaceOnUse"
        >
          {AURA_GOLD.map((s) => (
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
          gradientTransform="translate(160 11) scale(32 8)"
        >
          <stop offset="0%" stopColor="#FFFDF8" stopOpacity={0.5} />
          <stop offset="45%" stopColor="#FFE5A0" stopOpacity={0.14} />
          <stop offset="100%" stopColor="#F0BE57" stopOpacity={0} />
        </radialGradient>

        <radialGradient
          id={coreId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(160 11) scale(2.8 2.8)"
        >
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#FFF8E8" />
          <stop offset="100%" stopColor="#F9BE5C" stopOpacity={0} />
        </radialGradient>

        <linearGradient
          id={jewelId}
          x1="160"
          y1="7"
          x2="160"
          y2="15"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFF9EB" />
          <stop offset="100%" stopColor="#E8B551" />
        </linearGradient>
      </defs>

      {/* Wide soft aura */}
      <ellipse
        cx={160}
        cy={11}
        rx={30}
        ry={7}
        fill={`url(#${mistId})`}
      />
      <rect
        x={28}
        y={9.25}
        width={264}
        height={3.5}
        rx={1.75}
        fill={`url(#${auraId})`}
      />

      {/* Main line — tapered lens, single path */}
      <path d={SOFT_LINE} fill={stroke} />

      {/* Dew sparks */}
      {SPARKLES.map((p) => (
        <circle
          key={p.cx}
          cx={p.cx}
          cy={p.cy}
          r={p.r}
          fill={stroke}
          opacity={p.o}
        />
      ))}

      {/* End gems */}
      <path
        d={diamondPath(0.9, 1.25)}
        fill={stroke}
        transform="translate(34 11)"
        opacity={0.55}
      />
      <path
        d={diamondPath(0.9, 1.25)}
        fill={stroke}
        transform="translate(286 11)"
        opacity={0.55}
      />

      {/* Center ornament */}
      <circle
        cx={160}
        cy={11}
        r={2.6}
        fill={stroke}
        opacity={0.18}
      />
      <circle
        cx={160}
        cy={11}
        r={1.6}
        fill={stroke}
        opacity={0.28}
      />
      <circle cx={160} cy={11} r={1.05} fill={`url(#${coreId})`} />
      <path
        d={starPath(1.1)}
        fill={stroke}
        transform="translate(160 11)"
        opacity={0.88}
      />
      <path
        d={diamondPath(0.45, 0.65)}
        fill={`url(#${jewelId})`}
        transform="translate(160 8.6)"
        opacity={0.75}
      />
      <path
        d={diamondPath(0.45, 0.65)}
        fill={`url(#${jewelId})`}
        transform="translate(160 13.4)"
        opacity={0.75}
      />
    </svg>
  );
};
