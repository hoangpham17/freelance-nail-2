import { useId } from "react";
import clsx from "clsx";

type DecoPath = {
  d: string;
  strokeWidth: number;
  opacity?: number;
};

type DecoLayer = {
  /** Absolute sub-region inside the section */
  regionClassName: string;
  preserveAspectRatio: string;
  gradient: { x1: string; y1: string; x2: string; y2: string };
  paths: DecoPath[];
};

type DecoPreset = {
  layers: DecoLayer[];
};

const DECO_VIEWBOX = "0 0 110 100";
/** Gradient peak + path multiplier — keep lines subtle on /services */
const PEAK_OPACITY = 0.24;
const PATH_OPACITY_SCALE = 0.88;

/** Each layer is a separate positioned SVG so curves spread across the section */
const SERVICE_DECO_PRESETS: DecoPreset[] = [
  {
    layers: [
      {
        regionClassName: "top-2 left-0 w-[42%] h-[32%]",
        preserveAspectRatio: "xMinYMin slice",
        gradient: { x1: "0%", y1: "0%", x2: "100%", y2: "100%" },
        paths: [
          { d: "M-4 18 C20 6, 38 24, 58 12 S92 4, 108 16", strokeWidth: 1.05 },
        ],
      },
      {
        regionClassName: "top-[18%] right-0 w-[48%] h-[36%]",
        preserveAspectRatio: "xMaxYMin slice",
        gradient: { x1: "100%", y1: "0%", x2: "0%", y2: "100%" },
        paths: [
          {
            d: "M108 10 Q80 26, 56 16 T22 24",
            strokeWidth: 0.95,
            opacity: 0.72,
          },
        ],
      },
      {
        regionClassName: "bottom-[22%] left-[6%] w-[50%] h-[34%]",
        preserveAspectRatio: "xMinYMid slice",
        gradient: { x1: "0%", y1: "50%", x2: "100%", y2: "50%" },
        paths: [
          { d: "M0 48 C24 62, 48 44, 72 58 S104 52, 112 60", strokeWidth: 1 },
        ],
      },
      {
        regionClassName: "bottom-4 right-2 w-[44%] h-[30%]",
        preserveAspectRatio: "xMaxYMax slice",
        gradient: { x1: "100%", y1: "100%", x2: "0%", y2: "0%" },
        paths: [
          {
            d: "M106 72 C88 58, 68 78, 48 64 S20 70, 6 82",
            strokeWidth: 0.9,
            opacity: 0.65,
          },
        ],
      },
    ],
  },
  {
    layers: [
      {
        regionClassName: "top-0 left-[8%] w-[38%] h-[28%]",
        preserveAspectRatio: "xMidYMin slice",
        gradient: { x1: "50%", y1: "0%", x2: "50%", y2: "100%" },
        paths: [
          { d: "M8 26 C30 14, 52 30, 78 18 S104 12, 108 22", strokeWidth: 1 },
        ],
      },
      {
        regionClassName: "top-[35%] right-0 w-[40%] h-[30%]",
        preserveAspectRatio: "xMaxYMid slice",
        gradient: { x1: "100%", y1: "30%", x2: "0%", y2: "70%" },
        paths: [
          {
            d: "M112 42 C94 56, 72 38, 54 52 S28 60, 10 46",
            strokeWidth: 1.05,
          },
        ],
      },
      {
        regionClassName: "bottom-[8%] left-0 w-[46%] h-[38%]",
        preserveAspectRatio: "xMinYMax slice",
        gradient: { x1: "0%", y1: "100%", x2: "100%", y2: "0%" },
        paths: [
          {
            d: "M-6 62 Q20 78, 44 66 T86 74 T102 58",
            strokeWidth: 0.95,
            opacity: 0.68,
          },
        ],
      },
      {
        regionClassName: "bottom-[30%] right-[5%] w-[42%] h-[28%]",
        preserveAspectRatio: "xMaxYMid slice",
        gradient: { x1: "100%", y1: "50%", x2: "0%", y2: "50%" },
        paths: [
          { d: "M96 38 C78 52, 58 34, 38 48 S12 54, 4 42", strokeWidth: 0.88 },
        ],
      },
    ],
  },
  {
    layers: [
      {
        regionClassName: "top-4 right-[12%] w-[45%] h-[30%]",
        preserveAspectRatio: "xMaxYMin slice",
        gradient: { x1: "100%", y1: "0%", x2: "0%", y2: "80%" },
        paths: [
          { d: "M104 14 C86 28, 64 12, 46 26 S18 32, 8 20", strokeWidth: 1.02 },
        ],
      },
      {
        regionClassName: "top-[42%] left-0 w-[36%] h-[32%]",
        preserveAspectRatio: "xMinYMid slice",
        gradient: { x1: "0%", y1: "20%", x2: "100%", y2: "80%" },
        paths: [
          {
            d: "M2 36 C18 50, 36 32, 52 46 S78 40, 94 48",
            strokeWidth: 0.92,
            opacity: 0.7,
          },
        ],
      },
      {
        regionClassName: "bottom-6 left-[15%] w-[52%] h-[32%]",
        preserveAspectRatio: "xMidYMax slice",
        gradient: { x1: "30%", y1: "100%", x2: "70%", y2: "0%" },
        paths: [
          { d: "M0 54 C22 68, 46 50, 70 64 S100 58, 110 66", strokeWidth: 1.08 },
        ],
      },
      {
        regionClassName: "bottom-[18%] right-0 w-[38%] h-[34%]",
        preserveAspectRatio: "xMaxYMax slice",
        gradient: { x1: "100%", y1: "100%", x2: "0%", y2: "20%" },
        paths: [
          {
            d: "M108 58 Q86 44, 64 56 T30 50 T8 62",
            strokeWidth: 0.9,
            opacity: 0.62,
          },
        ],
      },
    ],
  },
  {
    layers: [
      {
        regionClassName: "top-[10%] left-0 w-[50%] h-[26%]",
        preserveAspectRatio: "xMinYMin slice",
        gradient: { x1: "0%", y1: "0%", x2: "100%", y2: "60%" },
        paths: [
          { d: "M-2 24 C16 12, 34 28, 54 16 S88 8, 106 20", strokeWidth: 1 },
        ],
      },
      {
        regionClassName: "top-[28%] right-2 w-[44%] h-[28%]",
        preserveAspectRatio: "xMaxYMid slice",
        gradient: { x1: "100%", y1: "40%", x2: "0%", y2: "60%" },
        paths: [
          {
            d: "M110 34 C92 48, 70 30, 50 44 S24 50, 6 38",
            strokeWidth: 0.98,
            opacity: 0.75,
          },
        ],
      },
      {
        regionClassName: "bottom-[12%] left-2 w-[40%] h-[36%]",
        preserveAspectRatio: "xMinYMax slice",
        gradient: { x1: "0%", y1: "100%", x2: "80%", y2: "30%" },
        paths: [
          { d: "M4 70 C22 56, 40 76, 60 62 S88 54, 102 68", strokeWidth: 1.05 },
        ],
      },
      {
        regionClassName: "bottom-2 right-[8%] w-[46%] h-[30%]",
        preserveAspectRatio: "xMaxYMax slice",
        gradient: { x1: "80%", y1: "100%", x2: "20%", y2: "0%" },
        paths: [
          {
            d: "M98 64 C80 78, 58 60, 40 74 S14 80, 2 68",
            strokeWidth: 0.88,
            opacity: 0.66,
          },
        ],
      },
    ],
  },
  {
    layers: [
      {
        regionClassName: "top-0 right-0 w-[40%] h-[34%]",
        preserveAspectRatio: "xMaxYMin slice",
        gradient: { x1: "100%", y1: "10%", x2: "0%", y2: "90%" },
        paths: [
          {
            d: "M106 8 C88 22, 66 6, 48 20 S20 26, 6 14",
            strokeWidth: 1.02,
          },
        ],
      },
      {
        regionClassName: "top-[48%] left-[4%] w-[42%] h-[28%]",
        preserveAspectRatio: "xMinYMid slice",
        gradient: { x1: "0%", y1: "50%", x2: "100%", y2: "50%" },
        paths: [
          {
            d: "M0 42 Q22 56, 46 44 T82 52 T104 40",
            strokeWidth: 0.95,
            opacity: 0.7,
          },
        ],
      },
      {
        regionClassName: "bottom-[26%] right-0 w-[48%] h-[32%]",
        preserveAspectRatio: "xMaxYMid slice",
        gradient: { x1: "100%", y1: "60%", x2: "0%", y2: "40%" },
        paths: [
          { d: "M112 46 C94 60, 72 42, 52 56 S26 62, 8 50", strokeWidth: 1 },
        ],
      },
      {
        regionClassName: "bottom-4 left-[10%] w-[44%] h-[30%]",
        preserveAspectRatio: "xMinYMax slice",
        gradient: { x1: "20%", y1: "100%", x2: "80%", y2: "0%" },
        paths: [
          {
            d: "M6 68 C28 54, 50 74, 72 60 S100 66, 108 72",
            strokeWidth: 0.9,
            opacity: 0.64,
          },
        ],
      },
    ],
  },
  {
    layers: [
      {
        regionClassName: "top-[6%] left-[12%] w-[44%] h-[30%]",
        preserveAspectRatio: "xMidYMin slice",
        gradient: { x1: "40%", y1: "0%", x2: "60%", y2: "100%" },
        paths: [
          {
            d: "M10 20 C32 8, 54 24, 76 12 S102 6, 108 18",
            strokeWidth: 1.05,
          },
        ],
      },
      {
        regionClassName: "top-[38%] right-[6%] w-[38%] h-[30%]",
        preserveAspectRatio: "xMaxYMid slice",
        gradient: { x1: "100%", y1: "35%", x2: "0%", y2: "65%" },
        paths: [
          {
            d: "M104 40 C86 54, 64 36, 44 50 S18 56, 4 44",
            strokeWidth: 0.92,
            opacity: 0.72,
          },
        ],
      },
      {
        regionClassName: "bottom-[10%] left-0 w-[48%] h-[34%]",
        preserveAspectRatio: "xMinYMax slice",
        gradient: { x1: "0%", y1: "90%", x2: "100%", y2: "10%" },
        paths: [
          { d: "M2 76 C24 62, 48 84, 70 70 S98 64, 106 78", strokeWidth: 1.08 },
        ],
      },
      {
        regionClassName: "bottom-[32%] right-0 w-[40%] h-[28%]",
        preserveAspectRatio: "xMaxYMid slice",
        gradient: { x1: "90%", y1: "50%", x2: "10%", y2: "50%" },
        paths: [
          {
            d: "M108 36 Q84 50, 62 38 T28 46 T6 34",
            strokeWidth: 0.88,
            opacity: 0.6,
          },
        ],
      },
    ],
  },
];

