import React, { useState, useRef, useMemo } from "react";
import Slider, { Settings } from "react-slick";
import { Skeleton } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomDots from "@/based/components/CustomDots";
import { useScreen } from "@/hooks/useScreen";
import { useBannerItems } from "./useBannerItems";
import LoadingPage from "@/components/LoadingPage";
import { useBaseOffset } from "@/hooks/useBaseOffset";

const HeroSection: React.FC = () => {
  const { isDesktop, isTablet } = useScreen();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const { campaignBarHeight } = useBaseOffset();

  const { bannerItems, loading: isLoadingBanners } = useBannerItems();

  // Calculate height: 100dvh - campaignBarHeight
  const bannerHeight = useMemo(() => {
    return `calc(100dvh - ${campaignBarHeight}px)`;
  }, [campaignBarHeight]);

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
    autoplaySpeed: 3500,
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
            className="relative w-full"
            style={{
              height: bannerHeight,
            }}
          >
            <Skeleton.Image
              active
              style={{
                width: "100vw",
                height: "100%",
              }}
            />
          </div>
        );
      }

      const imageUrl = isDesktop || isTablet ? desktopUrl : mobileUrl;

      return (
        <div key={item.id || index}>
          <div
            className="w-full relative"
            style={{
              height: bannerHeight,
              backgroundImage: imageUrl ? `url('${imageUrl}')` : "none",
              backgroundPosition: "center center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              width: "100%",
              display: "block",
            }}
          />
        </div>
      );
    });
  };

  return (
    <section
      className="relative w-full overflow-hidden h-dvh transition-all duration-300"
      style={{ paddingTop: `${campaignBarHeight}px` }}
    >
      {isLoadingBanners && <LoadingPage />}
      <div className="w-full h-full [&_.slick-list]:h-full [&_.slick-track]:h-full [&_.slick-slide]:h-full [&_.slick-slide>div]:h-full">
        {bannerItems.length > 0 ? (
          <Slider ref={sliderRef} {...sliderSettings}>
            {renderSlides()}
          </Slider>
        ) : (
          <div className="w-full h-full">
            <Skeleton.Image
              active
              style={{ width: "100vw", height: "700px" }}
            />
          </div>
        )}
      </div>

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
