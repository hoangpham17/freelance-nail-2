import React, { useRef, useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useScreen } from "@/hooks/useScreen";
import { useBannerItems } from "./useBannerItems";
import LoadingPage from "@/components/LoadingPage";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { Skeleton } from "antd";
import homepageContent from "@/content/homepage.json";

const HeroSection: React.FC = () => {
  const { isDesktop } = useScreen();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const { bannerItems, loading: isLoadingBanners } = useBannerItems();

  const sectionHeight = "100dvh";
  const bannerHeight = sectionHeight;

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
    pauseOnHover: false,
    fade: true,
    speed: 1000,
    cssEase: "ease-in-out",
    beforeChange: handleBeforeChange,
  };

  // Ensure autoplay starts after slider is initialized
  useEffect(() => {
    if (sliderRef.current && bannerItems.length > 0 && !isLoadingBanners) {
      const timer = setTimeout(() => {
        sliderRef.current?.slickPlay();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [bannerItems.length, isLoadingBanners]);

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

      const imageUrl = isDesktop ? desktopUrl : mobileUrl;

      const defaultTitle = (
        homepageContent as { hero: { defaultBannerTitle: string } }
      ).hero.defaultBannerTitle;
      const rawTitle = item.banner_title ?? defaultTitle;
      const partsByBacktick = rawTitle.split("`");
      const titleSegments = partsByBacktick.map((text, i) => ({
        text,
        inBackticks: i % 2 === 1,
      }));

      const styleInBackticks = clsx(
        "text-gold-gradient leading-none font-tangerine",
        responsiveFontSizeArray(36, 60),
      );
      const styleOutBackticks = clsx(
        "text-madison-text font-montserrat font-medium leading-tight",
        responsiveFontSizeArray(20, 36),
      );

      return (
        <div key={item.id || index}>
          <div
            className="w-full relative flex items-center justify-center overflow-hidden"
            style={{
              height: bannerHeight,
              backgroundImage: imageUrl ? `url('${imageUrl}')` : "none",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-black/60" />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-[1200px] px-4 text-center">
              <div className="flex flex-col items-center gap-3 lg:gap-4 animate-fadeIn">
                {/* <span
                  className={clsx(
                    "text-white",
                    responsiveFontSizeArray(20, 36),
                  )}
                >
                  Madison Nail Lounge
                </span>
                <div
                  className="h-px w-24 mx-auto"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0.9) 0%, transparent 100%)",
                  }}
                /> */}
                <h1 className="flex flex-col items-center uppercase">
                  {titleSegments.map(
                    (seg, segIndex) =>
                      seg.text !== "" && (
                        <span
                          key={segIndex}
                          className={
                            seg.inBackticks
                              ? styleInBackticks
                              : styleOutBackticks
                          }
                        >
                          {seg.text.split("\n").map((line, lineIndex) => (
                            <React.Fragment key={lineIndex}>
                              {line}
                            </React.Fragment>
                          ))}
                        </span>
                      ),
                  )}
                </h1>

                <a
                  href={item.is_signup ? "/contact-us?signup" : "/contact-us"}
                  className={clsx(
                    "home-btn-primary group mt-4 lg:mt-8 min-w-[160px] md:min-w-[200px]",
                    responsiveFontSizeArray(14, 18),
                  )}
                >
                  <span>{item.button_title}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <section
      className="relative w-full overflow-hidden hero-section"
      style={{ height: sectionHeight }}
    >
      {isLoadingBanners && <LoadingPage />}
      <div className="w-full h-full [&_.slick-list]:h-full [&_.slick-track]:h-full [&_.slick-slide]:h-full [&_.slick-slide>div]:h-full">
        {bannerItems.length > 0 ? (
          <Slider ref={sliderRef} {...sliderSettings}>
            {renderSlides()}
          </Slider>
        ) : (
          <div className="w-full h-full">
            <Skeleton.Image active style={{ width: "100vw", height: "100%" }} />
          </div>
        )}
      </div>

      {/* Custom Dots */}
      {bannerItems.length > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
          {bannerItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => sliderRef.current?.slickGoTo(idx)}
              className={clsx(
                "h-3 transition-all duration-500 rounded-full",
                currentSlide === idx
                  ? "w-[18px] bg-[#f9be5c]"
                  : "w-3 bg-white/40",
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSection;