export type ServiceSectionDecoLinesProps = {
  /** 1-based section index from Services page */
  sectionIndex: number;
  className?: string;
};

/** Per-category decorative gold curves — scattered layers, bolder strokes */
export const ServiceSectionDecoLines: React.FC<ServiceSectionDecoLinesProps> = ({
  sectionIndex,
  className,
}) => {
  const baseId = useId().replace(/:/g, "");
  const preset =
    SERVICE_DECO_PRESETS[(sectionIndex - 1) % SERVICE_DECO_PRESETS.length];

  return (
    <div
      className={clsx(
        "pointer-events-none absolute inset-0 z-[1] overflow-hidden",
        className,
      )}
      aria-hidden
    >
      {preset.layers.map((layer, layerIndex) => {
        const gradientId = `${baseId}-${layerIndex}`;
        return (
          <div
            key={layerIndex}
            className={clsx("absolute overflow-hidden", layer.regionClassName)}
          >
            <svg
              className="h-full w-full"
              viewBox={DECO_VIEWBOX}
              preserveAspectRatio={layer.preserveAspectRatio}
              fill="none"
            >
              <defs>
                <linearGradient
                  id={gradientId}
                  x1={layer.gradient.x1}
                  y1={layer.gradient.y1}
                  x2={layer.gradient.x2}
                  y2={layer.gradient.y2}
                  gradientUnits="objectBoundingBox"
                >
                  <stop offset="0%" stopColor="#F9BE5C" stopOpacity="0" />
                  <stop offset="45%" stopColor="#F9BE5C" stopOpacity={PEAK_OPACITY} />
                  <stop offset="100%" stopColor="#F9BE5C" stopOpacity="0" />
                </linearGradient>
              </defs>
              {layer.paths.map((path, pathIndex) => (
                <path
                  key={pathIndex}
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
      })}
    </div>
  );
};
