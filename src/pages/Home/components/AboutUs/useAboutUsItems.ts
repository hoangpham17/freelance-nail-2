import { useMemo } from "react";
import { AboutUsItem, AboutUsItemRecord } from "../../types";
import { useAirtable } from "@/hooks/useAirtable";
import { AIRTABLE_ENDPOINTS } from "@/services/airtable.service";

export const useAboutUsItems = (): {
  items: AboutUsItem[];
  loading: boolean;
} => {
  const { data, loading } = useAirtable<AboutUsItemRecord>(
    AIRTABLE_ENDPOINTS.home_aboutUs,
  );

  const items: AboutUsItem[] = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }

    return data
      .map((record) => {
        const imageUrl =
          Array.isArray(record.image) && record.image.length > 0
            ? record.image[0].url
            : undefined;

        return {
          id: record.id,
          imageUrl,
          note: record.note,
          order: record.order ?? 0,
        };
      })
      .sort((a, b) => a.order - b.order);
  }, [data]);

  return { items, loading };
};
