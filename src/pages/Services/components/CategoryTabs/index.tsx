import React, { useEffect, useRef, useState } from "react";
import { ServiceCategory } from "../../types";
import { Wrapper } from "@/based/components/Wrapper";
import { useCampaignStore } from "@/shared/store/campaignStore";
import Slider, { Settings } from "react-slick";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { Flex } from "antd";
import { useScreen } from "@/hooks/useScreen";

interface CategoryTabsProps {
  categories: ServiceCategory[];
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories }) => {
  const { isDesktop } = useScreen();

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const sliderRef = useRef<Slider | null>(null);
  const showCampaignBar = useCampaignStore((state) => state.showCampaignBar);
  const campaignBarHeight = useCampaignStore(
    (state) => state.campaignBarHeight
  );

  const baseTop = isDesktop ? 100 : 64;
  const stickyTop = baseTop + (showCampaignBar ? campaignBarHeight : 0);

  useEffect(() => {
    if (categories.length && !activeCategoryId) {
      setActiveCategoryId(categories[0].id);
    }
  }, [categories, activeCategoryId]);

  const handleTabClick = (categorySlug: string) => {
    setActiveCategoryId(categorySlug);
    // Update URL hash (e.g., #manicure)
    window.location.hash = categorySlug;
    const element = document.getElementById(categorySlug);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
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
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    dots: false,
    swipeToSlide: true,
    draggable: true,
    speed: 400,
  };

  if (!categories.length) return null;

  return (
    <section className="sticky z-30" style={{ top: stickyTop }}>
      <Wrapper>
        <div className="flex-1 min-w-0 overflow-hidden relative">
          <Slider ref={sliderRef} {...sliderSettings}>
            {categories.map((category) => {
              const isActive = category.id === activeCategoryId;
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
                        "px-2 h-[32px] lg:h-[56px] rounded-2xl border border-white whitespace-nowrap",
                        isActive ? "bg-white/80" : "bg-white/30",
                        responsiveFontSizeArray(24, 32)
                      )}
                      style={{
                        backdropFilter: "blur(10px)",
                        boxShadow: "0px 5px 16px 0px #E24C881F",
                      }}
                    >
                      {category.title}
                    </Flex>
                  </div>
                </div>
              );
            })}
          </Slider>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center gap-1 ml-1 flex-shrink-0">
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
              <i className="bi bi-chevron-left" />
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
              <i className="bi bi-chevron-right" />
            </button>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default CategoryTabs;
