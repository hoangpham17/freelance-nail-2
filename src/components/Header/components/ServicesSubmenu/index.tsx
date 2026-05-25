import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useServiceCategories } from "@/hooks/useServiceCategories";
import { useCampaignStore } from "@/shared/store/campaignStore";
import clsx from "clsx";
import { Wrapper } from "@/based/components/Wrapper";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import {
  buildServiceNavItems,
  isServiceCategoryActive,
} from "../../utils/serviceNav";

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
  const location = useLocation();
  const { categories: serviceCategories } = useServiceCategories();
  const showCampaignBar = useCampaignStore((state) => state.showCampaignBar);
  const campaignBarHeight = useCampaignStore(
    (state) => state.campaignBarHeight,
  );

  const topPosition = headerHeight + (showCampaignBar ? campaignBarHeight : 0);
  const serviceNavItems = buildServiceNavItems(serviceCategories);

  if (serviceNavItems.length === 0) return null;

  return (
    <div
      data-services-submenu="true"
      className={clsx(
        "fixed left-0 w-full z-50 hidden lg:block transition-all duration-300 ease-out",
        "bg-black/95 backdrop-blur-sm border-b border-madison-border/50",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-1 pointer-events-none",
      )}
      style={{
        top: `${topPosition}px`,
        boxShadow: isVisible ? "0 8px 32px rgba(0, 0, 0, 0.45)" : "none",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-hidden={!isVisible}
    >
      <div className="h-px w-full bg-madison-gold/20" aria-hidden />
      <Wrapper>
        <nav
          className="flex flex-wrap items-center justify-center gap-2 xl:gap-3 py-3 xl:py-4"
          aria-label="Service categories"
        >
          {serviceNavItems.map((item) => {
            const isActive = isServiceCategoryActive(
              location.pathname,
              location.hash,
              item.slug,
            );
            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  "inline-flex items-center justify-center h-9 xl:h-11 px-4 xl:px-5 rounded-2xl border font-montserrat capitalize whitespace-nowrap transition-colors duration-200",
                  responsiveFontSizeArray(13, 15),
                  isActive
                    ? "bg-madison-gold text-madison-gold-text border-madison-gold font-semibold"
                    : "bg-madison-surface/90 text-madison-muted border-madison-border/80 hover:text-madison-gold hover:border-madison-gold/60",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </Wrapper>
    </div>
  );
};

export default ServicesSubmenu;
