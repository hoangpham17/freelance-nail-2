import React, { useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import CustomDots from "@/based/components/CustomDots";
import { Skeleton } from "antd";
import clsx from "clsx";

interface GallerySliderProps {
  galleryImages: { id: string; url: string }[];
  onSlideChange?: (index: number) => void;
  loading?: boolean;
}

const GallerySlider: React.FC<GallerySliderProps> = ({
  galleryImages,
  onSlideChange,
  loading = false,
}) => {
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const gallerySliderRef = useRef<Slider | null>(null);

  const gallerySettings: Settings = {
    infinite: true,
    centerMode: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 400,
    cssEase: "linear",
    pauseOnHover: false,
    className: `[&_.slick-active:not(.slick-current)_.slide-item-custom]:-translate-x-[25%] 
    [&_.slick-active:not(.slick-current)_.slide-item-custom]:blur-sm 
    [&_.slick-active:not(.slick-current)_.slide-item-custom_img]:scale-75 
    [&_.slick-active:not(.slick-current)_.slide-item-custom]:z-[1] 
    [&_.slick-active.slick-current_.slide-item-custom]:z-[2]
    `,
    beforeChange: (_: unknown, next: number) => {
      setCurrentGalleryIndex(next);
      if (onSlideChange) {
        onSlideChange(next);
      }
    },
  };

  if (loading) {
    return (
      <div className="relative order-1 md:order-2">
        <div className="w-[315px] md:w-[437px] h-[300px] md:h-[428px]">
          <Skeleton.Image
            active
            style={{ width: "100%", height: "100%", borderRadius: "16px" }}
          />
        </div>
      </div>
    );
  }

  if (!galleryImages || galleryImages.length === 0) {
    return null;
  }

  return (
    <div className="relative order-1 md:order-2">
      <div className="relative overflow-visible">
        <div className="relative">
          <div
            className={clsx(
              "relative z-20 rounded-2xl overflow-hidden gallery-slider-custom"
            )}
          >
            <Slider ref={gallerySliderRef} {...gallerySettings}>
              {galleryImages.map((image, index) => {
                return (
                  <div
                    key={image.id}
                    data-slide-index={index}
                    className={clsx(
                      "slide-item-custom relative transition-all duration-400 md:!w-[437px] h-[300px] md:h-[428px] overflow-hidden"
                    )}
                  >
                    <img
                      src={image.url}
                      alt="Gallery"
                      className={clsx(
                        "object-cover rounded-2xl border-2 border-white w-full h-full transition-all duration-400"
                      )}
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <CustomDots
            position="bottom"
            totalSlides={galleryImages.length}
            currentIndex={currentGalleryIndex}
            onDotClick={(index) => {
              gallerySliderRef.current?.slickGoTo(index);
              setCurrentGalleryIndex(index);
              if (onSlideChange) {
                onSlideChange(index);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GallerySlider;
