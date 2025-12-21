import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useServiceCategories } from "../../hooks/useServiceCategories";
import ServiceCategorySection from "./components/ServiceCategorySection";
import CategoryTabs from "./components/CategoryTabs";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { useScreen } from "@/hooks/useScreen";
import { useCampaignStore } from "@/shared/store/campaignStore";

const Services: React.FC = () => {
  const { isDesktop } = useScreen();
  const location = useLocation();
  const serviceCategories = useServiceCategories();
  const showCampaignBar = useCampaignStore((state) => state.showCampaignBar);
  const campaignBarHeight = useCampaignStore(
    (state) => state.campaignBarHeight
  );

  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          // Calculate offset for sticky header (CategoryTabs)
          const baseTop = isDesktop ? 100 : 64;
          const stickyTop = baseTop + (showCampaignBar ? campaignBarHeight : 0);
          const categoryTabsHeight = isDesktop ? 56 : 32; // Height of CategoryTabs
          const offset = stickyTop + categoryTabsHeight + 20; // Add extra padding

          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 150);
    }
  }, [location.hash, isDesktop, showCampaignBar, campaignBarHeight]);

  return (
    <main className="w-full relative">
      <Wrapper
        className={clsx(
          "absolute left-1/2 -translate-x-1/2 w-full h-[328px]",
          isDesktop ? "-top-[100px]" : "-top-[64px]"
        )}
      >
        <div
          className="bg-center w-full h-full"
          style={{
            backgroundImage: `url(/assets/images/Services/banner.png)`,
            backgroundSize: "auto 100%",
            backgroundRepeat: "no-repeat",
          }}
        />
      </Wrapper>

      <CategoryTabs categories={serviceCategories} />
      <section className="relative w-full pt:4 lg:pt-8">
        <Wrapper>
          <h1
            className={clsx(
              "text-center font-prata text-black/80",
              responsiveFontSizeArray(32, 100)
            )}
          >
            SERVICES NAIL LOUNGE!
          </h1>
        </Wrapper>
      </section>

      {/* Service Categories */}
      <section className="w-full">
        {serviceCategories
          .map((category, originalIndex) => ({
            category,
            originalIndex: originalIndex + 1,
          }))
          .filter(({ category }) => category.services.length > 0)
          .map(({ category, originalIndex }) => (
            <ServiceCategorySection
              key={category.id}
              category={category}
              index={originalIndex}
            />
          ))}
      </section>
    </main>
  );
};

export default Services;
