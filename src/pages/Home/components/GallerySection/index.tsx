import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Wrapper } from "@/based/components/Wrapper";
import Header from "./components/Header";
import GalleryItem from "./components/GalleryItem";
import { useGalleryItems } from "./useGalleryItems";
import { GalleryItem as GalleryItemType } from "./types";
import { Background } from "./components/Background";
import clsx from "clsx";

interface GallerySectionProps {
  onItemClick?: (index: number) => void;
  onGalleryItemsChange?: (items: GalleryItemType[]) => void;
}

const GallerySection: React.FC<GallerySectionProps> = ({
  onItemClick,
  onGalleryItemsChange,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const galleryItems = useGalleryItems();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (onGalleryItemsChange) {
      onGalleryItemsChange(galleryItems);
    }
  }, [galleryItems, onGalleryItemsChange]);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handleSlideChange = (swiper: SwiperType) => {
    const realIndex = swiper.realIndex;
    if (realIndex !== undefined) {
      setCurrentSlide(realIndex);
    }
  };

  return (
    <section className="py-4 md:py-16 bg-[#FEF5F1] overflow-hidden relative">
      <Background />
      <Wrapper className="z-[2] relative">
        <Header onPrev={handlePrev} onNext={handleNext} />
      </Wrapper>

      <div className="mt-4 z-[2] relative">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}
          modules={[Navigation, Autoplay]}
          slidesPerView={4} // Shows 3 full items + 0.5 on each side when centered
          centeredSlides={true}
          spaceBetween={0}
          loop={true}
          speed={500}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.25, // 1 full + 0.25 on right side on mobile
              centeredSlides: false,
            },
            640: {
              slidesPerView: 2, // 1 full + 0.5 on each side on small tablets
            },
            1024: {
              slidesPerView: 2.5, // 1.5 full + 0.5 on each side on tablets
            },
            1280: {
              slidesPerView: 4, // 3 full + 0.5 on each side on desktop
            },
          }}
          className="gallery-swiper"
        >
          {galleryItems.map((item, index) => (
            <SwiperSlide key={item.id}>
              <GalleryItem
                id={item.id}
                url={item.url}
                onClick={() => onItemClick?.(index)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Dots - Mobile Only */}
      {galleryItems.length > 1 && (
        <div className="md:hidden flex justify-center items-center gap-3 z-30 mt-6">
          {galleryItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => swiperRef.current?.slideToLoop(idx)}
              className={clsx(
                "h-2 transition-all duration-500 rounded-full bg-[#B2866D]",
                currentSlide === idx ? "w-10 opacity-100" : "w-2 opacity-40",
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default GallerySection;
