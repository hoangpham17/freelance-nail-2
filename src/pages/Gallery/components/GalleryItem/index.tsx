import React from "react";
import { GalleryItem as GalleryItemType } from "../../types";
import GalleryMedia from "@/pages/Home/components/GallerySection/components/GalleryMedia";
import GalleryVideoBadge from "@/pages/Home/components/GallerySection/components/GalleryVideoBadge";

interface GalleryItemProps {
  item: GalleryItemType;
  onClick: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item, onClick }) => {
  return (
    <div
      className="group relative h-[380px] w-full overflow-hidden rounded-2xl bg-white shadow-[0_8px_32px_rgba(107,74,47,0.08)] transition-all duration-300 hover:shadow-[0_16px_48px_rgba(107,74,47,0.14)] lg:h-[460px]"
      style={{ cursor: "url('/assets/svgs/cursor-plus.svg') 24 24, pointer" }}
      onClick={onClick}
    >
      {item.isVideo ? (
        <>
          <GalleryMedia
            url={item.url}
            isVideo
            className="size-full transition-transform duration-300 group-hover:scale-110"
          />
          <GalleryVideoBadge className="top-3 right-3 md:top-4 md:right-4" />
        </>
      ) : (
        <div
          className="size-full transition-transform duration-300 group-hover:scale-110"
          style={{
            backgroundImage: `url(${item.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
    </div>
  );
};

export default GalleryItem;
