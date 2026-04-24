import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ServiceCategory } from "../../types";
import { useCampaignStore } from "@/shared/store/campaignStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
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
    null,
  );
  const swiperRef = useRef<SwiperType | null>(null);
  const showCampaignBar = useCampaignStore((state) => state.showCampaignBar);
  const campaignBarHeight = useCampaignStore(
    (state) => state.campaignBarHeight,
  );
  const headerHeight = useCampaignStore((state) => state.headerHeight);
  const isUpdatingHashRef = useRef(false);
  const currentHashRef = useRef<string>("");

  const stickyTop = headerHeight + (showCampaignBar ? campaignBarHeight : 0);
  const minHeaderHeight = isDesktop ? 80 : 72;
  const effectiveStickyTop = stickyTop > 0 ? stickyTop : minHeaderHeight;

  useEffect(() => {
    if (categories.length && !activeCategorySlug) {
      setActiveCategorySlug(categories[0].slug);
    }
  }, [categories, activeCategorySlug]);

  useEffect(() => {
    if (location.hash) {
      const hash = decodeURIComponent(location.hash.replace("#", ""));
      const category = categories.find((cat) => cat.slug === hash);
      if (category) {
        setActiveCategorySlug(hash);
        currentHashRef.current = hash;
      }
    } else {
      currentHashRef.current = "";
    }
  }, [location.hash, categories]);

  useEffect(() => {
    if (!activeCategorySlug || !swiperRef.current || categories.length === 0) {
      return;
    }

    const activeIndex = categories.findIndex(
      (cat) => cat.slug === activeCategorySlug,
    );

    if (activeIndex !== -1 && swiperRef.current) {
      setTimeout(() => {
        const swiper = swiperRef.current;
        if (!swiper) return;

        // Always use slideTo with speed for smooth animation
        // With variable width, slideTo works better than slideToLoop
        swiper.slideTo(activeIndex, 400);
      }, 100);
    }
  }, [activeCategorySlug, categories]);

  useEffect(() => {
    if (categories.length === 0) return;

    let observer: IntersectionObserver | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const categoryTabsHeight = isDesktop ? 56 : 32;
    const offset = effectiveStickyTop + categoryTabsHeight + 20;

    const bottomMargin = isDesktop ? "-50%" : "-50%";
    const minIntersectionRatio = 0.1;

    const observerOptions = {
      root: null,
      rootMargin: `-${offset}px 0px ${bottomMargin} 0px`,
      threshold: [0, 0.05, 0.1, 0.5, 1],
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isUpdatingHashRef.current) return;

      const visibleEntries = entries.filter(
        (entry) => entry.intersectionRatio > minIntersectionRatio,
      );

      if (visibleEntries.length === 0) return;

      visibleEntries.sort((a, b) => {
        // First sort by intersection ratio
        if (Math.abs(a.intersectionRatio - b.intersectionRatio) > 0.1) {
          return b.intersectionRatio - a.intersectionRatio;
        }
        // Then by position (top to bottom)
        return a.boundingClientRect.top - b.boundingClientRect.top;
      });

      const mostVisible = visibleEntries[0];
      const sectionId = mostVisible.target.id;

      if (sectionId && categories.some((cat) => cat.slug === sectionId)) {
        const decodedSectionId = decodeURIComponent(sectionId);

        if (currentHashRef.current !== decodedSectionId) {
          isUpdatingHashRef.current = true;
          setActiveCategorySlug(decodedSectionId);
          currentHashRef.current = decodedSectionId;
          window.history.replaceState(
            null,
            "",
            `${location.pathname}#${sectionId}`,
          );
          setTimeout(() => {
            isUpdatingHashRef.current = false;
          }, 100);
        }
      }
    };

    const setupObserver = () => {
      const sections = categories
        .map((cat) => document.getElementById(cat.slug))
        .filter((el) => el !== null) as HTMLElement[];

      if (sections.length === 0) {
        timeoutId = setTimeout(setupObserver, 100);
        return;
      }

      observer = new IntersectionObserver(observerCallback, observerOptions);
      sections.forEach((section) => {
        observer?.observe(section);
      });
    };

    timeoutId = setTimeout(setupObserver, 200);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (observer) {
        const sections = categories
          .map((cat) => document.getElementById(cat.slug))
          .filter((el) => el !== null) as HTMLElement[];
        sections.forEach((section) => {
          observer?.unobserve(section);
        });
      }
    };
  }, [
    categories,
    location.pathname,
    location.hash,
    effectiveStickyTop,
    isDesktop,
  ]);

  const handleTabClick = (categorySlug: string) => {
    isUpdatingHashRef.current = true;
    setActiveCategorySlug(categorySlug);
    currentHashRef.current = categorySlug;
    window.location.hash = categorySlug;

    const activeIndex = categories.findIndex(
      (cat) => cat.slug === categorySlug,
    );
    if (activeIndex !== -1 && swiperRef.current) {
      const swiper = swiperRef.current;
      // Always use slideTo with speed for smooth animation
      // With variable width, slideTo works better than slideToLoop
      swiper.slideTo(activeIndex, 400);
    }

    const element = document.getElementById(categorySlug);
    if (element) {
      const categoryTabsHeight = isDesktop ? 56 : 32;
      const minHeaderHeight = isDesktop ? 80 : 72;
      const effectiveStickyTop = stickyTop > 0 ? stickyTop : minHeaderHeight;
      const offset = effectiveStickyTop + categoryTabsHeight + 20;

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    setTimeout(() => {
      isUpdatingHashRef.current = false;
    }, 500);
  };

  const scrollTabs = (direction: "prev" | "next") => {
    if (!swiperRef.current) return;
    if (direction === "next") {
      swiperRef.current.slideNext();
    } else {
      swiperRef.current.slidePrev();
    }
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
      className="sticky z-30 transition-all duration-300 bg-white/95 backdrop-blur-sm"
      style={{ top: stickyTop, boxShadow: "0px 5px 16px 0px #8B4B2026" }}
    >
      <Wrapper>
        <div className="flex-1 min-w-0 overflow-hidden relative">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[FreeMode]}
            slidesPerView="auto"
            spaceBetween={0}
            freeMode={{
              enabled: true,
              sticky: false,
            }}
            speed={400}
            resistance={true}
            resistanceRatio={0}
            className="category-tabs-swiper pr-[120px] md:pr-[140px]"
          >
            {categories.map((category) => {
              const isActive = category.slug === activeCategorySlug;
              return (
                <SwiperSlide key={category.id} className="!w-auto pl-3">
                  <div
                    onClick={() => handleTabClick(category.slug)}
                    className="cursor-pointer py-2 lg:py-4 group"
                  >
                    <Flex
                      align="center"
                      justify="center"
                      className={clsx(
                        "tab-item px-4 h-[32px] lg:h-[50px] rounded-2xl border whitespace-nowrap font-playfairDisplay",
                        isActive
                          ? "bg-white/80 text-[#6B4A2F] border-[#6B4A2F]"
                          : "bg-white/30 text-[#8B4B20] group-hover:text-[#6B4A2F] border-white",
                        responsiveFontSizeArray(16, 20),
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
                </SwiperSlide>
              );
            })}
          </Swiper>
          {/* Gradient overlay for fade effect */}
          <div className="absolute top-0 right-0 bottom-0 w-[120px] md:w-[140px] pointer-events-none z-10 bg-gradient-to-l from-white/95 to-transparent" />
          <div className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center ml-1 flex-shrink-0 z-20">
            <button
              type="button"
              aria-label="Previous"
              className="w-8 h-8 md:w-[55px] md:h-[50px] flex items-center justify-center rounded-bl-3xl rounded-tl-3xl rounded-br-2xl rounded-tr-2xl"
              onClick={() => scrollTabs("prev")}
              style={{
                boxShadow: "0px 4px 12px 0px #6B4A2F26",
                background:
                  "linear-gradient(180deg, #FEFCFA 0%, #FAF3EF 50%, #F5EDE8 100%)",
              }}
            >
              <SvgIcon
                src={"/assets/svgs/chevron-right.svg"}
                ariaLabel="text"
                width={14}
                height={14}
                className="size-[14px] shrink-0 rotate-180 text-[#6B4A2F] hover:text-[#D5B994]"
              />
            </button>
            <button
              type="button"
              aria-label="Next"
              className="w-8 h-8 md:w-[55px] md:h-[50px] flex items-center justify-center rounded-br-3xl rounded-tr-3xl rounded-bl-2xl rounded-tl-2xl"
              onClick={() => scrollTabs("next")}
              style={{
                boxShadow: "0px 4px 12px 0px #6B4A2F26",
                background:
                  "linear-gradient(180deg, #FEFCFA 0%, #FAF3EF 50%, #F5EDE8 100%)",
              }}
            >
              <SvgIcon
                src={"/assets/svgs/chevron-right.svg"}
                ariaLabel="text"
                width={14}
                height={14}
                className="size-[14px] shrink-0 text-[#6B4A2F] hover:text-[#D5B994]"
              />
            </button>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default CategoryTabs;
