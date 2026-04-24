import React from "react";
import { Skeleton } from "antd";

export interface GalleryItemProps {
  id: string;
  url?: string;
  onClick?: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ url, onClick }) => {
  return (
    <div className="px-4 group cursor-pointer" onClick={onClick}>
      <div className="relative border-2 border-[#B2866D] rounded-t-[300px] rounded-b-[32px] transition-all duration-500 p-1.5 md:p-3">
        <div
          className="relative overflow-hidden rounded-t-[300px] rounded-b-[32px]"
          style={{ aspectRatio: "408 / 633" }}
        >
          {url ? (
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${url})` }}
            />
          ) : (
            <Skeleton.Image active className="!w-full !h-full" />
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;
