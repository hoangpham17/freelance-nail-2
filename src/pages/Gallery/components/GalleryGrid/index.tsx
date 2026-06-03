import React, { useEffect, useRef } from "react";
import { GalleryItem } from "../../types";
import GalleryItemComponent from "../GalleryItem";
import GalleryListLoading from "../GalleryListLoading";
import { Wrapper } from "@/based/components/Wrapper";

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
    return <GalleryListLoading />;
  }

  return (
    <div className="w-full">
      <Wrapper className="py-8 lg:py-12">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {items.map((item, index) => (
              <GalleryItemComponent
                key={item.id}
                item={item}
                onClick={() => onItemClick(index)}
              />
            ))}
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center text-center py-16 lg:py-24 px-4"
            role="status"
            aria-label="No gallery items"
          >
            <div
              className="w-16 h-px mb-6"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(249, 190, 92, 0.45), transparent)",
              }}
            />
            <p
              className="font-tangerine text-gold-gradient max-w-md"
              style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
            >
              No images in this collection yet. We're curating more moments of
              relaxation and beauty for you.
            </p>
            <div
              className="w-16 h-px mt-6"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(249, 190, 92, 0.45), transparent)",
              }}
            />
          </div>
        )}

        {/* Infinite scroll trigger and loading indicator */}
        {/* Only show skeleton when fetching next page or when there's a next page to load */}
        {(hasNextPage || isFetchingNextPage) && (
          <div ref={observerTarget} className="w-full mb-4 md:mb-8">
            {isFetchingNextPage && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full pt-6">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={`loading-${index}`}
                    className="gallery-card-shimmer gallery-card-shimmer--frame rounded-2xl"
                    aria-hidden
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default GalleryGrid;
