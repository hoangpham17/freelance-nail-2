import React, { useState, useRef } from "react";
import Slider, { Settings } from "react-slick";
import { Skeleton } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomDots from "@/based/components/CustomDots";
import { useScreen } from "@/hooks/useScreen";
import { useBannerItems } from "./useBannerItems";

const HeroSection: React.FC = () => {
  const { isDesktop } = useScreen();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const bannerItems = useBannerItems();

  const handleBeforeChange = (_current: number, next: number) => {
    setCurrentSlide(next);
  };

  const sliderSettings: Settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: "linear",
    beforeChange: handleBeforeChange,
  };

  const renderSlides = () => {
    return bannerItems.map((item, index) => {
      const mobileUrl = item.mobile;
      const desktopUrl = item.desktop;

      if (!mobileUrl && !desktopUrl) {
        return (
          <div
            key={item.id || index}
            className="relative w-full h-screen min-h-[700px]"
          >
            <Skeleton.Image
              active
              style={{
                width: "100vw",
                height: "100vh",
              }}
            />
          </div>
        );
      }

      const imageUrl = isDesktop ? desktopUrl : mobileUrl;

      return (
        <div key={item.id || index} className="w-full relative">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      );
    });
  };

  if (bannerItems.length === 0) {
    return (
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Skeleton.Image active style={{ width: "100vw", height: "100vh" }} />
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden lg:!h-auto transition-all duration-300">
      {/* Single Slider with Responsive Images */}
      <div className="w-full h-full">
        <Slider ref={sliderRef} {...sliderSettings}>
          {renderSlides()}
        </Slider>
      </div>

      {/* Custom Dots */}
      <CustomDots
        totalSlides={bannerItems.length}
        currentIndex={currentSlide}
        onDotClick={(index) => {
          sliderRef.current?.slickGoTo(index);
        }}
        className="hidden lg:block"
      />
    </section>
  );
};

export default HeroSection;
