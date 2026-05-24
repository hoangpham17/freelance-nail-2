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
      className="fixed left-0 w-full z-50 transition-all duration-200 bg-madison-black-soft border-b border-madison-border"
      style={{
        top: `${topPosition}px`,
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="h-px w-full bg-madison-gold/25" aria-hidden />
      <Wrapper>
        <nav
          className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 py-3 md:py-4"
          aria-label="Service categories"
        >
          {serviceNavItems.map((item, index) => {
            const isHovered = hoveredSlug === item.slug;
            const isFirst = index === 0;
            return (
              <React.Fragment key={item.path}>
                {!isFirst && (
                  <span
                    className="hidden sm:block w-px h-4 bg-madison-border flex-shrink-0"
                    aria-hidden
                  />
                )}
                <Link
                  to={item.path}
                  onMouseEnter={() => setHoveredSlug(item.slug)}
                  onMouseLeave={() => setHoveredSlug("")}
                  className={clsx(
                    "font-montserrat capitalize transition-colors px-3 py-1 rounded-lg",
                    responsiveFontSizeArray(14, 16),
                    isHovered
                      ? "text-madison-gold bg-madison-surface"
                      : "text-madison-muted hover:text-madison-gold",
                  )}
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
