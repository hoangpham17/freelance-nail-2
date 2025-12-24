import React, { useState, useRef, useEffect, useMemo } from "react";
import { useCampaignStore } from "@/shared/store/campaignStore";
import clsx from "clsx";
import { useScreen } from "@/hooks/useScreen";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import SvgIcon from "@/based/SvgIcon";

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
  const searchInputRef = useRef<HTMLInputElement>(null);
  const showCampaignBar = useCampaignStore((state) => state.showCampaignBar);
  const campaignBarHeight = useCampaignStore(
    (state) => state.campaignBarHeight
  );

  const baseTop = isDesktop ? 100 : 64;
  const spacing = isDesktop ? 16 : 12;
  const fixedTop =
    baseTop + (showCampaignBar ? campaignBarHeight : 0) + spacing;

  const searchIconSize = useMemo(() => (isDesktop ? 35 : 12), [isDesktop]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    onSearchChange("");
  };

  if (!filters.length) return null;

  return (
    <section
      className="fixed left-0 right-0 z-30 transition-all duration-300"
      style={{ top: fixedTop }}
    >
      <div className="flex items-center gap-4 bg-black/60 rounded-full p-1 lg:p-2 shadow-lg max-w-[calc(100%_-_24px)] md:max-w-[1227px] mx-auto border border-white h-auto lg:h-[75px] backdrop-blur-sm">
        <div
          className={clsx(
            "flex items-center justify-between flex-1 gap-2 lg:gap-4 transition-all duration-300",
            isSearchOpen && !isDesktop ? "hidden" : "flex"
          )}
        >
          {filters.map((filter) => {
            const isActive = filter.id === activeFilter;
            return (
              <button
                key={filter.id}
                onClick={() => {
                  onChange(filter.id);
                  setIsSearchOpen(false);
                  onSearchChange("");
                }}
                className={clsx(
                  "flex items-center gap-2 transition-colors flex-1 justify-center font-light md:whitespace-nowrap",
                  responsiveFontSizeArray(12, 32),
                  isActive ? "text-white" : "text-[#D9D9D9] hover:text-white"
                )}
              >
                <span
                  className={clsx(
                    "w-1.5 h-1.5 md:w-3 md:h-3 rounded-full flex-shrink-0",
                    isActive ? "bg-white" : "bg-[#D9D9D9] hover:bg-white"
                  )}
                />
                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Section */}
        <div
          className={clsx(
            "flex items-center gap-2 overflow-hidden transition-all duration-300",
            isSearchOpen && !isDesktop ? "flex-1" : "flex-shrink-0"
          )}
        >
          <div
            className={clsx(
              "flex items-center gap-2 bg-[#3a3a3a] border border-white rounded-full lg:px-4 py-1.5 lg:py-2 transition-all duration-300 ease-in-out",
              isSearchOpen
                ? isDesktop
                  ? "w-[300px] opacity-100"
                  : "w-full opacity-100 border-none px-3"
                : "w-0 opacity-0 border-0 px-0"
            )}
          >
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search..."
              className={clsx(
                "bg-transparent text-white placeholder-gray-400 text-sm lg:text-base outline-none border-none transition-opacity duration-300",
                isSearchOpen ? "w-full opacity-100" : "w-0 opacity-0"
              )}
            />
            <button
              onClick={handleSearchClose}
              className={clsx(
                "rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center flex-shrink-0 transition-all duration-300",
                isSearchOpen
                  ? "w-6 h-6 lg:w-7 lg:h-7 opacity-100"
                  : "w-0 h-0 opacity-0"
              )}
              aria-label="Close search"
            >
              <i className="bi bi-x text-white text-xs lg:text-sm" />
            </button>
          </div>
          {!isSearchOpen && (
            <button
              type="button"
              onClick={handleSearchClick}
              aria-label="Search"
              className="mr-2 lg:mr-0 w-5 h-5 lg:w-[59px] lg:h-[59px] rounded-full bg-[#3a3a3a] hover:bg-[#4a4a4a] flex items-center justify-center flex-shrink-0 transition-colors"
            >
              <SvgIcon
                src="/assets/svgs/search.svg"
                ariaLabel="text"
                width={searchIconSize}
                height={searchIconSize}
                className="shrink-0 text-white"
              />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryTabs;
