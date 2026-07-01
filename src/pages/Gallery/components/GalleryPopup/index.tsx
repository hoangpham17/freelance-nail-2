import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Skeleton } from "antd";
import { GalleryItem } from "../../types";
import GalleryMedia from "@/pages/Home/components/GallerySection/components/GalleryMedia";
import GalleryPopupVideo from "@/pages/Home/components/GalleryPopup/components/GalleryPopupVideo";
import { NavigationArrows } from "@/components/NavigationArrows";
import {
  PopupCloseButton,
  POPUP_CLOSE_OVERLAY_CLASS,
} from "@/components/PopupCloseButton";
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
        <PopupCloseButton
          onClick={onClose}
          className={POPUP_CLOSE_OVERLAY_CLASS}
        />
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
                className="!flex h-full items-center justify-center px-2"
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
                      fit="cover"
                      className="block mx-auto h-[60vh] md:h-[75vh] aspect-[3/4] rounded-lg"
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

          {items.length > 1 ? (
            <NavigationArrows
              onPrev={() => swiperRef.current?.slidePrev()}
              onNext={() => swiperRef.current?.slideNext()}
              className="absolute top-1/2 -left-2.5 -right-2.5 md:-left-12 md:-right-12 z-10 -translate-y-1/2 px-0"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default GalleryPopup;
