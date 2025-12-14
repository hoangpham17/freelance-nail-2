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
    ? "relative overflow-hidden rounded-xl aspect-[16/10] w-full h-[140px] md:h-[270px] lg:h-[320px] cursor-pointer transition-transform duration-300 hover:-translate-y-1"
    : "relative overflow-hidden rounded-xl aspect-square w-full h-[140px] md:h-[250px] lg:h-[300px] cursor-pointer transition-transform duration-300 hover:-translate-y-1";

  const paddingClasses = isLarge ? "p-6 md:p-8" : "p-4 md:p-6";

  return (
    <div
      className={containerClasses}
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
                className={`absolute inset-0 flex flex-col justify-end ${paddingClasses} ${
                  textPosition === "right"
                    ? "md:items-end"
                    : textPosition === "left"
                    ? "items-start"
                    : "items-start"
                }`}
              >
                <span
                  className={clsx(
                    "md:max-w-[50%]",
                    responsiveFontSizeArray(32, 45)
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
