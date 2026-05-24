import React, { useState, useRef, useEffect } from "react";
import { useCampaignStore } from "@/shared/store/campaignStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import clsx from "clsx";
import { Flex } from "antd";
import { useScreen } from "@/hooks/useScreen";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { Wrapper } from "@/based/components/Wrapper";
import SvgIcon from "@/based/SvgIcon";
import galleryContent from "@/content/gallery.json";

interface Filter {
  id: string;
  label: string;
}

interface CategoryTabsProps {
  filters: Filter[];
  activeFilter: string;
  onChange: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  filters,
  activeFilter,
  onChange,
  searchQuery,
  onSearchChange,
}) => {
  const { isDesktop } = useScreen();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const showCampaignBar = useCampaignStore((state) => state.showCampaignBar);
  const campaignBarHeight = useCampaignStore(
    (state) => state.campaignBarHeight,
  );
  const headerHeight = useCampaignStore((state) => state.headerHeight);

  const stickyTop = headerHeight + (showCampaignBar ? campaignBarHeight : 0);
  const minStickyTop = isDesktop ? 80 : 72;
  const effectiveStickyTop = stickyTop > 0 ? stickyTop : minStickyTop;

  const checkShowArrows = () => {
    const swiper = swiperRef.current;
    const container = containerRef.current;
    if (!swiper?.wrapperEl || !container) return;
    const contentWidth = swiper.wrapperEl.scrollWidth;
    const containerWidth = container.clientWidth;
    setShowArrows(contentWidth > containerWidth);
  };

  useEffect(() => {
    if (!isSearchOpen) return;
    const id = setTimeout(() => searchInputRef.current?.focus(), 50);
    return () => clearTimeout(id);
  }, [isSearchOpen]);

  useEffect(() => {
    const index = filters.findIndex((f) => f.id === activeFilter);
    if (index >= 0 && swiperRef.current) {
      swiperRef.current.slideTo(index, 400);
    }
  }, [activeFilter, filters]);

  useEffect(() => {
    checkShowArrows();
    const t = setTimeout(checkShowArrows, 100);
    return () => clearTimeout(t);
  }, [filters]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => checkShowArrows());
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    onSearchChange("");
  };

  const scrollTabs = (direction: "prev" | "next") => {
    if (!swiperRef.current) return;
    if (direction === "next") {
      swiperRef.current.slideNext();
    } else {
      swiperRef.current.slidePrev();
    }
  };

  if (!filters.length) return null;

  return (
    <section
      className="sticky z-30 w-full transition-all duration-300 bg-black/95 backdrop-blur-sm border-b border-madison-border/40"
      style={{
        top: effectiveStickyTop,
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.35)",
      }}
    >
      <Wrapper>
        <div className="flex items-center gap-2">
          {/* Filter pills — Swiper + prev/next như Services */}
          <div
            ref={containerRef}
            className="flex-1 min-w-0 overflow-hidden relative"
          >
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                setTimeout(checkShowArrows, 0);
              }}
              modules={[FreeMode]}
              slidesPerView="auto"
              spaceBetween={0}
              freeMode={{ enabled: true, sticky: false }}
              speed={400}
              resistance
              resistanceRatio={0}
              className={clsx(
                "gallery-tabs-swiper",
                showArrows && "pr-[100px] md:pr-[120px] lg:pr-[140px]",
              )}
            >
              {filters.map((filter) => {
                const isActive = filter.id === activeFilter;
                return (
                  <SwiperSlide key={filter.id} className="!w-auto pl-3">
                    <div
                      onClick={() => {
                        onChange(filter.id);
                        setIsSearchOpen(false);
                        onSearchChange("");
                      }}
                      className="cursor-pointer py-2 lg:py-4 group"
                    >
                      <Flex
                        align="center"
                        justify="center"
                        className={clsx(
                          "tab-item px-4 h-[32px] lg:h-[50px] rounded-2xl border whitespace-nowrap font-montserrat font-medium",
                          isActive
                            ? "bg-madison-gold text-madison-gold-text border-madison-gold"
                            : "bg-madison-surface text-madison-muted group-hover:text-madison-gold border-madison-border",
                          responsiveFontSizeArray(16, 20),
                        )}
                        style={{
                          backdropFilter: "blur(10px)",
                          boxShadow: isActive
                            ? "0px 5px 16px 0px #6B4A2F26"
                            : "0px 5px 16px 0px #8B4B2026",
                        }}
                      >
                        {filter.label}
                      </Flex>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            {/* Fade edge + Nút Prev/Next — chỉ hiện khi tổng width tab > width container */}
            {showArrows && (
              <>
                <div className="absolute top-0 right-0 bottom-0 w-[100px] md:w-[120px] lg:w-[140px] pointer-events-none z-10 bg-gradient-to-l from-white/95 to-transparent" />
                <div className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center flex-shrink-0 z-20">
                  <button
                    type="button"
                    aria-label={
                      (
                        galleryContent as {
                          categoryTabs: { ariaPrevTabs: string };
                        }
                      ).categoryTabs.ariaPrevTabs
                    }
                    className="w-8 h-8 md:w-[55px] md:h-[50px] flex items-center justify-center rounded-bl-3xl rounded-tl-3xl rounded-br-2xl rounded-tr-2xl transition-colors"
                    onClick={() => scrollTabs("prev")}
                    style={{
                      boxShadow: "0px 4px 12px 0px #6B4A2F26",
                      background:
                        "linear-gradient(180deg, #FEFCFA 0%, #FAF3EF 50%, #F5EDE8 100%)",
                    }}
                  >
                    <SvgIcon
                      src="/assets/svgs/chevron-right.svg"
                      ariaLabel=""
                      width={14}
                      height={14}
                      className="shrink-0 rotate-180 text-[#6B4A2F] hover:text-[#D5B994]"
                    />
                  </button>
                  <button
                    type="button"
                    aria-label={
                      (
                        galleryContent as {
                          categoryTabs: { ariaNextTabs: string };
                        }
                      ).categoryTabs.ariaNextTabs
                    }
                    className="w-8 h-8 md:w-[55px] md:h-[50px] flex items-center justify-center rounded-br-3xl rounded-tr-3xl rounded-bl-2xl rounded-tl-2xl transition-colors"
                    onClick={() => scrollTabs("next")}
                    style={{
                      boxShadow: "0px 4px 12px 0px #6B4A2F26",
                      background:
                        "linear-gradient(180deg, #FEFCFA 0%, #FAF3EF 50%, #F5EDE8 100%)",
                    }}
                  >
                    <SvgIcon
                      src="/assets/svgs/chevron-right.svg"
                      ariaLabel=""
                      width={14}
                      height={14}
                      className="shrink-0 text-[#6B4A2F] hover:text-[#D5B994]"
                    />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Search */}
          <div className="flex-shrink-0 z-20 flex items-center gap-1">
            {isSearchOpen ? (
              <div className="flex items-center rounded-2xl border border-[#E8DED8] bg-white/90 pl-2.5 pr-1.5 py-1 gap-1 lg:pl-3 lg:pr-2 lg:py-1.5 shadow-[0px_2px_8px_0px_#8B4B2015]">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={
                    (
                      galleryContent as {
                        categoryTabs: { searchPlaceholder: string };
                      }
                    ).categoryTabs.searchPlaceholder
                  }
                  className="w-[120px] lg:w-[180px] h-7 min-h-0 py-0 lg:h-auto lg:py-0 bg-transparent text-[#5C4D42] placeholder-[#8A6A4F]/60 outline-none border-none text-sm font-light leading-tight"
                />
                <button
                  type="button"
                  onClick={handleSearchClose}
                  aria-label={
                    (
                      galleryContent as {
                        categoryTabs: { ariaCloseSearch: string };
                      }
                    ).categoryTabs.ariaCloseSearch
                  }
                  className="w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-[#6B4A2F] hover:bg-[#E8DED8]/50 transition-colors shrink-0"
                >
                  <span className="text-base lg:text-lg leading-none">×</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label={
                  (galleryContent as { categoryTabs: { ariaSearch: string } })
                    .categoryTabs.ariaSearch
                }
                className="w-8 h-8 lg:w-[50px] lg:h-[50px] flex items-center justify-center rounded-2xl lg:rounded-bl-2xl lg:rounded-tr-2xl transition-colors"
                style={{
                  boxShadow: "0px 4px 12px 0px #6B4A2F26",
                  background:
                    "linear-gradient(180deg, #FEFCFA 0%, #FAF3EF 50%, #F5EDE8 100%)",
                }}
              >
                <SvgIcon
                  src="/assets/svgs/search.svg"
                  ariaLabel="Search"
                  width={isDesktop ? 20 : 18}
                  height={isDesktop ? 20 : 18}
                  className="shrink-0 text-[#6B4A2F] hover:text-[#D5B994]"
                />
              </button>
            )}
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default CategoryTabs;
