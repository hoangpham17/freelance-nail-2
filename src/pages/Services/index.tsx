import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useServiceCategories } from "../../hooks/useServiceCategories";
import ServiceCategorySection from "./components/ServiceCategorySection";
import CategoryTabs from "./components/CategoryTabs";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { useScreen } from "@/hooks/useScreen";
import { useCampaignStore } from "@/shared/store/campaignStore";
import LoadingPage from "../../components/LoadingPage";

const Services: React.FC = () => {
  const { isDesktop } = useScreen();
  const location = useLocation();
  const { categories: serviceCategories, loading: isLoadingCategories } =
    useServiceCategories();
  const showCampaignBar = useCampaignStore((state) => state.showCampaignBar);
  const campaignBarHeight = useCampaignStore(
    (state) => state.campaignBarHeight
  );
  const previousHashRef = useRef<string>("");

  useEffect(() => {
    // Only scroll when hash actually changes, not when other dependencies change
    const currentHash = location.hash.replace("#", "");

    // Skip if hash hasn't changed
    if (currentHash === previousHashRef.current) {
      return;
    }

    // Update previous hash
    previousHashRef.current = currentHash;

    if (currentHash) {
      setTimeout(() => {
        const element = document.getElementById(currentHash);
        if (element) {
          // Calculate offset for sticky header (CategoryTabs)
          const baseTop = isDesktop ? 100 : 64;
          const stickyTop = baseTop + (showCampaignBar ? campaignBarHeight : 0);
          const categoryTabsHeight = isDesktop ? 56 : 32; // Height of CategoryTabs
          const offset = stickyTop + categoryTabsHeight + 20; // Add extra padding

          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          // Check if element is already at the correct position (within 100px tolerance)
          const currentScrollY = window.pageYOffset;
          const targetScrollY = offsetPosition;
          const distance = Math.abs(currentScrollY - targetScrollY);

          // Only scroll if not already at the correct position
          if (distance > 100) {
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }
      }, 150);
    } else {
      // If hash is cleared, reset the ref
      previousHashRef.current = "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash]);

  return (
    <main className="w-full relative">
      {isLoadingCategories && serviceCategories.length === 0 && <LoadingPage />}

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

      <CategoryTabs
        categories={serviceCategories}
        loading={isLoadingCategories}
      />
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
