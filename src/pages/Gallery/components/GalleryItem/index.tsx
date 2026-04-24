import React from "react";
import { GalleryItem as GalleryItemType } from "../../types";

interface GalleryItemProps {
  item: GalleryItemType;
  onClick: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item, onClick }) => {
  return (
    <div
      className="group relative w-full h-[380px] lg:h-[460px] rounded-2xl overflow-hidden bg-white transition-all duration-300 shadow-[0_8px_32px_rgba(107,74,47,0.08)] hover:shadow-[0_16px_48px_rgba(107,74,47,0.14)]"
      style={{ cursor: "url('/assets/svgs/cursor-plus.svg') 24 24, pointer" }}
      onClick={onClick}
    >
      <div
        className="w-full h-full transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundImage: `url(${item.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
};

export default GalleryItem;
