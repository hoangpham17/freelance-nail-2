import React from "react";
import { Skeleton } from "antd";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

export interface GalleryItemProps {
  id: string;
  url?: string;
  description?: string;
  textColor?: string;
  textPosition?: "left" | "right";
  size?: "large" | "small";
  onClick?: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({
  url,
  description,
  textColor,
  textPosition,
  size = "large",
  onClick,
}) => {
  const isLarge = size === "large";
  const containerClasses = isLarge
    ? " aspect-[16/10] lg:h-[320px]"
    : " aspect-square lg:h-[300px]";

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-xl w-full h-[240px] cursor-pointer transition-transform duration-300 hover:-translate-y-1",
        containerClasses
      )}
      onClick={onClick}
      style={{
        backgroundImage: url ? `url(${url})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {url ? (
        <>
          {description && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div
                className={`absolute inset-0 flex flex-col justify-end p-2 lg:p-4 ${
                  textPosition === "right"
                    ? "items-end"
                    : textPosition === "left"
                    ? "items-start"
                    : "items-start"
                }`}
              >
                <span
                  className={clsx(
                    "lg:max-w-[50%] leading-[24px] lg:leading-[54px] font-prata",
                    responsiveFontSizeArray(18, 45)
                  )}
                  style={{
                    color: textColor || "#ffffff",
                  }}
                >
                  {description}
                </span>
              </div>
            </>
          )}
        </>
      ) : (
        <Skeleton.Image
          active
          className="!w-full !h-full"
          style={{
            width: "100%",
            height: "100%",
            minHeight: "200px",
          }}
        />
      )}
    </div>
  );
};

export default GalleryItem;
