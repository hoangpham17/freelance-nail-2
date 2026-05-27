import { useId } from "react";
import clsx from "clsx";

export type OrnamentalDividerProps = {
  className?: string;
};

/**
 * Soft ornamental section divider — visible tapered horizontal lines,
 * flowing center petals. Uses currentColor for theming.
 */
export const OrnamentalDivider: React.FC<OrnamentalDividerProps> = ({
  className,
}) => {
  const uid = useId().replace(/:/g, "");
  const leftFadeId = `od-left-${uid}`;
  const rightFadeId = `od-right-${uid}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 22"
      width={320}
      height={22}
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
          id={leftFadeId}
          x1={0}
          y1={11}
          x2={122}
          y2={11}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="currentColor" stopOpacity={0} />
          <stop offset="18%" stopColor="currentColor" stopOpacity={0.55} />
          <stop offset="100%" stopColor="currentColor" stopOpacity={0.95} />
        </linearGradient>
        <linearGradient
          id={rightFadeId}
          x1={198}
          y1={11}
          x2={320}
          y2={11}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="currentColor" stopOpacity={0.95} />
          <stop offset="82%" stopColor="currentColor" stopOpacity={0.55} />
          <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
        </linearGradient>
      </defs>

      {/* Horizontal lines — stroke so they stay visible */}
      <line
        x1={0}
        y1={11}
        x2={122}
        y2={11}
        stroke={`url(#${leftFadeId})`}
        strokeWidth={0.7}
        strokeLinecap="round"
      />
      <line
        x1={198}
        y1={11}
        x2={320}
        y2={11}
        stroke={`url(#${rightFadeId})`}
        strokeWidth={0.7}
        strokeLinecap="round"
      />

      <circle cx={122} cy={11} r={0.6} fill="currentColor" opacity={0.82} />
      <circle cx={198} cy={11} r={0.6} fill="currentColor" opacity={0.82} />

      <path
        d="M 160 11 C 153 7.8 138 7.4 122 11 C 138 14.6 153 14.2 160 11 Z"
        fill="currentColor"
        opacity={0.92}
      />
      <path
        d="M 160 11 C 167 7.8 182 7.4 198 11 C 182 14.6 167 14.2 160 11 Z"
        fill="currentColor"
        opacity={0.92}
      />

      <circle cx={160} cy={7.15} r={1.15} fill="currentColor" opacity={0.2} />
      <circle cx={160} cy={14.85} r={1.15} fill="currentColor" opacity={0.2} />
      <circle cx={160} cy={7.15} r={0.78} fill="currentColor" opacity={0.62} />
      <circle cx={160} cy={14.85} r={0.78} fill="currentColor" opacity={0.62} />
      <circle cx={160} cy={7.15} r={0.4} fill="currentColor" opacity={1} />
      <circle cx={160} cy={14.85} r={0.4} fill="currentColor" opacity={1} />
    </svg>
  );
};
