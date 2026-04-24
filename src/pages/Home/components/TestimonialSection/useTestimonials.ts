import { useMemo } from "react";
import { useAirtable } from "@/hooks/useAirtable";
import { AIRTABLE_ENDPOINTS } from "@/services/airtable.service";
import { HomeCommentRecord } from "../../types";

export interface TestimonialItem {
  id: string;
  name: string;
  comment: string;
  imageUrl?: string;
  order: number;
}

interface UseTestimonialsResult {
  testimonials: TestimonialItem[];
  loading: boolean;
}

export const useTestimonials = (
  tableId: string = AIRTABLE_ENDPOINTS.home_testimonial,
): UseTestimonialsResult => {
  const { data: commentRecords, loading } = useAirtable<HomeCommentRecord>(
    tableId,
  );

  const testimonials = useMemo(() => {
    if (!commentRecords || commentRecords.length === 0) {
      return [];
    }

    return commentRecords
      .map((record) => {
        let imageUrl: string | undefined = undefined;
        if (Array.isArray(record.image) && record.image.length > 0) {
          const firstImage = record.image[0];
          if (
            typeof firstImage === "object" &&
            firstImage.thumbnails?.full?.url
          ) {
            imageUrl = firstImage.thumbnails.full.url;
          } else if (typeof firstImage === "string") {
            imageUrl = firstImage;
          } else if (typeof firstImage === "object" && firstImage.url) {
            imageUrl = firstImage.url;
          }
        }

        return {
          id: record.id || `testimonial-${Math.random()}`,
          name: record.guest_name || "Guest",
          comment: record.comment || "",
          imageUrl,
          order: record.order ?? 0,
        };
      })
      .sort((a, b) => a.order - b.order);
  }, [commentRecords]);

  return {
    testimonials,
    loading,
  };
};
