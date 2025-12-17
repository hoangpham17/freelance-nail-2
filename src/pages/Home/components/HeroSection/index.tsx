import React, { useState, useRef, useMemo, useEffect } from "react";
import Slider, { Settings } from "react-slick";
import { Skeleton } from "antd";
import { BannerItem, BannerRecord } from "../../types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AIRTABLE_ENDPOINTS } from "@/services/airtable.service";
import { useAirtable } from "@/hooks/useAirtable";
import CustomDots from "@/based/components/CustomDots";
import { useCampaignStore } from "@/shared/store/campaignStore";
import { useScreen } from "@/hooks/useScreen";

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const mobileSliderRef = useRef<Slider>(null);
  const desktopSliderRef = useRef<Slider>(null);
  const isSyncingRef = useRef(false);
  const { isDesktop } = useScreen();
  const showCampaignBar = useCampaignStore((state) => state.showCampaignBar);
  const campaignBarHeight = useCampaignStore(
    (state) => state.campaignBarHeight
  );

  const { data: bannerRecords } = useAirtable<BannerRecord>(
    AIRTABLE_ENDPOINTS.banner
  );

  const bannerItems: BannerItem[] = useMemo(() => {
    if (!bannerRecords || bannerRecords.length === 0) {
      return [];
    }

    return bannerRecords
      .slice()
      .sort((a, b) => (a.index ?? a.order ?? 0) - (b.index ?? b.order ?? 0))
      .map((record) => {
        const desktopUrl =
          Array.isArray(record.desktop) &&
          record.desktop.length > 0 &&
          record.desktop[0]?.url
            ? record.desktop[0].url
            : undefined;
        const mobileUrl =
          Array.isArray(record.mobile) &&
          record.mobile.length > 0 &&
          record.mobile[0]?.url
            ? record.mobile[0].url
            : undefined;

        return {
          id: record.id,
          desktop: desktopUrl,
          mobile: mobileUrl,
        };
      })
      .filter((item) => item.desktop || item.mobile);
  }, [bannerRecords]);

  // Sync sliders when currentSlide changes
  useEffect(() => {
    if (isSyncingRef.current) return;

    isSyncingRef.current = true;
    mobileSliderRef.current?.slickGoTo(currentSlide, false);
    desktopSliderRef.current?.slickGoTo(currentSlide, false);

    // Reset flag after a short delay
    setTimeout(() => {
      isSyncingRef.current = false;
    }, 100);
  }, [currentSlide]);

  const handleBeforeChange = (_current: number, next: number) => {
    if (isSyncingRef.current) return;
    setCurrentSlide(next);
  };

  const mobileSettings: Settings = {
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

  const desktopSettings: Settings = {
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

  if (bannerItems.length === 0) {
    return (
      <section className="relative w-full h-screen min-h-[700px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Skeleton.Image
            active
            style={{ width: "100%", height: "100%", minHeight: "700px" }}
          />
        </div>
      </section>
    );
  }

  // Calculate section height: 100dvh - header height - campaign bar height
  const headerHeight = isDesktop ? 100 : 64;
  const totalOffset = headerHeight + (showCampaignBar ? campaignBarHeight : 0);
  const sectionHeight = `calc(100dvh - ${totalOffset}px)`;

  return (
    <section
      className="relative w-full overflow-hidden lg:!h-auto transition-all duration-300"
      style={{ height: sectionHeight }}
    >
      {/* Mobile Slider - Keep absolute positioning */}
      <div className="absolute inset-0 w-full h-full lg:hidden">
        <Slider ref={mobileSliderRef} {...mobileSettings}>
          {bannerItems.map((item, index) => {
            const imageUrl = item.mobile;

            if (!imageUrl) {
              return (
                <div
                  key={item.id || index}
                  className="relative w-full h-screen min-h-[700px]"
                >
                  <div className="absolute inset-0 w-full h-full">
                    <Skeleton.Image
                      active
                      style={{
                        width: "100%",
                        height: "100%",
                        minHeight: "700px",
                      }}
                    />
                  </div>
                </div>
              );
            }

            return (
              <div
                key={item.id || index}
                className="relative w-full h-screen min-h-[700px]"
              >
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('${imageUrl}')`,
                  }}
                >
                  {/* Subtle warm gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      {/* Desktop Slider - No absolute positioning, use img tags */}
      <div className="hidden lg:block w-full h-full">
        <Slider ref={desktopSliderRef} {...desktopSettings}>
          {bannerItems.map((item, index) => {
            const imageUrl = item.desktop;

            if (!imageUrl) {
              return (
                <div
                  key={item.id || index}
                  className="relative w-full h-screen min-h-[700px]"
                >
                  <Skeleton.Image
                    active
                    style={{
                      width: "100%",
                      height: "100%",
                      minHeight: "700px",
                    }}
                  />
                </div>
              );
            }

            return (
              <div key={item.id || index} className="w-full">
                <img
                  src={imageUrl}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </Slider>
      </div>

      {/* Custom Dots */}
      <CustomDots
        totalSlides={bannerItems.length}
        currentIndex={currentSlide}
        onDotClick={(index) => {
          mobileSliderRef.current?.slickGoTo(index);
          desktopSliderRef.current?.slickGoTo(index);
        }}
      />
    </section>
  );
};

export default HeroSection;
