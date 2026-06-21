import React, { useEffect, useState } from "react";
import { GalleryItem as GalleryItemType } from "../../types";
import GalleryMedia from "@/pages/Home/components/GallerySection/components/GalleryMedia";
import GalleryVideoBadge from "@/pages/Home/components/GallerySection/components/GalleryVideoBadge";
import clsx from "clsx";

interface GalleryItemProps {
  item: GalleryItemType;
  onClick: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item, onClick }) => {
  const [mediaLoaded, setMediaLoaded] = useState(false);

  useEffect(() => {
    setMediaLoaded(false);
    if (!item.url || item.isVideo) return;

    const img = new Image();
    img.src = item.url;
    if (img.complete) {
      setMediaLoaded(true);
    }
  }, [item.url, item.isVideo]);

  return (
    <div
      className="group relative gallery-card-frame aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#252525]"
      style={{ cursor: "url('/assets/svgs/cursor-plus.svg') 24 24, pointer" }}
      onClick={onClick}
    >
      {!mediaLoaded && (
        <div
          className="absolute inset-0 z-[1] gallery-card-shimmer rounded-2xl"
          aria-hidden
        />
      )}

      {item.isVideo ? (
        <>
          <GalleryMedia
            url={item.url}
            isVideo
            onLoaded={() => setMediaLoaded(true)}
            className={clsx(
              "relative z-[2] size-full transition-transform duration-300 group-hover:scale-105",
              !mediaLoaded && "opacity-0",
            )}
          />
          <GalleryVideoBadge className="top-3 right-3 z-[3] md:top-4 md:right-4" />
        </>
      ) : (
        <img
          src={item.url}
          alt=""
          className={clsx(
            "relative z-[2] size-full object-cover transition-transform duration-300 group-hover:scale-105",
            !mediaLoaded && "opacity-0",
          )}
          onLoad={() => setMediaLoaded(true)}
        />
      )}
    </div>
  );
};

export default GalleryItem;
