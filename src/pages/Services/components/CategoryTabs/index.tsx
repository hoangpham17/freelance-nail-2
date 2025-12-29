import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ServiceCategory } from "../../types";
import { useCampaignStore } from "@/shared/store/campaignStore";
import Slider, { Settings } from "react-slick";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { Flex, Skeleton } from "antd";
import { useScreen } from "@/hooks/useScreen";
import { Wrapper } from "@/based/components/Wrapper";
import SvgIcon from "@/based/SvgIcon";

interface CategoryTabsProps {
  categories: ServiceCategory[];
  loading?: boolean;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  loading = false,
}) => {
  const { isDesktop } = useScreen();
  const location = useLocation();

  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(
    null
  );
  const sliderRef = useRef<Slider | null>(null);
  const showCampaignBar = useCampaignStore((state) => state.showCampaignBar);
  const campaignBarHeight = useCampaignStore(
    (state) => state.campaignBarHeight
  );

  const baseTop = isDesktop ? 100 : 64;
  const stickyTop = baseTop + (showCampaignBar ? campaignBarHeight : 0);

  useEffect(() => {
    if (categories.length && !activeCategorySlug) {
      setActiveCategorySlug(categories[0].slug);
    }
  }, [categories, activeCategorySlug]);

  // Update active category when hash changes (e.g., from BottomNav)
  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.replace("#", "");
      const category = categories.find((cat) => cat.slug === hash);
      if (category) {
        setActiveCategorySlug(hash);
      }
    }
  }, [location.hash, categories]);

  // Scroll active category into view when activeCategorySlug changes
  useEffect(() => {
    if (!activeCategorySlug || !sliderRef.current || categories.length === 0) {
      return;
    }

    // Find index of active category
    const activeIndex = categories.findIndex(
      (cat) => cat.slug === activeCategorySlug
    );

    if (activeIndex !== -1 && sliderRef.current) {
      // Use setTimeout to ensure slider is fully initialized
      setTimeout(() => {
        sliderRef.current?.slickGoTo(activeIndex);
      }, 100);
    }
  }, [activeCategorySlug, categories]);

  const handleTabClick = (categorySlug: string) => {
    setActiveCategorySlug(categorySlug);
    // Update URL hash (e.g., #manicure)
    window.location.hash = categorySlug;

    // Scroll the active tab into view in the slider
    const activeIndex = categories.findIndex(
      (cat) => cat.slug === categorySlug
    );
    if (activeIndex !== -1 && sliderRef.current) {
      sliderRef.current.slickGoTo(activeIndex);
    }

    // Scroll to the content section
    const element = document.getElementById(categorySlug);
    if (element) {
      // Calculate offset for sticky header (CategoryTabs)
      const categoryTabsHeight = isDesktop ? 56 : 32;
      const offset = stickyTop + categoryTabsHeight + 20; // Add extra padding

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollTabs = (direction: "prev" | "next") => {
    if (!sliderRef.current) return;
    if (direction === "next") {
      sliderRef.current.slickNext();
    } else {
      sliderRef.current.slickPrev();
    }
  };

  const sliderSettings: Settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    dots: false,
    swipeToSlide: true,
    draggable: true,
    speed: 400,
    focusOnSelect: false, // Don't auto-focus on click, we handle it manually
    centerMode: false, // Not compatible with variableWidth
    centerPadding: "0px", // No padding needed
  };

  if (loading) {
    return (
      <section
        className="sticky z-30 transition-all duration-300"
        style={{ top: stickyTop }}
      >
        <Wrapper>
          <div className="flex-1 min-w-0 overflow-hidden relative">
            <div className="flex gap-2 py-2 lg:py-4">
              {[1, 2, 3].map((i) => (
                <Skeleton.Button
                  key={i}
                  active
                  size="large"
                  style={{
                    width: "120px",
                    height: isDesktop ? "56px" : "32px",
                    borderRadius: "16px",
                  }}
                />
              ))}
            </div>
          </div>
        </Wrapper>
      </section>
    );
  }

  if (!categories.length) return null;

  return (
    <section
      className="sticky z-30 transition-all duration-300"
      style={{ top: stickyTop }}
    >
      <Wrapper>
        <div className="flex-1 min-w-0 overflow-hidden relative">
          <Slider ref={sliderRef} {...sliderSettings}>
            {categories.map((category) => {
              const isActive = category.slug === activeCategorySlug;
              return (
                <div key={category.id} className="px-1">
                  <div
                    onClick={() => handleTabClick(category.slug)}
                    className="cursor-pointer py-2 lg:py-4"
                  >
                    <Flex
                      align="center"
                      justify="center"
                      className={clsx(
                        "px-6 h-[32px] lg:h-[56px] rounded-2xl border border-white whitespace-nowrap",
                        isActive ? "bg-white/80" : "bg-white/30 text-[#8B4B20]",
                        responsiveFontSizeArray(18, 24)
                      )}
                      style={{
                        backdropFilter: "blur(10px)",
                        boxShadow: isActive
                          ? "0px 5px 16px 0px #E24C881F"
                          : "0px 5px 16px 0px #8B4B2026",
                      }}
                    >
                      {category.title}
                    </Flex>
                  </div>
                </div>
              );
            })}
          </Slider>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center ml-1 flex-shrink-0">
            <button
              type="button"
              aria-label="Previous"
              className="w-8 h-8 md:w-[55px] md:h-[50px] flex items-center justify-center rounded-bl-3xl rounded-tl-3xl rounded-br-2xl rounded-tr-2xl text-black hover:text-[#D5B994]"
              onClick={() => scrollTabs("prev")}
              style={{
                boxShadow: "0px 4px 12px 0px #E24C881F",
                background: "linear-gradient(180deg, #FFFFFF 0%, #F6E7EE 100%)",
              }}
            >
              <SvgIcon
                src={"assets/svgs/chevron-right.svg"}
                ariaLabel="text"
                width={14}
                height={14}
                className="size-[14px] shrink-0 rotate-180"
              />
            </button>
            <button
              type="button"
              aria-label="Next"
              className="w-8 h-8 md:w-[55px] md:h-[50px] flex items-center justify-center rounded-br-3xl rounded-tr-3xl rounded-bl-2xl rounded-tl-2xl text-black hover:text-[#D5B994]"
              onClick={() => scrollTabs("next")}
              style={{
                boxShadow: "0px 4px 12px 0px #E24C881F",
                background: "linear-gradient(180deg, #FFFFFF 0%, #F6E7EE 100%)",
              }}
            >
              <SvgIcon
                src={"assets/svgs/chevron-right.svg"}
                ariaLabel="text"
                width={14}
                height={14}
                className="size-[14px] shrink-0"
              />
            </button>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default CategoryTabs;
