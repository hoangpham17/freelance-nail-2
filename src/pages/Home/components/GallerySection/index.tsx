import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Wrapper } from "@/based/components/Wrapper";
import Header from "./components/Header";
import GalleryGrid from "./components/GalleryGrid";
import GalleryItem from "./components/GalleryItem";
import GalleryNavButton from "./components/GalleryNavButton";
import { useGalleryItems } from "./useGalleryItems";
import { GalleryItem as GalleryItemType } from "./types";
import {
  chunkGallerySlides,
  GALLERY_ITEMS_PER_SLIDE,
} from "./utils/chunkGallerySlides";
import { useIsXl } from "./hooks/useIsXl";
import clsx from "clsx";

interface GallerySectionProps {
  onItemClick?: (index: number) => void;
  onGalleryItemsChange?: (items: GalleryItemType[]) => void;
}

const STRIP_SWIPER_BREAKPOINTS = {
  0: {
    slidesPerView: 1.5,
    spaceBetween: 12,
  },
  768: {
    slidesPerView: 3.5,
    spaceBetween: 16,
  },
} as const;

const GallerySection: React.FC<GallerySectionProps> = ({
  onItemClick,
  onGalleryItemsChange,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const galleryItems = useGalleryItems();
  const [currentSlide, setCurrentSlide] = useState(0);
  const isXl = useIsXl();

  const mosaicSlides = useMemo(
    () => chunkGallerySlides(galleryItems),
    [galleryItems],
  );

  const canNavigateMosaic = mosaicSlides.length > 1;
  const canNavigateStrip = galleryItems.length > 1;
  const canNavigate = isXl ? canNavigateMosaic : canNavigateStrip;

  useEffect(() => {
    onGalleryItemsChange?.(galleryItems);
  }, [galleryItems, onGalleryItemsChange]);

  useEffect(() => {
    if (!isXl && currentSlide >= galleryItems.length) {
      setCurrentSlide(0);
      return;
    }
    if (isXl && currentSlide >= mosaicSlides.length) {
      setCurrentSlide(0);
    }
  }, [galleryItems.length, mosaicSlides.length, currentSlide, isXl]);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || swiper.destroyed) return;
    swiper.update();
  }, [isXl, mosaicSlides.length, galleryItems.length]);

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

  if (galleryItems.length === 0) {
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

  const paginationCount = isXl ? mosaicSlides.length : 0;

  return (
    <section
      className="home-section-gradient relative overflow-hidden py-10 md:py-16 lg:py-[60px]"
      data-gallery-section
    >
      <Wrapper className="relative z-[2] lg:!px-[120px]">
        <Header />
      </Wrapper>

      <div
        className={clsx(
          "relative z-[2] mt-2 max-w-[1440px] mx-auto",
          isXl ? "px-4 lg:px-[120px]" : "px-0",
        )}
      >
        <div className="flex items-center gap-4">
          <GalleryNavButton
            direction="prev"
            onClick={goPrev}
            disabled={!canNavigate}
            className="hidden xl:flex"
          />

          <div
            className={clsx(
              "flex-1 min-w-0",
              isXl ? "overflow-hidden" : "overflow-visible",
            )}
          >
            {isXl ? (
              <Swiper
                key="gallery-mosaic"
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  setCurrentSlide(swiper.realIndex);
                }}
                onSlideChange={syncSlideIndex}
                onSlideChangeTransitionEnd={syncSlideIndex}
                slidesPerView={1}
                spaceBetween={0}
                loop={canNavigateMosaic}
                speed={450}
                allowTouchMove={canNavigateMosaic}
                watchSlidesProgress
                className="gallery-home-swiper w-full"
                data-testid="gallery-home-swiper"
              >
                {mosaicSlides.map((slideItems, slideIdx) => (
                  <SwiperSlide
                    key={
                      slideItems.map((item) => item.id).join("-") || slideIdx
                    }
                    data-slide-index={slideIdx}
                  >
                    <GalleryGrid
                      items={slideItems}
                      startIndex={slideIdx * GALLERY_ITEMS_PER_SLIDE}
                      onItemClick={onItemClick}
                      variant="mosaic"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Swiper
                key="gallery-strip"
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  setCurrentSlide(swiper.realIndex);
                }}
                onSlideChange={syncSlideIndex}
                onSlideChangeTransitionEnd={syncSlideIndex}
                slidesPerView={1.5}
                spaceBetween={12}
                breakpoints={STRIP_SWIPER_BREAKPOINTS}
                loop={canNavigateStrip}
                speed={450}
                allowTouchMove={canNavigateStrip}
                watchSlidesProgress
                className="gallery-home-swiper gallery-home-swiper--strip w-full !overflow-visible px-4 md:px-6"
                data-testid="gallery-home-swiper"
              >
                {galleryItems.map((item, index) => (
                  <SwiperSlide key={item.id} className="!h-auto">
                    <GalleryItem
                      id={item.id}
                      url={item.url}
                      onClick={() => onItemClick?.(index)}
                      className="w-full"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          <GalleryNavButton
            direction="next"
            onClick={goNext}
            disabled={!canNavigate}
            className="hidden xl:flex"
          />
        </div>

        {paginationCount > 1 ? (
          <div className="mt-6 lg:mt-8 flex justify-center items-center gap-3">
            {Array.from({ length: paginationCount }, (_, idx) => (
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
