import React from "react";
import { Wrapper } from "@/based/components/Wrapper";

/** Loading skeleton chỉ cho list gallery (filter/search). Không dùng full page. */
const GalleryListLoading: React.FC = () => {
  return (
    <Wrapper className="py-8 lg:py-12">
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        aria-hidden
      >
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="rounded-2xl overflow-hidden gallery-list-shimmer"
            style={{
              aspectRatio: "4/5",
              background:
                "linear-gradient(90deg, #252525 0%, #333333 50%, #252525 100%)",
              backgroundSize: "200% 100%",
            }}
          />
        ))}
      </div>
      <style>{`
        .gallery-list-shimmer {
          animation: gallery-shimmer 1.5s ease-in-out infinite;
        }
        @keyframes gallery-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </Wrapper>
  );
};

export default GalleryListLoading;
