import React from "react";
import { Wrapper } from "@/based/components/Wrapper";

/** Loading skeleton chỉ cho list gallery (filter/search). Không dùng full page. */
const GalleryListLoading: React.FC = () => {
  return (
    <Wrapper className="py-8 lg:py-12 max-w-[1440px] 2xl:max-w-[1680px]">
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8"
        aria-hidden
      >
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="gallery-card-shimmer gallery-card-shimmer--frame rounded-2xl"
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default GalleryListLoading;
