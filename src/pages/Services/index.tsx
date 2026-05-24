import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useServiceCategories } from "../../hooks/useServiceCategories";
import ServiceCategorySection from "./components/ServiceCategorySection";
import CategoryTabs from "./components/CategoryTabs";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { useScreen } from "@/hooks/useScreen";
import { useCampaignStore } from "@/shared/store/campaignStore";
import LoadingPage from "../../components/LoadingPage";
import { useBaseOffset } from "@/hooks/useBaseOffset";
import servicesContent from "@/content/services.json";

const Services: React.FC = () => {
  const { isDesktop } = useScreen();
  const location = useLocation();
  const { categories: serviceCategories, loading: isLoadingCategories } =
    useServiceCategories();
  const showCampaignBar = useCampaignStore((state) => state.showCampaignBar);
  const campaignBarHeight = useCampaignStore(
    (state) => state.campaignBarHeight,
  );
  const headerHeight = useCampaignStore((state) => state.headerHeight);
  const previousHashRef = useRef<string>("");
  const hasScrolledRef = useRef(false);
  const { mainTopSpacing } = useBaseOffset();

  const stickyTop = headerHeight + (showCampaignBar ? campaignBarHeight : 0);
  const minHeaderHeight = isDesktop ? 80 : 72;
  const effectiveStickyTop = stickyTop > 0 ? stickyTop : minHeaderHeight;

  const scrollToHash = (hash: string, delay: number = 150) => {
    if (!hash) return;

    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        const categoryTabsHeight = isDesktop ? 56 : 32;
        // Offset = header (+ campaign bar) + category tabs height + padding so section lands below sticky
        const scrollOffset = effectiveStickyTop + categoryTabsHeight + 20;

        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - scrollOffset;

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

      {/* Banner Section */}
      <section className="relative w-full overflow-hidden px-4 md:px-6 lg:px-12 py-8 lg:py-12">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(/assets/images/Services/banner.png)`,
            backgroundSize: isDesktop ? "cover" : "cover",
          }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-0">
          <h1 className="relative">
            <span
              className={clsx(
                "block text-gold-gradient font-tangerine leading-[0.92]",
                responsiveFontSizeArray(48, 96),
              )}
            >
              {(servicesContent as { banner: { title: string } }).banner.title}
            </span>
          </h1>
          {/* <div
            className="mt-4 lg:mt-6 h-px w-24 mx-auto"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.9) 0%, transparent 100%)",
            }}
          />
          <p
            className={clsx(
              "text-white/90 font-extralight uppercase tracking-[0.25em] mt-4 lg:mt-6",
              responsiveFontSizeArray(10, 11),
            )}
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.2)" }}
          >
            Madison Nail Lounge
          </p> */}
        </div>
      </section>

      {/* Category Tabs - Sticky below banner */}
      <CategoryTabs
        categories={serviceCategories}
        loading={isLoadingCategories}
      />

      {/* Service Categories */}
      <section className="w-full">
        {serviceCategories
          ?.filter((category) => category.services.length > 0)
          ?.map((category, index) => (
            <ServiceCategorySection
              key={category.id}
              category={category}
              index={index + 1}
              imagePosition={index % 2 === 0 ? "left" : "right"}
              totalServices={serviceCategories?.length}
            />
          ))}
      </section>
    </main>
  );
};

export default Services;
