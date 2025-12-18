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
      <Wrapper className="py-8 lg:py-12">
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
    <div className="w-full pt-16 lg:pt-20">
      <Wrapper className="py-8 lg:py-12">
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
          <Image
            src="/assets/images/Gallery/control-your-day.png"
            alt="Control Your Day"
            className="w-full"
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
