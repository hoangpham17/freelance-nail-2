import React from "react";
import { Skeleton } from "antd";
import clsx from "clsx";
import GalleryMedia from "../GalleryMedia";
import GalleryVideoBadge from "../GalleryVideoBadge";

export interface GalleryItemProps {
  id: string;
  url?: string;
  isVideo?: boolean;
  onClick?: () => void;
  className?: string;
}

const GalleryItem: React.FC<GalleryItemProps> = ({
  url,
  isVideo,
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
          isVideo ? (
            <>
              <GalleryMedia
                url={url}
                isVideo
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <GalleryVideoBadge />
            </>
          ) : (
            <div
              className="size-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${url})` }}
            />
          )
        ) : (
          <Skeleton.Image active className="!w-full !h-full" />
        )}
      </div>
    </div>
  );
};

export default GalleryItem;
