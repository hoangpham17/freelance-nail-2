import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "@/routes/Routes";
import { useServiceCategories } from "@/hooks/useServiceCategories";
import { useCampaignStore } from "@/shared/store/campaignStore";
import clsx from "clsx";
import { Wrapper } from "@/based/components/Wrapper";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

interface ServicesSubmenuProps {
  headerHeight: number;
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ServicesSubmenu: React.FC<ServicesSubmenuProps> = ({
  headerHeight,
  isVisible,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { categories: serviceCategories } = useServiceCategories();
  const showCampaignBar = useCampaignStore((state) => state.showCampaignBar);
  const campaignBarHeight = useCampaignStore(
    (state) => state.campaignBarHeight,
  );
  const [hoveredSlug, setHoveredSlug] = useState<string>("");

  const topPosition = headerHeight + (showCampaignBar ? campaignBarHeight : 0);

  const serviceNavItems = serviceCategories.map((category) => ({
    path: `${PATHS.services}#${category.slug}`,
    label: category.title,
    slug: category.slug,
  }));

  if (!isVisible || serviceNavItems.length === 0) return null;

  return (
    <div
      data-services-submenu="true"
      className="fixed left-0 w-full z-50 transition-all duration-200"
      style={{
        top: `${topPosition}px`,
        background:
          "linear-gradient(180deg, #FEFCFA 0%, #FEF8F5 50%, #FAF3EF 100%)",
        boxShadow: "0 4px 24px rgba(107, 74, 47, 0.06)",
        borderBottom: "1px solid rgba(212, 196, 181, 0.5)",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Decorative line */}
      <div
        className="h-px w-full opacity-80"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #D4C4B5 20%, #B2866D 50%, #D4C4B5 80%, transparent 100%)",
        }}
      />
      <Wrapper>
        <nav
          className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 py-2 md:py-3"
          aria-label="Service categories"
        >
          {serviceNavItems.map((item, index) => {
            const isHovered = hoveredSlug === item.slug;
            const isFirst = index === 0;
            return (
              <React.Fragment key={item.path}>
                {!isFirst && (
                  <span
                    className="hidden sm:block w-px h-4 bg-[#E8DED8] flex-shrink-0"
                    aria-hidden
                  />
                )}
                <Link
                  to={item.path}
                  onMouseEnter={() => setHoveredSlug(item.slug)}
                  onMouseLeave={() => setHoveredSlug("")}
                  className={clsx(
                    "relative px-5 py-2.5 rounded-lg font-playfairDisplay font-semibold capitalize whitespace-nowrap transition-all duration-300",
                    "text-[#6B4A2F]",
                    isHovered
                      ? "text-[#6B4A2F] bg-white/70"
                      : "hover:text-[#6B4A2F] hover:bg-white/50",
                    ...responsiveFontSizeArray(15, 18),
                  )}
                  style={
                    isHovered
                      ? {
                          boxShadow: "0 2px 12px rgba(107, 74, 47, 0.08)",
                        }
                      : undefined
                  }
                >
                  {item.label}
                </Link>
              </React.Fragment>
            );
          })}
        </nav>
      </Wrapper>
    </div>
  );
};

export default ServicesSubmenu;
