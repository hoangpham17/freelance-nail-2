import React, { useRef, useState, useEffect } from "react";
import { ServiceCategory } from "../../types";
import ServiceCard from "../ServiceCard";
import { Wrapper } from "@/based/components/Wrapper";
import { Flex } from "antd";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { parseAirtableRichtext } from "@/shared/utils/richtext";
import { useScreen } from "@/hooks/useScreen";
import { useCampaignStore } from "@/shared/store/campaignStore";
import { SectionBackground } from "./SectionBackground";
import servicesContent from "@/content/services.json";

interface ServiceCategorySectionProps {
  category: ServiceCategory;
  index: number;
  imagePosition: "left" | "right";
  totalServices: number;
}

const ServiceCategorySection: React.FC<ServiceCategorySectionProps> = ({
  category,
  index, // eslint-disable-line @typescript-eslint/no-unused-vars
  imagePosition,
  totalServices,
}) => {
  const { isDesktop } = useScreen();
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const showCampaignBar = useCampaignStore((state) => state.showCampaignBar);
  const campaignBarHeight = useCampaignStore(
    (state) => state.campaignBarHeight,
  );
  const headerHeight = useCampaignStore((state) => state.headerHeight);
  const [maxImageHeight, setMaxImageHeight] = useState<number>(862);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [animatedItems, setAnimatedItems] = useState<Set<string>>(new Set());
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(
    null,
  );
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const categoryImage = category.section_image || "";

  // Reset image loaded state when category image URL changes (e.g. tab switch)
  useEffect(() => {
    setImageLoaded(false);
  }, [categoryImage]);

  const stickyTop = headerHeight + (showCampaignBar ? campaignBarHeight : 0);
  const categoryTabsHeight = isDesktop ? 56 : 32;
  const minHeaderHeight = isDesktop ? 80 : 72;
  const effectiveStickyTop = stickyTop > 0 ? stickyTop : minHeaderHeight;
  const offset = effectiveStickyTop + categoryTabsHeight + 20;

  // Calculate max height for image: 100dvh - headerHeight - CategoryTabs height - 40px
  // Mobile: max 400px, Desktop: max 862px
  useEffect(() => {
    const calculateMaxHeight = () => {
      const viewportHeight = window.innerHeight;
      const calculatedHeight =
        viewportHeight - headerHeight - categoryTabsHeight - 40;
      const maxHeight = isDesktop ? 862 : 400;
      setMaxImageHeight(Math.min(Math.max(calculatedHeight, 300), maxHeight)); // Minimum 300px
    };

    calculateMaxHeight();
    window.addEventListener("resize", calculateMaxHeight);

    return () => {
      window.removeEventListener("resize", calculateMaxHeight);
    };
  }, [headerHeight, categoryTabsHeight, isDesktop]);

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    observer.observe(currentSection);

    return () => {
      observer.unobserve(currentSection);
    };
  }, [isVisible]);

  // Intersection Observer for individual service items
  useEffect(() => {
    const serviceCards = sectionRef.current?.querySelectorAll(
      "[data-service-card]",
    );
    if (!serviceCards || serviceCards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute("data-service-card");
            if (cardId) {
              setAnimatedItems((prev) => new Set(prev).add(cardId));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -15px 0px",
      },
    );

    serviceCards.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      serviceCards.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, [category.services]);

  const getBackgroundColor = () => {
    if (totalServices % 2 === 0) {
      return index % 2 === 0 ? "bg-[#FEF5F1]" : "bg-white";
    }

    return index % 2 !== 0 ? "bg-[#FEF5F1]" : "bg-white";
  };

  return (
    <article
      ref={sectionRef}
      id={category.slug}
      data-service-section="true"
      className={clsx(
        "relative w-full transition-all duration-500 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        getBackgroundColor(),
      )}
      style={{
        scrollMarginTop: `${offset}px`,
      }}
    >
      <SectionBackground sectionIndex={index} />
      <Wrapper
        className={clsx("relative z-10 py-8 lg:py-16 !overflow-visible")}
      >
        <Flex
          align={isDesktop ? "start" : "start"}
          gap={isDesktop ? 48 : 32}
          className={clsx(
            "w-full",
            isDesktop
              ? imagePosition === "left"
                ? "flex-row"
                : "flex-row-reverse"
              : "flex-col",
          )}
        >
          {/* Category Image */}
          {categoryImage && (
            <div
              className="flex-shrink-0 w-full lg:w-1/3 flex justify-center lg:justify-start lg:sticky lg:self-start"
              style={{
                top: isDesktop ? `${offset + 15}px` : undefined,
                zIndex: 10,
              }}
            >
              <div
                ref={imageContainerRef}
                className={clsx(
                  "relative w-full border  p-4 rounded-full transition-all duration-1000 ease-out delay-200",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8",
                  imageLoaded ? "border-[#B2866D]" : "border-transparent",
                )}
                style={{
                  maxWidth: isDesktop ? "546px" : "250px",
                  width: isDesktop ? "auto" : "250px",
                  height: isDesktop ? `${maxImageHeight}px` : "400px",
                }}
              >
                <div
                  className="rounded-full overflow-hidden w-full h-full relative bg-[#EDE6E0]"
                  style={{
                    height: isDesktop ? `${maxImageHeight - 32}px` : "368px",
                  }}
                >
                  <img
                    src={categoryImage}
                    alt={category.title}
                    className={clsx(
                      "w-full h-full object-cover object-center transition-opacity duration-300",
                      imageLoaded ? "opacity-100" : "opacity-0",
                    )}
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Title, Description and Service List */}
          <Flex
            vertical
            gap={isDesktop ? 24 : 16}
            className={clsx("w-full", categoryImage ? "lg:w-2/3" : "lg:w-full")}
          >
            <div
              className={clsx(
                "transition-all duration-1000 ease-out delay-300",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8",
              )}
            >
              <h2
                className={clsx(
                  "font-playfairDisplay font-bold text-[#6B4A2F] m-0",
                  responsiveFontSizeArray(34, 64),
                )}
              >
                {category.title}
              </h2>
              <div
                className="mt-2 lg:mt-3 h-px w-24 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #B2866D 0%, transparent 100%)",
                }}
              />
            </div>
            {category.description && (
              <div
                className={clsx(
                  "font-extralight text-[#4A3A2F] transition-all duration-1000 ease-out delay-400",
                  !categoryImage && "md:max-w-[50%]",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8",
                  responsiveFontSizeArray(14, 16),
                )}
                dangerouslySetInnerHTML={{
                  __html: parseAirtableRichtext(category.description),
                }}
              />
            )}

            {/* Service List */}
            <div
              className={clsx(
                "w-full",
                !categoryImage && isDesktop && "grid grid-cols-2 gap-x-8",
              )}
            >
              {category.services.map((service, idx) => {
                const cardId = service.id || `service-${idx}`;
                const isCardVisible = animatedItems.has(cardId);
                const isTwoColumnLayout = !categoryImage && isDesktop;
                const isAlwaysExpanded = !service.is_expand;
                const isExpanded =
                  isAlwaysExpanded || expandedServiceId === cardId;
                const handleToggle = () => {
                  if (isAlwaysExpanded) return;
                  setExpandedServiceId((prev) =>
                    prev === cardId ? null : cardId,
                  );
                };

                return (
                  <React.Fragment key={service.id}>
                    {idx > 0 && !isTwoColumnLayout && (
                      <div
                        className={clsx(
                          "border-t border-[#6B4A2F] transition-all duration-700 ease-out",
                          isCardVisible ? "opacity-100" : "opacity-0",
                        )}
                        style={{
                          transitionDelay: `${500 + idx * 100}ms`,
                        }}
                      />
                    )}
                    <div
                      data-service-card={cardId}
                      className={clsx(
                        "transition-all duration-700 ease-out",
                        isCardVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8",
                        isTwoColumnLayout && "border-b border-[#6B4A2F]",
                      )}
                      style={{
                        transitionDelay: `${500 + idx * 100}ms`,
                      }}
                    >
                      <ServiceCard
                        {...service}
                        isExpanded={isExpanded}
                        onToggle={handleToggle}
                        disableToggle={isAlwaysExpanded}
                      />
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            {/* Additional charge */}
            {category.additional_charge && (
              <>
                <div
                  className="mt-4 lg:mt-6 h-px w-24 mx-auto"
                  style={{
                    background:
                      "linear-gradient(90deg, #B2866D 0%, transparent 100%)",
                  }}
                />
                <div
                  className={clsx(
                    "w-full text-center transition-all duration-1000 ease-out delay-400",
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8",
                  )}
                >
                  <p
                    className={clsx(
                      "font-playfairDisplay font-bold text-[#6B4A2F] m-0 mb-1",
                      responsiveFontSizeArray(16, 20),
                    )}
                  >
                    {(servicesContent as { categorySection: { additionalChargeLabel: string } }).categorySection.additionalChargeLabel}
                  </p>
                  <div
                    className={clsx(
                      "font-extralight text-[#4A3A2F]",
                      responsiveFontSizeArray(14, 16),
                    )}
                    dangerouslySetInnerHTML={{
                      __html: parseAirtableRichtext(category.additional_charge),
                    }}
                  />
                </div>
              </>
            )}
          </Flex>
        </Flex>
      </Wrapper>
    </article>
  );
};

export default ServiceCategorySection;
