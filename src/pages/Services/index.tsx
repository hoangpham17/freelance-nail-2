import React, { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useAirtable } from "../../hooks/useAirtable";
import { AIRTABLE_ENDPOINTS } from "../../services/airtable.service";
import ServiceCategorySection from "./components/ServiceCategorySection";
import CategoryTabs from "./components/CategoryTabs";
import {
  ServiceCategory,
  ServiceItem,
  ServiceCategoryRecord,
  AirtableAttachment,
} from "./types";
import { Wrapper } from "@/based/components/Wrapper";

const resolveImageUrl = (image?: string | AirtableAttachment[]): string => {
  if (typeof image === "string") return image;
  if (Array.isArray(image) && image.length > 0) return image[0]?.url || "";
  return "";
};

const Services: React.FC = () => {
  const location = useLocation();
  const { data: servicesData } = useAirtable<ServiceItem>(
    AIRTABLE_ENDPOINTS.services
  );
  const { data: categoriesData } = useAirtable<ServiceCategoryRecord>(
    AIRTABLE_ENDPOINTS.list_services
  );

  const serviceCategories: ServiceCategory[] = useMemo(() => {
    if (!categoriesData || categoriesData.length === 0) {
      return [];
    }

    return categoriesData
      .sort((a, b) => (a?.index ?? 0) - (b?.index ?? 0))
      .map((category) => ({
        id: category.id || "",
        title: category.name || "",
        slug: category.slug || "",
        description: category.description || "",
        titleBackgroundImage: resolveImageUrl(category.title_background_image),
        sectionBackgroundImage: resolveImageUrl(
          category.section_background_image
        ),
        services:
          servicesData?.filter((service) =>
            (service.category as string[])?.includes(category.slug || "")
          ) || [],
      }));
  }, [categoriesData, servicesData]);

  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(hash);
        element?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, [location.hash]);

  return (
    <main className="w-full">
      <CategoryTabs categories={serviceCategories} />
      <section className="relative w-full py-16 md:py-24 lg:py-32">
        <Wrapper>
          <h1 className="text-center text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-[#3a3a3a]">
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
