import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PATHS } from "@/routes/Routes";
import { useServiceCategories } from "@/hooks/useServiceCategories";
import { useCampaignStore } from "@/shared/store/campaignStore";
import { useScreen } from "@/hooks/useScreen";
import clsx from "clsx";
import { Wrapper } from "@/based/components/Wrapper";

interface ServicesSubmenuProps {
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ServicesSubmenu: React.FC<ServicesSubmenuProps> = ({
  isVisible,
  onMouseEnter,
  onMouseLeave,
}) => {
  const location = useLocation();
  const { categories: serviceCategories } = useServiceCategories();
  const { isDesktop } = useScreen();
  const showCampaignBar = useCampaignStore((state) => state.showCampaignBar);
  const campaignBarHeight = useCampaignStore(
    (state) => state.campaignBarHeight
  );

  const [isHovered, setIsHovered] = useState<string>("");

  // Calculate top position based on header height and campaign bar
  const headerHeight = isDesktop ? 100 : 64;
  const topPosition = headerHeight + (showCampaignBar ? campaignBarHeight : 0);

  const serviceNavItems = serviceCategories.map((category) => ({
    path: `${PATHS.services}#${category.slug}`,
    label: category.title,
    slug: category.slug,
  }));

  const checkIsActive = (slug: string) => {
    const isServicesPage = location.pathname === PATHS.services;
    const currentHash = location.hash.replace("#", "");
    return isServicesPage && currentHash === slug;
  };

  if (!isVisible || serviceNavItems.length === 0) return null;

  return (
    <div
      data-services-submenu="true"
      className="fixed left-0 w-full bg-white/60 backdrop-blur-sm shadow-md border-t border-gray-200 z-50"
      style={{ top: `${topPosition}px` }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Wrapper>
        <div>
          <nav className="flex flex-wrap justify-center">
            {serviceNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onMouseEnter={() => setIsHovered(item.slug)}
                onMouseLeave={() => setIsHovered("")}
                className={clsx(
                  "px-4 py-4 text-2xl capitalize transition-colors whitespace-nowrap cursor-pointer",
                  checkIsActive(item.slug)
                    ? "!text-black bg-white/80"
                    : "text-[#8B4B20] hover:text-black hover:bg-white"
                )}
                style={
                  checkIsActive(item.slug) || isHovered === item.slug
                    ? {
                        border: "1px solid",
                        borderImageSource:
                          "linear-gradient(180deg, #FFFFFF 0%, #F6E7EE 100%)",
                        borderImageSlice: 1,
                      }
                    : {}
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Wrapper>
    </div>
  );
};

export default ServicesSubmenu;
