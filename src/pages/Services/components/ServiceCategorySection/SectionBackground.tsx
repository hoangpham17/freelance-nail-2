import React, { useMemo } from "react";
import clsx from "clsx";
import SvgIcon from "@/based/SvgIcon";
import { DecorItem } from "@/components/DecorItem";
import { useScreen } from "@/hooks/useScreen";

type DecorationType = "shape1" | "shape2" | "flower1" | "flower2" | "flower3";

const ASSETS: Record<DecorationType, { src: string }> = {
  shape1: { src: "/assets/images/HomePage/shape-1.svg" },
  shape2: { src: "/assets/images/HomePage/shape-2.svg" },
  flower1: { src: "/assets/images/HomePage/flower-1.svg" },
  flower2: { src: "/assets/images/HomePage/flower-2.svg" },
  flower3: { src: "/assets/images/HomePage/flower-3.svg" },
};

/** 6 slot cố định, mỗi slot một vị trí tách bạch — tránh 2 item sát nhau */
const SLOTS: {
  position: string;
  size: [number, number];
  types: { type: DecorationType; className: string; useDecorItem: boolean }[];
}[] = [
  {
    position: "top-12 left-0 lg:-left-[5%] -left-[12%]",
    size: [240, 150],
    types: [
      { type: "shape1", className: "text-[#E8DED840]", useDecorItem: false },
      {
        type: "flower1",
        className: "text-[#805D3D45] max-md:opacity-50",
        useDecorItem: true,
      },
    ],
  },
  {
    position: "top-16 right-0 lg:-right-[6%] -right-[10%]",
    size: [220, 140],
    types: [
      {
        type: "shape1",
        className: "text-[#805D3D30] rotate-90",
        useDecorItem: false,
      },
      {
        type: "flower2",
        className: "text-[#805D3D40] max-md:opacity-45",
        useDecorItem: true,
      },
    ],
  },
  {
    position: "bottom-16 left-0 lg:-left-[6%] -left-[14%]",
    size: [260, 165],
    types: [
      {
        type: "shape2",
        className: "text-[#E8DED835] -rotate-45",
        useDecorItem: false,
      },
      {
        type: "flower2",
        className: "text-[#805D3D35] max-md:opacity-40",
        useDecorItem: true,
      },
    ],
  },
  {
    position: "bottom-20 right-0 lg:-right-[6%] -right-[12%]",
    size: [230, 145],
    types: [
      {
        type: "shape2",
        className: "text-[#805D3D35] rotate-45",
        useDecorItem: false,
      },
      {
        type: "flower3",
        className: "text-[#805D3D32] max-md:opacity-40",
        useDecorItem: true,
      },
    ],
  },
  {
    position: "top-[380px] right-[12%] lg:right-[18%]",
    size: [160, 100],
    types: [
      {
        type: "flower1",
        className: "text-[#805D3D38] max-md:opacity-45",
        useDecorItem: true,
      },
      {
        type: "flower3",
        className: "text-[#805D3D40] max-md:opacity-45",
        useDecorItem: true,
      },
    ],
  },
  {
    position: "top-[300px] left-[2%] lg:left-[2%]",
    size: [150, 95],
    types: [
      {
        type: "flower3",
        className: "text-[#805D3D38] max-md:opacity-45",
        useDecorItem: true,
      },
      {
        type: "flower1",
        className: "text-[#805D3D35] max-md:opacity-40",
        useDecorItem: true,
      },
    ],
  },
];

/**
 * Mỗi section: chọn đúng 4 slot phân tán (không 2 slot cùng cạnh), mỗi slot 1 decoration.
 * Preset để đảm bảo không có section trống và không có 2 item sát nhau.
 */
const SLOT_PRESETS: number[][] = [
  [0, 3, 4, 5], // top-left, bottom-right, mid-right, mid-left
  [1, 2, 4, 5], // top-right, bottom-left, mid-right, mid-left
  [0, 1, 2, 3], // bốn góc
  [0, 2, 4], // left + mid-right (3 item)
  [1, 3, 5], // right + mid-left (3 item)
  [0, 3, 5], // top-left, bottom-right, mid-left
  [1, 2, 4], // top-right, bottom-left, mid-right
  [2, 3, 4, 5], // bottom + mid
];

function getDecorationsForSection(sectionIndex: number): {
  position: string;
  size: [number, number];
  type: DecorationType;
  className: string;
  useDecorItem: boolean;
}[] {
  const preset = SLOT_PRESETS[sectionIndex % SLOT_PRESETS.length];
  const slotIndices = preset;
  const out: {
    position: string;
    size: [number, number];
    type: DecorationType;
    className: string;
    useDecorItem: boolean;
  }[] = [];
  slotIndices.forEach((slotIdx, i) => {
    const slot = SLOTS[slotIdx];
    const variant = (sectionIndex + i) % slot.types.length;
    const t = slot.types[variant];
    out.push({
      position: slot.position,
      size: slot.size,
      type: t.type,
      className: t.className,
      useDecorItem: t.useDecorItem,
    });
  });
  return out;
}

type SectionBackgroundProps = {
  sectionIndex: number;
};

export const SectionBackground: React.FC<SectionBackgroundProps> = ({
  sectionIndex,
}) => {
  const { isDesktop } = useScreen();
  const decorations = useMemo(
    () => getDecorationsForSection(sectionIndex),
    [sectionIndex],
  );

  return (
    <div
      className="absolute inset-0 z-0 max-w-[1920px] mx-auto pointer-events-none overflow-hidden"
      aria-hidden
    >
      {decorations.map((dec, i) => {
        const [wDesktop, wMobile] = dec.size;
        const width = isDesktop ? wDesktop : wMobile;
        const height = isDesktop
          ? Math.round(wDesktop * 0.85)
          : Math.round(wMobile * 0.85);
        const asset = ASSETS[dec.type];
        const content = (
          <SvgIcon
            src={asset.src}
            ariaLabel=""
            width={width}
            height={height}
            className={clsx("shrink-0", dec.className)}
          />
        );
        const key = `${sectionIndex}-${i}-${dec.type}-${dec.position}`;
        if (dec.useDecorItem) {
          return (
            <DecorItem
              key={key}
              isMovingWhenScroll
              width={width}
              height={height}
              className={clsx(dec.position, "opacity-70")}
            >
              {content}
            </DecorItem>
          );
        }
        return (
          <div
            key={key}
            className={clsx("absolute", dec.position, "opacity-70")}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};
