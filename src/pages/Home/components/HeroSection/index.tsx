import React, { useRef, useMemo, useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useScreen } from "@/hooks/useScreen";
import { useBannerItems } from "./useBannerItems";
import LoadingPage from "@/components/LoadingPage";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { useCampaignStore } from "@/shared/store/campaignStore";
import { Skeleton } from "antd";
import SvgIcon from "@/based/SvgIcon";
import homepageContent from "@/content/homepage.json";

const HeroSection: React.FC = () => {
  const { isDesktop } = useScreen();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const headerHeight = useCampaignStore((state) => state.headerHeight);
  const campaignBarHeight = useCampaignStore(
    (state) => state.campaignBarHeight,
  );

  const { bannerItems, loading: isLoadingBanners } = useBannerItems();

  const sectionHeight = useMemo(() => {
    const totalHeaderHeight = headerHeight + campaignBarHeight;
    return `calc(100dvh - ${totalHeaderHeight}px)`;
  }, [headerHeight, campaignBarHeight]);

  const bannerHeight = useMemo(() => {
    return sectionHeight;
  }, [sectionHeight]);

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
        "leading-none",
        responsiveFontSizeArray(36, 72),
      );
      const styleOutBackticks = clsx(
        "leading-none",
        responsiveFontSizeArray(42, 96),
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
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-[1200px] px-4 text-center">
              <div className="flex flex-col items-center gap-3 lg:gap-4 animate-fadeIn">
                {/* <span
                  className={clsx(
                    "text-white",
                    responsiveFontSizeArray(20, 36),
                  )}
                >
                  The Veira Nail Lounge & Spa
                </span>
                <div
                  className="h-px w-24 mx-auto"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0.9) 0%, transparent 100%)",
                  }}
                /> */}
                <h1
                  className={clsx(
                    "text-white flex flex-col font-medium font-playfairDisplay",
                    responsiveFontSizeArray(40, 96),
                  )}
                >
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
                    "group mt-4 lg:mt-8 bg-white text-[#805D3D] py-3 md:py-4 min-w-[160px] md:min-w-[234px] rounded-full shadow-lg transition-all duration-300 uppercase flex items-center justify-center px-6",
                    responsiveFontSizeArray(14, 20),
                  )}
                >
                  <span>{item.button_title}</span>
                  <div className="max-w-0 opacity-0 group-hover:max-w-[40px] group-hover:opacity-100 group-hover:ml-3 transition-all duration-500 overflow-hidden flex items-center">
                    <SvgIcon
                      src={"/assets/svgs/arrow-right-circle.svg"}
                      ariaLabel="text"
                      width={24}
                      height={24}
                      className="size-[24px] shrink-0 text-[#805D3D]"
                    />
                  </div>
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
      className="relative w-full overflow-hidden transition-all duration-300 hero-section"
      style={{
        height: sectionHeight,
        marginTop: `${headerHeight}px`,
      }}
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
                "h-2 transition-all duration-500 rounded-full bg-white",
                currentSlide === idx ? "w-10 opacity-100" : "w-2 opacity-40",
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
