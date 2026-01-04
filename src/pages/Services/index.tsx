import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useServiceCategories } from "../../hooks/useServiceCategories";
import ServiceCategorySection from "./components/ServiceCategorySection";
import CategoryTabs from "./components/CategoryTabs";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { useScreen } from "@/hooks/useScreen";
import LoadingPage from "../../components/LoadingPage";
import { useBaseOffset } from "@/hooks/useBaseOffset";
import { useOnePageScroll } from "@/hooks/useOnePageScroll";

const Services: React.FC = () => {
  const { isDesktop } = useScreen();
  const location = useLocation();
  const { categories: serviceCategories, loading: isLoadingCategories } =
    useServiceCategories();
  const previousHashRef = useRef<string>("");
  const { mainTopSpacing } = useBaseOffset();

  // Enable one-page scroll for service sections
  const filteredCategories = serviceCategories
    .map((category, originalIndex) => ({
      category,
      originalIndex: originalIndex + 1,
    }))
    .filter(({ category }) => category.services.length > 0);

  useOnePageScroll({
    sectionSelector: 'article[data-service-section="true"]',
    enabled: filteredCategories.length > 0,
    firstSectionOffset: 100,
  });

  const scrollToHash = (hash: string, delay: number = 150) => {
    if (!hash) return;

    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        const categoryTabsHeight = isDesktop ? 90 : 50;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - categoryTabsHeight;

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
    }, delay);
  };

  // Handle hash change (from navigation or URL) and initial load
  useEffect(() => {
    if (isLoadingCategories || serviceCategories.length === 0) return;

    const currentHash = location.hash.replace("#", "");

    // Skip if hash hasn't changed
    if (currentHash === previousHashRef.current) {
      return;
    }

    // Check if this is initial load (previous hash was empty)
    const isInitialLoad = previousHashRef.current === "";

    // Update previous hash
    previousHashRef.current = currentHash;

    if (currentHash) {
      // Use longer delay for initial load, shorter for hash changes
      scrollToHash(currentHash, isInitialLoad ? 500 : 300);
    } else {
      // If hash is cleared, reset the ref
      previousHashRef.current = "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash, isLoadingCategories, serviceCategories.length]);

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
      <section
        className="w-full"
        style={{
          scrollSnapType: "y mandatory",
        }}
      >
        {filteredCategories.map(({ category, originalIndex }) => (
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
