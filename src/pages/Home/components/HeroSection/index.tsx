import React, { useState, useEffect, useRef, useMemo } from "react";
import Slider, { Settings } from "react-slick";
import { Skeleton } from "antd";
import { BannerItem, BannerRecord } from "../../types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AIRTABLE_ENDPOINTS } from "@/services/airtable.service";
import { useAirtable } from "@/hooks/useAirtable";
import CustomDots from "@/based/components/CustomDots";

const HeroSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    beforeChange: (_current: number, next: number) => setCurrentSlide(next),
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
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden">
      {/* Slider Background */}
      <div className="absolute inset-0 w-full h-full">
        <Slider ref={sliderRef} {...settings}>
          {bannerItems.map((item, index) => {
            const imageUrl = isMobile ? item.mobile : item.desktop;

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

      {/* Custom Dots */}
      <CustomDots
        totalSlides={bannerItems.length}
        currentIndex={currentSlide}
        onDotClick={(index) => {
          sliderRef.current?.slickGoTo(index);
        }}
      />
    </section>
  );
};

export default HeroSection;
