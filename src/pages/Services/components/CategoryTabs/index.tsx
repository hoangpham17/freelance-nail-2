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
  const isUpdatingHashRef = useRef(false);
  const currentHashRef = useRef<string>("");

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

  // Detect which section is in view and update hash on scroll
  useEffect(() => {
    if (categories.length === 0) return;

    let observer: IntersectionObserver | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const categoryTabsHeight = isDesktop ? 56 : 32;
    const offset = stickyTop + categoryTabsHeight + 20;

    const observerOptions = {
      root: null,
      rootMargin: `-${offset}px 0px -50% 0px`,
      threshold: [0, 0.1, 0.5, 1],
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Don't update hash if we're currently updating it programmatically
      if (isUpdatingHashRef.current) return;

      // Find the entry with the highest intersection ratio that's above the threshold
      const visibleEntries = entries.filter(
        (entry) => entry.intersectionRatio > 0.1
      );

      if (visibleEntries.length === 0) return;

      // Sort by intersection ratio and position (top to bottom)
      visibleEntries.sort((a, b) => {
        if (Math.abs(a.intersectionRatio - b.intersectionRatio) > 0.1) {
          return b.intersectionRatio - a.intersectionRatio;
        }
        return a.boundingClientRect.top - b.boundingClientRect.top;
      });

      const mostVisible = visibleEntries[0];
      const sectionId = mostVisible.target.id;

      if (sectionId && categories.some((cat) => cat.slug === sectionId)) {
        // Use ref to track current hash instead of location.hash to avoid stale closures
        const decodedSectionId = decodeURIComponent(sectionId);

        // Always update if different, even if it's the initial hash
        // This ensures we update hash when scrolling back to the initial section
        if (currentHashRef.current !== decodedSectionId) {
          isUpdatingHashRef.current = true;
          setActiveCategorySlug(decodedSectionId);
          currentHashRef.current = decodedSectionId;
          // Update URL hash without triggering scroll
          window.history.replaceState(
            null,
            "",
            `${location.pathname}#${sectionId}`
          );
          // Reset flag after a short delay
          setTimeout(() => {
            isUpdatingHashRef.current = false;
          }, 100);
        }
      }
    };

    const setupObserver = () => {
      // Observe all category sections
      const sections = categories
        .map((cat) => document.getElementById(cat.slug))
        .filter((el) => el !== null) as HTMLElement[];

      if (sections.length === 0) {
        // Retry after a short delay if sections aren't ready yet
        timeoutId = setTimeout(setupObserver, 100);
        return;
      }

      observer = new IntersectionObserver(observerCallback, observerOptions);
      sections.forEach((section) => {
        observer?.observe(section);
      });
    };

    // Wait a bit for DOM to be ready, then setup observer
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
  }, [categories, location.pathname, location.hash, stickyTop, isDesktop]);

  const handleTabClick = (categorySlug: string) => {
    isUpdatingHashRef.current = true;
    setActiveCategorySlug(categorySlug);
    currentHashRef.current = categorySlug;
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

    // Reset flag after scroll completes
    setTimeout(() => {
      isUpdatingHashRef.current = false;
    }, 500);
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
