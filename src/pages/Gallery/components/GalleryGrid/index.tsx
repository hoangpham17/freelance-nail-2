import React, { useMemo, useEffect, useRef } from "react";
import { GalleryItem } from "../../types";
import GalleryItemComponent from "../GalleryItem";
import { Wrapper } from "@/based/components/Wrapper";
import { Flex, Image, Skeleton } from "antd";

interface GalleryGridProps {
  items: GalleryItem[];
  loading: boolean;
  onItemClick: (index: number) => void;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({
  items,
  loading,
  onItemClick,
  hasNextPage = false,
  fetchNextPage,
  isFetchingNextPage = false,
}) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  const { firstThreeItems, remainingItems } = useMemo(() => {
    // If there are less than 3 items, don't show "First 3 items" section
    // Show all items in remainingItems instead
    if (items.length < 3) {
      return {
        firstThreeItems: [],
        remainingItems: items,
      };
    }
    const firstThree = items.slice(0, 3);
    const remaining = items.slice(3);
    return {
      firstThreeItems: firstThree,
      remainingItems: remaining,
    };
  }, [items]);

  // Infinite scroll observer - trigger when 500px from bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          fetchNextPage &&
          !isFetchingNextPage
        ) {
          fetchNextPage();
        }
      },
      {
        // rootMargin: "0px 0px 500px 0px" means trigger when element is 500px from bottom of viewport
        rootMargin: "0px 0px 500px 0px",
        threshold: 0,
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (loading) {
    return (
      <Wrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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
        {/* First 3 items - only show if there are at least 3 items */}
        {firstThreeItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
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
        <Flex align="center" justify="center" className="w-full mb-8 lg:mb-12">
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
        </Flex>

        {/* Remaining items grid */}
        {remainingItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-8">
            {remainingItems.map((item, index) => (
              <GalleryItemComponent
                key={item.id}
                item={item}
                onClick={() => onItemClick(index + firstThreeItems.length)}
              />
            ))}
          </div>
        )}

        {/* Infinite scroll trigger and loading indicator */}
        {/* Only show skeleton when fetching next page or when there's a next page to load */}
        {(hasNextPage || isFetchingNextPage) && (
          <div ref={observerTarget} className="w-full mb-4 md:mb-8">
            {isFetchingNextPage && (
              <div className="flex justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full">
                  {[...Array(3)].map((_, index) => (
                    <Skeleton.Image
                      key={`loading-${index}`}
                      active
                      style={{ width: "100%", height: "100%" }}
                      className="h-[420px] lg:h-[520px] rounded-xl lg:rounded-2xl overflow-hidden"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default GalleryGrid;
