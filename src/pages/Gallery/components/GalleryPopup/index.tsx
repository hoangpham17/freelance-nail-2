import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Skeleton } from "antd";
import { GalleryItem } from "../../types";
import GalleryMedia from "@/pages/Home/components/GallerySection/components/GalleryMedia";
import GalleryPopupVideo from "@/pages/Home/components/GalleryPopup/components/GalleryPopupVideo";
import SvgIcon from "@/based/SvgIcon";
import { NavigationArrows } from "@/components/NavigationArrows";
import galleryContent from "@/content/gallery.json";

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
  const [activeSlideIndex, setActiveSlideIndex] = useState(selectedIndex);

  const galleryImageAlt = (
    galleryContent as { popup?: { imageAlt?: string } }
  ).popup?.imageAlt ?? "Gallery";

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
      setActiveSlideIndex(selectedIndex);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, selectedIndex]);

  useEffect(() => {
    if (swiperRef.current && isOpen) {
      swiperRef.current.slideTo(selectedIndex);
    }
  }, [selectedIndex, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[101]">
      <div
        className="absolute top-0 left-0 w-full h-full bg-black/80"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-full w-[90%] lg:w-[60%] max-h-[95vh] z-[102]">
        <button
          className="absolute -top-2.5 -right-2.5 lg:-top-2.5 lg:-right-2.5 z-[2] flex size-8 lg:size-10 cursor-pointer items-center justify-center rounded-full border border-madison-gold bg-madison-black-soft/80 shadow-[0_10px_26px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95"
          onClick={onClose}
          aria-label="Close popup"
        >
          <SvgIcon
            src={"/assets/svgs/x-close.svg"}
            ariaLabel="text"
            width={24}
            height={24}
            className="size-[24px] shrink-0 text-madison-gold"
          />
        </button>
        <div className="relative">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setActiveSlideIndex(swiper.realIndex);
            }}
            onSlideChange={(swiper) => setActiveSlideIndex(swiper.realIndex)}
            modules={[Navigation]}
            slidesPerView={1}
            initialSlide={selectedIndex}
            loop={items.length > 1}
            className="gallery-popup-swiper"
          >
            {items.map((item, index) => (
              <SwiperSlide
                key={item.id || index}
                className="!flex items-center justify-center px-2"
              >
                {item.url ? (
                  item.isVideo ? (
                    <GalleryPopupVideo
                      url={item.url}
                      alt={galleryImageAlt}
                      isActive={activeSlideIndex === index}
                    />
                  ) : (
                    <GalleryMedia
                      url={item.url}
                      alt={galleryImageAlt}
                      fit="contain"
                      className="block mx-auto max-h-[75vh] w-auto rounded-lg"
                    />
                  )
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

          <div className="absolute top-1/2 -left-4 -right-4 md:-left-6 md:-right-6 -translate-y-1/2 z-10 pointer-events-none">
            <NavigationArrows
              className="flex justify-between w-full mb-0 px-2 md:px-4"
              buttonClassName="bg-black/40 backdrop-blur-md shadow-[0_10px_26px_rgba(0,0,0,0.45)]"
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
