import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Wrapper } from "@/based/components/Wrapper";
import Header from "./components/Header";
import GalleryGrid from "./components/GalleryGrid";
import GalleryNavButton from "./components/GalleryNavButton";
import { useGalleryItems } from "./useGalleryItems";
import { GalleryItem as GalleryItemType } from "./types";
import {
  chunkGallerySlides,
  GALLERY_ITEMS_PER_SLIDE,
} from "./utils/chunkGallerySlides";
import { useIsLg } from "./hooks/useIsLg";
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
  const isLg = useIsLg();

  const slides = useMemo(
    () => chunkGallerySlides(galleryItems),
    [galleryItems],
  );

  const canNavigate = slides.length > 1;

  useEffect(() => {
    onGalleryItemsChange?.(galleryItems);
  }, [galleryItems, onGalleryItemsChange]);

  useEffect(() => {
    if (currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [slides.length, currentSlide]);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || swiper.destroyed) return;
    swiper.update();
  }, [isLg, slides.length]);

  const syncSlideIndex = useCallback((swiper: SwiperType) => {
    setCurrentSlide(swiper.realIndex);
  }, []);

  const goPrev = () => {
    if (!canNavigate) return;
    swiperRef.current?.slidePrev();
  };

  const goNext = () => {
    if (!canNavigate) return;
    swiperRef.current?.slideNext();
  };

  const goToSlide = (index: number) => {
    const swiper = swiperRef.current;
    if (!canNavigate || !swiper) return;
    if (swiper.params.loop) {
      swiper.slideToLoop(index);
    } else {
      swiper.slideTo(index);
    }
  };

  if (slides.length === 0) {
    return (
      <section className="home-section-gradient relative overflow-hidden py-10 md:py-16 lg:py-[60px]">
        <Wrapper className="relative z-[2] lg:!px-[120px]">
          <Header />
          <div className="mt-8">
            <GalleryGrid items={[]} variant="mosaic" />
          </div>
        </Wrapper>
      </section>
    );
  }

  return (
    <section
      className="home-section-gradient relative overflow-hidden py-10 md:py-16 lg:py-[60px]"
      data-gallery-section
    >
      <Wrapper className="relative z-[2] lg:!px-[120px]">
        <Header />
      </Wrapper>

      <div className="relative z-[2] mt-2 max-w-[1440px] mx-auto px-4 lg:px-[120px]">
        <div className="flex items-center gap-4">
          <GalleryNavButton
            direction="prev"
            onClick={goPrev}
            disabled={!canNavigate}
            className="hidden lg:flex"
          />

          <div className="flex-1 min-w-0 overflow-hidden">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                setCurrentSlide(swiper.realIndex);
              }}
              onSlideChange={syncSlideIndex}
              onSlideChangeTransitionEnd={syncSlideIndex}
              slidesPerView={1}
              spaceBetween={0}
              loop={canNavigate}
              speed={450}
              allowTouchMove={canNavigate}
              watchSlidesProgress
              className="gallery-home-swiper w-full"
              data-testid="gallery-home-swiper"
            >
              {slides.map((slideItems, slideIdx) => (
                <SwiperSlide
                  key={slideItems.map((item) => item.id).join("-") || slideIdx}
                  data-slide-index={slideIdx}
                >
                  <GalleryGrid
                    items={slideItems}
                    startIndex={slideIdx * GALLERY_ITEMS_PER_SLIDE}
                    onItemClick={onItemClick}
                    variant={isLg ? "mosaic" : "compact"}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <GalleryNavButton
            direction="next"
            onClick={goNext}
            disabled={!canNavigate}
            className="hidden lg:flex"
          />
        </div>

        {canNavigate ? (
          <div className="mt-6 lg:mt-8 flex justify-center items-center gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                className={clsx(
                  "h-3 transition-all duration-500 rounded-full",
                  currentSlide === idx
                    ? "w-[18px] bg-[#f9be5c]"
                    : "w-3 bg-white/40 hover:bg-white/60",
                )}
                aria-label={`Go to gallery slide ${idx + 1}`}
                aria-current={currentSlide === idx ? "true" : undefined}
                data-gallery-dot={idx}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default GallerySection;
