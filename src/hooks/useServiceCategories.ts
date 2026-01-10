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

export const useServiceCategories = (): {
  categories: ServiceCategory[];
  loading: boolean;
} => {
  const {
    data: categoriesData,
    loading: categoriesLoading,
  } = useAirtable<ServiceCategoryRecord>(AIRTABLE_ENDPOINTS.list_services);

  const { data: servicesData, loading: servicesLoading } = useAirtable<ServiceItem>(
    AIRTABLE_ENDPOINTS.services
  );

  const serviceCategories: ServiceCategory[] = useMemo(() => {
    if (!categoriesData || categoriesData.length === 0) {
      return [];
    }

    return categoriesData
      .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
      .map((category) => ({
        id: category.id || "",
        order: category.order || 0,
        title: category.name || "",
        slug: category.slug || "",
        description: category.description || "",
        titleBackgroundImage: resolveImageUrl(category.title_background_image),
        sectionBackgroundImage: resolveImageUrl(
          category.section_background_image
        ),
        icon: resolveImageUrl(category.icon),
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

  return {
    categories: serviceCategories,
    loading: categoriesLoading || servicesLoading,
  };
};
