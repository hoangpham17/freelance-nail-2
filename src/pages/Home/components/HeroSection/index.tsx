import React, { useState, useRef, useMemo } from "react";
import Slider, { Settings } from "react-slick";
import { Skeleton } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomDots from "@/based/components/CustomDots";
import { useScreen } from "@/hooks/useScreen";
import { useBannerItems } from "./useBannerItems";
import { useCampaignStore } from "@/shared/store/campaignStore";

const HeroSection: React.FC = () => {
  const { isDesktop, isTablet } = useScreen();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);
  const showCampaignBar = useCampaignStore((state) => state.showCampaignBar);
  const campaignBarHeight = useCampaignStore(
    (state) => state.campaignBarHeight
  );

  const bannerItems = useBannerItems();

  // Calculate mobile height: dvh - header height (64px) - campaignBar height
  const mobileHeight = useMemo(() => {
    if (isDesktop || isTablet) return undefined;
    const headerHeight = 64;
    const totalOffset =
      headerHeight + (showCampaignBar ? campaignBarHeight : 0) + 78;
    return `calc(100dvh - ${totalOffset}px)`;
  }, [isDesktop, isTablet, showCampaignBar, campaignBarHeight]);

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
            className="relative w-full"
            style={{
              height:
                mobileHeight || (isDesktop || isTablet ? undefined : "100vh"),
              minHeight: isDesktop || isTablet ? "700px" : undefined,
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
        <div key={item.id || index} className="w-full relative">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={`Banner ${index + 1}`}
              className="w-full lg:h-full object-cover"
              style={{
                height: mobileHeight || undefined,
                maxHeight: isDesktop || isTablet ? undefined : "812px",
              }}
            />
          )}
        </div>
      );
    });
  };

  if (bannerItems.length === 0) {
    return (
      <section
        className="relative w-full overflow-hidden"
        style={{
          height: mobileHeight || (isDesktop || isTablet ? "100vh" : undefined),
        }}
      >
        <div className="absolute inset-0 w-full h-full">
          <Skeleton.Image active style={{ width: "100vw", height: "100%" }} />
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden lg:!h-auto transition-all duration-300">
      <div className="w-full h-full">
        <Slider ref={sliderRef} {...sliderSettings}>
          {renderSlides()}
        </Slider>
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
