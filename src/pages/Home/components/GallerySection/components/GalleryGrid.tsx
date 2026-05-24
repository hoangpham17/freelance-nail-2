import React from "react";
import clsx from "clsx";
import { GalleryItem as GalleryItemType } from "../types";

interface GalleryGridProps {
  items: GalleryItemType[];
  /** Global index of items[0] in the full gallery list */
  startIndex?: number;
  onItemClick?: (index: number) => void;
  variant?: "mosaic" | "compact";
}

const GridCell: React.FC<{
  item: GalleryItemType;
  index: number;
  onItemClick?: (index: number) => void;
  className?: string;
}> = ({ item, index, onItemClick, className }) => {
  if (!item?.url) return null;

  return (
    <button
      type="button"
      onClick={() => onItemClick?.(index)}
      className={clsx(
        "group relative w-full overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-madison-gold",
        className,
      )}
    >
      <img
        src={item.url}
        alt=""
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </button>
  );
};

const CompactGrid: React.FC<GalleryGridProps> = ({
  items,
  startIndex = 0,
  onItemClick,
}) => (
  <div
    className={clsx(
      "grid gap-3 w-full",
      items.length === 1 ? "grid-cols-1 max-w-md mx-auto" : "grid-cols-2",
    )}
  >
    {items.map((item, i) => (
      <GridCell
        key={item.id}
        item={item}
        index={startIndex + i}
        onItemClick={onItemClick}
        className="aspect-[4/5] min-h-[140px] w-full"
      />
    ))}
  </div>
);

/** Figma mosaic layouts for 1–6 items per slide */
const MosaicGrid: React.FC<GalleryGridProps> = ({
  items,
  startIndex = 0,
  onItemClick,
}) => {
  const count = items.length;
  const cell = (i: number, className: string) => {
    const item = items[i];
    if (!item) return null;
    return (
      <GridCell
        key={item.id}
        item={item}
        index={startIndex + i}
        onItemClick={onItemClick}
        className={className}
      />
    );
  };

  if (count === 1) {
    return (
      <div className="flex justify-center w-full min-h-[320px] lg:min-h-[480px]">
        {cell(0, "w-full max-w-[720px] min-h-[320px] lg:min-h-[574px]")}
      </div>
    );
  }

  if (count === 2) {
    return (
      <div className="flex gap-5 w-full min-h-[320px] lg:min-h-[574px]">
        {cell(0, "flex-1 min-h-[320px] lg:min-h-[574px]")}
        {cell(1, "flex-1 min-h-[320px] lg:min-h-[574px]")}
      </div>
    );
  }

  if (count === 3) {
    return (
      <div className="flex gap-5 w-full min-h-[320px] lg:min-h-[574px]">
        {cell(0, "flex-1 min-h-[320px] lg:min-h-[574px]")}
        <div className="flex flex-1 max-w-[390px] flex-col gap-5">
          {cell(1, "flex-1 min-h-[150px] lg:min-h-[277px]")}
          {cell(2, "flex-1 min-h-[150px] lg:min-h-[277px]")}
        </div>
      </div>
    );
  }

  if (count === 4) {
    return (
      <div className="grid grid-cols-2 gap-5 w-full min-h-[320px] lg:min-h-[574px] lg:max-w-[820px] lg:mx-auto">
        {cell(0, "min-h-[160px] lg:min-h-[277px]")}
        {cell(1, "min-h-[160px] lg:min-h-[277px]")}
        {cell(2, "min-h-[160px] lg:min-h-[277px]")}
        {cell(3, "min-h-[160px] lg:min-h-[277px]")}
      </div>
    );
  }

  if (count === 5) {
    return (
      <div className="flex gap-5 w-full min-h-[320px] lg:min-h-[574px]">
        {cell(0, "flex-1 min-h-[320px] lg:min-h-[574px]")}
        <div className="flex w-full max-w-[390px] shrink-0 flex-[1.2] flex-col gap-5">
          <div className="flex flex-1 gap-5 min-h-[150px] lg:min-h-[277px]">
            {cell(1, "flex-1 h-full min-h-[150px]")}
            {cell(2, "flex-1 h-full min-h-[150px]")}
          </div>
          <div className="flex flex-1 gap-5 min-h-[150px] lg:min-h-[277px]">
            {cell(3, "flex-1 h-full min-h-[150px]")}
            {cell(4, "flex-1 h-full min-h-[150px]")}
          </div>
        </div>
      </div>
    );
  }

  // 6 — Figma: tall | 2×2 | tall
  return (
    <div className="flex gap-5 w-full min-h-[320px] lg:min-h-[574px]">
      {cell(0, "flex-1 min-h-[320px] lg:min-h-[574px]")}
      <div className="flex w-full max-w-[390px] shrink-0 flex-col gap-5">
        <div className="flex h-[150px] lg:h-[277px] gap-5">
          {cell(1, "flex-1 h-full")}
          {cell(2, "flex-1 h-full")}
        </div>
        <div className="flex h-[150px] lg:h-[277px] gap-5">
          {cell(3, "flex-1 h-full")}
          {cell(4, "flex-1 h-full")}
        </div>
      </div>
      {cell(5, "flex-1 min-h-[320px] lg:min-h-[574px]")}
    </div>
  );
};

const GalleryGrid: React.FC<GalleryGridProps> = (props) => {
  const { items, variant = "mosaic" } = props;

  if (items.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-madison-border text-madison-muted font-montserrat text-sm">
        No gallery images
      </div>
    );
  }

  if (variant === "compact") {
    return <CompactGrid {...props} />;
  }

  return <MosaicGrid {...props} />;
};

export default GalleryGrid;
