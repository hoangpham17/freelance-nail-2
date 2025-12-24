import React from "react";
import { Image } from "antd";
import { GalleryItem as GalleryItemType } from "../../types";
import clsx from "clsx";
import SvgIcon from "@/based/SvgIcon";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

interface GalleryItemProps {
  item: GalleryItemType;
  onClick: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item, onClick }) => {
  return (
    <div
      className="group relative w-full h-[420px] lg:h-[520px] rounded-xl lg:rounded-2xl overflow-hidden cursor-pointer bg-white shadow-md hover:shadow-xl transition-all duration-300"
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

      {item.description && (
        <div className="absolute bottom-3 left-3 right-3 lg:bottom-5 lg:left-5 lg:right-5 bg-white/60 rounded-2xl p-3 lg:p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 lg:gap-3 flex-1 min-w-0">
              <Image
                src="/assets/images/Gallery/frame-star.png"
                alt="Frame Star"
                className="!w-6 !h-6 object-cover"
                preview={false}
              />

              <p className={clsx(responsiveFontSizeArray(16, 24))}>
                {item.description || ""}
              </p>
            </div>

            <button
              className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              aria-label="Expand image"
              style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
            >
              <SvgIcon
                src="/assets/svgs/arrow-detail.svg"
                ariaLabel="text"
                width={22}
                height={22}
                className="shrink-0 text-black"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryItem;
