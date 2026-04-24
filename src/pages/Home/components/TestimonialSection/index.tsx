import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Wrapper } from "@/based/components/Wrapper";
import Header from "./components/Header";
import TestimonialCard from "./components/TestimonialCard";
import TestimonialPopup from "./components/TestimonialPopup";
import { useTestimonials } from "./useTestimonials";
import { NavigationArrows } from "@/components/NavigationArrows";
import { useHomeTitleBlock } from "../../useHomeTitleBlock";
import { AIRTABLE_ENDPOINTS } from "@/services/airtable.service";
import "./styles.css";
import { Background } from "./components/Background";

const TestimonialSection: React.FC = () => {
  const { getBlockBySection } = useHomeTitleBlock();
  const block = getBlockBySection("testimonial");

  // Determine which table to use based on is_season_gallery flag
  const tableId = block?.is_season_gallery
    ? AIRTABLE_ENDPOINTS.home_season_gallery
    : AIRTABLE_ENDPOINTS.home_testimonial;

  const { testimonials, loading } = useTestimonials(tableId);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  // Control autoplay based on popup state
  useEffect(() => {
    if (!swiperRef.current) return;

    if (isPopupOpen) {
      swiperRef.current.autoplay?.stop();
    } else {
      swiperRef.current.autoplay?.start();
    }
  }, [isPopupOpen]);

  if (loading || testimonials.length === 0) return null;

  // Duplicate slides if needed for seamless 5-item loop effect
  const displayTestimonials =
    testimonials.length < 6 ? [...testimonials, ...testimonials] : testimonials;

  const handleItemClick = (index: number) => {
    // Find the actual index in original testimonials array
    const actualIndex = index % testimonials.length;
    setSelectedIndex(actualIndex);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    if (!isPopupOpen) return;
    // Get real index (accounting for loop)
    const realIndex = swiper.realIndex;
    if (realIndex !== undefined && realIndex < testimonials.length) {
      setSelectedIndex(realIndex);
    }
  };

  const handlePopupSlideChange = (newIndex: number) => {
    setSelectedIndex(newIndex);
    // Sync Swiper to the new index when popup is open
    if (swiperRef.current && isPopupOpen) {
      swiperRef.current.slideToLoop(newIndex);
    }
  };

  return (
    <div
      className="relative"
      style={{
        background: `linear-gradient(180deg, rgba(255, 249, 240, 0) 18.83%, rgba(255, 249, 240, 0.72) 62.9%, #FDF4EF 100%)`,
      }}
    >
      <Wrapper className="relative py-8 md:py-16">
        <Header />
        <Background />
        <div className="relative group/slider md:mt-20 lg:max-w-[1200px] mx-auto min-[1700px]:max-w-[1920px]">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            speed={1000}
            slidesPerView={"auto"}
            watchSlidesProgress={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 550,
              depth: 350,
              modifier: 1,
              slideShadows: false,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".testimonial-prev",
              nextEl: ".testimonial-next",
            }}
            modules={[EffectCoverflow, Navigation, Autoplay]}
            className="testimonial-swiper-v2 !overflow-visible"
            breakpoints={{
              0: {
                slidesPerView: 1,
                centeredSlides: false,
                spaceBetween: 0,
                coverflowEffect: {
                  rotate: 0,
                  stretch: 0,
                  depth: 0,
                  modifier: 1,
                  slideShadows: false,
                },
              },
              768: {
                slidesPerView: "auto",
                centeredSlides: true,
                spaceBetween: 0,
                coverflowEffect: {
                  rotate: 0,
                  stretch: 300,
                  depth: 150,
                  modifier: 1,
                  slideShadows: false,
                },
              },
              1024: {
                slidesPerView: "auto",
                centeredSlides: true,
                spaceBetween: 0,
                coverflowEffect: {
                  rotate: 0,
                  stretch: 550,
                  depth: 350,
                  modifier: 1,
                  slideShadows: false,
                },
              },
              1700: {
                slidesPerView: "auto",
                centeredSlides: true,
                spaceBetween: 0,
                coverflowEffect: {
                  rotate: 0,
                  stretch: 800,
                  depth: 350,
                  modifier: 1,
                  slideShadows: false,
                },
              },
            }}
          >
            {displayTestimonials.map((item, index) => {
              const actualIndex = index % testimonials.length;
              return (
                <SwiperSlide
                  key={`${item.id}-${index}`}
                  className="!w-full md:!w-[90%] lg:!w-[800px] min-[1700px]:!w-[1080px] transition-all duration-500 cursor-pointer"
                  onClick={() => handleItemClick(actualIndex)}
                >
                  <TestimonialCard
                    name={item.name}
                    comment={item.comment}
                    imageUrl={item.imageUrl}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-50 pointer-events-none">
            <NavigationArrows
              className="flex justify-between w-full mb-0"
              buttonClassName="bg-white/70 backdrop-blur-md shadow-lg pointer-events-auto w-12 h-12 md:w-16 md:h-16"
              prevButtonClassName="testimonial-prev"
              nextButtonClassName="testimonial-next"
            />
          </div>
        </div>
      </Wrapper>

      {/* Testimonial Popup */}
      <TestimonialPopup
        isOpen={isPopupOpen}
        items={testimonials}
        selectedIndex={selectedIndex}
        onClose={handleClosePopup}
        onSlideChange={handlePopupSlideChange}
      />
    </div>
  );
};

export default TestimonialSection;
