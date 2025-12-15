import React, { useState, useRef, useMemo } from "react";
import Slider, { Settings } from "react-slick";
import { Skeleton } from "antd";
import { BannerItem, BannerRecord } from "../../types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AIRTABLE_ENDPOINTS } from "@/services/airtable.service";
import { useAirtable } from "@/hooks/useAirtable";
import CustomDots from "@/based/components/CustomDots";

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const mobileSliderRef = useRef<Slider>(null);
  const desktopSliderRef = useRef<Slider>(null);

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

  const settings: Settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: "linear",
    beforeChange: (_current: number, next: number) => {
      setCurrentSlide(next);
      // Sync the other slider (silent mode to prevent infinite loop)
      const isCurrentlyMobile = window.innerWidth < 768;
      if (isCurrentlyMobile) {
        desktopSliderRef.current?.slickGoTo(next, false);
      } else {
        mobileSliderRef.current?.slickGoTo(next, false);
      }
    },
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

  return (
    <section className="relative w-full h-screen min-h-[700px] lg:h-auto lg:min-h-auto overflow-hidden">
      {/* Mobile Slider - Keep absolute positioning */}
      <div className="absolute inset-0 w-full h-full md:hidden">
        <Slider ref={mobileSliderRef} {...settings}>
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
      <div className="hidden md:block w-full h-full">
        <Slider ref={desktopSliderRef} {...settings}>
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
