import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Skeleton } from "antd";
import { GalleryItem } from "../../types";
import SvgIcon from "@/based/SvgIcon";
import { NavigationArrows } from "@/components/NavigationArrows";

interface GalleryPopupProps {
  isOpen: boolean;
  items: GalleryItem[];
  selectedIndex: number;
  onClose: () => void;
}

const GalleryPopup: React.FC<GalleryPopupProps> = ({
  isOpen,
  items,
  selectedIndex,
  onClose,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") swiperRef.current?.slidePrev();
      if (event.key === "ArrowRight") swiperRef.current?.slideNext();
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Update Swiper when selectedIndex changes
  useEffect(() => {
    if (swiperRef.current && isOpen) {
      swiperRef.current.slideTo(selectedIndex);
    }
  }, [selectedIndex, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[101]">
      {/* Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-black/80"
        onClick={onClose}
      ></div>
      {/* Popup Inner */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-full w-[90%] lg:w-[60%] max-h-[90vh] z-[102]">
        {/* Close Button */}
        <button
          className="absolute -top-2.5 -right-2.5 lg:-top-2.5 lg:-right-2.5 w-8 h-8 lg:w-10 lg:h-10 bg-white border border-white rounded-full cursor-pointer transition-all duration-300 z-[2] hover:scale-110 active:scale-95 flex items-center justify-center"
          onClick={onClose}
          aria-label="Close popup"
        >
          <SvgIcon
            src={"/assets/svgs/x-close.svg"}
            ariaLabel="text"
            width={24}
            height={24}
            className="size-[24px] shrink-0"
          />
        </button>
        {/* Slider Wrapper */}
        <div className="relative">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Navigation]}
            slidesPerView={1}
            initialSlide={selectedIndex}
            loop={items.length > 1}
            className="gallery-popup-swiper"
          >
            {items.map((item, index) => (
              <SwiperSlide key={item.id || index} className="px-2">
                {item.url ? (
                  <div className="flex items-center justify-center min-h-[75vh] h-full">
                    <img
                      src={item.url}
                      alt="Gallery"
                      className="block mx-auto max-h-[75vh] w-auto rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center min-h-[400px]">
                    <Skeleton.Image
                      active
                      style={{
                        width: "100%",
                        maxWidth: "800px",
                        height: "400px",
                      }}
                    />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -left-8 -right-8 -translate-y-1/2 z-10 pointer-events-none">
            <NavigationArrows
              className="flex justify-between w-full mb-0 px-4"
              buttonClassName="bg-white/90 backdrop-blur-md shadow-lg pointer-events-auto"
              onPrev={() => swiperRef.current?.slidePrev()}
              onNext={() => swiperRef.current?.slideNext()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPopup;
