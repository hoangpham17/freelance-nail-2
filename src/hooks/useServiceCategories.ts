import { useMemo } from "react";
import { useAirtable } from "./useAirtable";
import { AIRTABLE_ENDPOINTS } from "../services/airtable.service";
import {
  ServiceCategory,
  ServiceItem,
  ServiceCategoryRecord,
  AirtableAttachment,
} from "../pages/Services/types";

const resolveImageUrl = (image?: string | AirtableAttachment[]): string => {
  if (typeof image === "string") return image;
  if (Array.isArray(image) && image.length > 0) return image[0]?.url || "";
  return "";
};

export const useServiceCategories = (): ServiceCategory[] => {
  const { data: categoriesData } = useAirtable<ServiceCategoryRecord>(
    AIRTABLE_ENDPOINTS.list_services
  );

  const { data: servicesData } = useAirtable<ServiceItem>(
    AIRTABLE_ENDPOINTS.services
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
          servicesData
            ?.filter((service) =>
              (service.category as string[])?.includes(category.slug || "")
            )
            ?.map((service) => ({
              ...service,
              price: service.price || "",
              addons: service.add_on_services || "",
            }))
            .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0)) || [],
      }));
  }, [categoriesData, servicesData]);

  return serviceCategories;
};
