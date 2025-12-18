import React, { useMemo } from "react";
import { GalleryItem } from "../../types";
import GalleryItemComponent from "../GalleryItem";
import { Wrapper } from "@/based/components/Wrapper";
import { Image, Skeleton } from "antd";

interface GalleryGridProps {
  items: GalleryItem[];
  loading: boolean;
  onItemClick: (index: number) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({
  items,
  loading,
  onItemClick,
}) => {
  const { firstThreeItems, remainingItems } = useMemo(() => {
    const firstThree = items.slice(0, 3);
    const remaining = items.slice(3);
    return {
      firstThreeItems: firstThree,
      remainingItems: remaining,
    };
  }, [items]);

  if (loading) {
    return (
      <Wrapper>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {[...Array(6)].map((_, index) => (
            <Skeleton.Image
              key={index}
              active
              style={{ width: "100%", aspectRatio: "1/1" }}
            />
          ))}
        </div>
      </Wrapper>
    );
  }

  return (
    <div className="w-full">
      <Wrapper>
        {/* First 3 items */}
        {firstThreeItems.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12">
            {firstThreeItems.map((item, index) => (
              <GalleryItemComponent
                key={item.id}
                item={item}
                onClick={() => onItemClick(index)}
              />
            ))}
          </div>
        )}

        {/* Control Your Day Image */}
        <div className="w-full mb-8 lg:mb-12">
          {/* Mobile Image */}
          <Image
            src="/assets/images/Gallery/control-your-day-mobile.png"
            alt="Control Your Day"
            className="block lg:hidden mx-auto"
            style={{ height: "auto", maxWidth: "375px" }}
            preview={false}
          />
          {/* Desktop Image */}
          <Image
            src="/assets/images/Gallery/control-your-day-desktop.png"
            alt="Control Your Day"
            className="hidden lg:block w-full"
            style={{ height: "auto" }}
            preview={false}
          />
        </div>

        {/* Remaining items grid */}
        {remainingItems.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {remainingItems.map((item, index) => (
              <GalleryItemComponent
                key={item.id}
                item={item}
                onClick={() => onItemClick(index + firstThreeItems.length)}
              />
            ))}
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default GalleryGrid;
