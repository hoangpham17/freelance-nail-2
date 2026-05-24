import React from "react";
import { Skeleton } from "antd";

export interface GalleryItemProps {
  id: string;
  url?: string;
  onClick?: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ url, onClick }) => {
  return (
    <div className="cursor-pointer px-2 md:px-3 group" onClick={onClick}>
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
