import React from "react";
import { Skeleton } from "antd";
import clsx from "clsx";

export interface GalleryItemProps {
  id: string;
  url?: string;
  onClick?: () => void;
  className?: string;
}

const GalleryItem: React.FC<GalleryItemProps> = ({
  url,
  onClick,
  className,
}) => {
  return (
    <div
      className={clsx("cursor-pointer group", className)}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div
        className="relative overflow-hidden rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
        style={{ aspectRatio: "3 / 4" }}
      >
        {url ? (
          <div
            className="size-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${url})` }}
          />
        ) : (
          <Skeleton.Image active className="!w-full !h-full" />
        )}
      </div>
    </div>
  );
};

export default GalleryItem;
