import React, { useRef, useMemo, useEffect } from "react";
import Slider, { Settings } from "react-slick";
import { Button, Flex, Skeleton } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useScreen } from "@/hooks/useScreen";
import { useBannerItems } from "./useBannerItems";
import LoadingPage from "@/components/LoadingPage";
import { useBaseOffset } from "@/hooks/useBaseOffset";
import SvgIcon from "@/based/SvgIcon";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

const HeroSection: React.FC = () => {
  const { isDesktop, isTablet } = useScreen();
  // const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const { campaignBarHeight } = useBaseOffset();

  const { bannerItems, loading: isLoadingBanners } = useBannerItems();

  const bannerHeight = useMemo(() => {
    return `calc(100dvh - ${campaignBarHeight}px)`;
  }, [campaignBarHeight]);

  // const handleBeforeChange = (_current: number, next: number) => {
  //   setCurrentSlide(next);
  // };

  const sliderSettings: Settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: false,
    fade: true,
    speed: 500,
    cssEase: "linear",
    // beforeChange: handleBeforeChange,
  };

  // Ensure autoplay starts after slider is initialized
  useEffect(() => {
    if (sliderRef.current && bannerItems.length > 0 && !isLoadingBanners) {
      // Force autoplay to start by calling slickPlay
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
      const tabletUrl = item.tablet;

      if (!mobileUrl && !desktopUrl && !tabletUrl) {
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

      const imageUrl = isDesktop
        ? desktopUrl
        : isTablet
        ? tabletUrl || desktopUrl
        : mobileUrl;

      return (
        <div key={item.id || index}>
          <div
            className="w-full relative"
            style={{
              height: bannerHeight,
              backgroundImage: imageUrl ? `url('${imageUrl}')` : "none",
              backgroundPosition: "top center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              display: "block",
            }}
          >
            <Flex
              justify="space-between"
              align="center"
              className={`absolute bottom-[14%] md:bottom-[11%] lg:bottom-[8%] left-1/2 -translate-x-1/2 
                  gap-1.5 lg:gap-8 w-[95%] lg:w-[auto]
                  bg-white/60 py-3 pl-5 lg:pl-8 pr-3 rounded-[32px] backdrop-blur-sm
                `}
              style={{
                boxShadow: "0px 4px 6px 0px #0000000F",
              }}
            >
              <span
                className={clsx(
                  "text-[#9E7B6A]",
                  responsiveFontSizeArray(16, 20)
                )}
              >
                {item.note ||
                  "Gift card are available for purchase in store only"}
              </span>
              <Button
                className="bg-white/60 border px-4 py-3 rounded-[32px] h-[56px] hover:!text-[#A16C0C]"
                style={{
                  borderImageSource:
                    "linear-gradient(180deg, #FFFFFF 0%, #F6E7EE 100%)",
                  boxShadow: "0px 4px 4px 0px #74582826",
                }}
                onClick={() => {
                  window.location.href = "/contact-us";
                }}
              >
                <span className={clsx(responsiveFontSizeArray(16, 20))}>
                  Contact
                </span>
                <div className="size-[24px] shrink-0 rounded-full bg-[#A16C0C]">
                  <SvgIcon
                    src={"assets/svgs/arrow-right-circle.svg"}
                    ariaLabel="text"
                    width={24}
                    height={24}
                    className="size-[24px] shrink-0 text-white"
                  />
                </div>
              </Button>
            </Flex>
          </div>
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

      {/* <CustomDots
        totalSlides={bannerItems.length}
        currentIndex={currentSlide}
        onDotClick={(index) => {
          sliderRef.current?.slickGoTo(index);
        }}
        className="hidden lg:block"
      /> */}
    </section>
  );
};

export default HeroSection;
