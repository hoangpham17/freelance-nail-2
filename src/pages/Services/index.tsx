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
import { useBaseOffset } from "@/hooks/useBaseOffset";

const Services: React.FC = () => {
  const { isDesktop } = useScreen();
  const location = useLocation();
  const { categories: serviceCategories, loading: isLoadingCategories } =
    useServiceCategories();
  const showCampaignBar = useCampaignStore((state) => state.showCampaignBar);
  const campaignBarHeight = useCampaignStore(
    (state) => state.campaignBarHeight
  );
  const headerHeight = useCampaignStore(
    (state) => state.headerHeight
  );
  const previousHashRef = useRef<string>("");
  const hasScrolledRef = useRef(false);
  const { mainTopSpacing } = useBaseOffset();

  const scrollToHash = (hash: string, delay: number = 150) => {
    if (!hash) return;

    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        // Calculate offset for sticky header (CategoryTabs)
        const stickyTop = headerHeight + (showCampaignBar ? campaignBarHeight : 0);
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
          hasScrolledRef.current = true;
        }
      }
    }, delay);
  };

  // Handle hash change (from navigation or URL)
  useEffect(() => {
    const currentHash = location.hash.replace("#", "");

    // Skip if hash hasn't changed
    if (currentHash === previousHashRef.current) {
      return;
    }

    // Update previous hash
    previousHashRef.current = currentHash;
    hasScrolledRef.current = false;

    if (currentHash) {
      // Wait for categories to load and DOM to be ready
      if (!isLoadingCategories && serviceCategories.length > 0) {
        scrollToHash(currentHash, 300);
      }
    } else {
      // If hash is cleared, reset the ref
      previousHashRef.current = "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash, isLoadingCategories, serviceCategories.length]);

  // Handle initial load with hash (when navigating from home page)
  useEffect(() => {
    const currentHash = location.hash.replace("#", "");
    if (
      currentHash &&
      !isLoadingCategories &&
      serviceCategories.length > 0 &&
      !hasScrolledRef.current
    ) {
      scrollToHash(currentHash, 500);
      previousHashRef.current = currentHash;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingCategories, serviceCategories.length, location.hash]);

  return (
    <main
      className="w-full relative"
      style={{ paddingTop: `${mainTopSpacing}px` }}
    >
      {isLoadingCategories && serviceCategories.length === 0 && <LoadingPage />}

      <div
        className={clsx(
          "absolute left-1/2 -translate-x-1/2 w-full h-[328px]",
          isDesktop ? "top-[50px]" : "top-[10px]"
        )}
      >
        <div
          className="bg-center w-full h-full"
          style={{
            backgroundImage: `url(/assets/images/Services/banner.png)`,
            backgroundSize: isDesktop ? "auto 100%" : "170%",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

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
