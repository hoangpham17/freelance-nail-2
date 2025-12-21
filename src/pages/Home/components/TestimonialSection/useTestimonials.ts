import { useMemo } from "react";
import { useAirtable } from "@/hooks/useAirtable";
import { AIRTABLE_ENDPOINTS } from "@/services/airtable.service";
import { HomeCommentRecord } from "../../types";
import { Testimonial, GalleryImage } from "./types";

interface UseTestimonialsResult {
  galleryImages: GalleryImage[];
  testimonials: Testimonial[];
  loading: boolean;
}

export const useTestimonials = (): UseTestimonialsResult => {
  const { data: commentRecords, loading } = useAirtable<HomeCommentRecord>(
    AIRTABLE_ENDPOINTS.home_comments
  );

  const { galleryImages, testimonials } = useMemo(() => {
    if (!commentRecords || commentRecords.length === 0) {
      return { galleryImages: [], testimonials: [] };
    }

    const images: GalleryImage[] = [];
    const testimonialData: Testimonial[] = [];

    commentRecords
      .filter((record) => {
        // Filter out records without valid image URLs
        if (Array.isArray(record.image) && record.image.length > 0) {
          const firstImage = record.image[0];
          return (
            firstImage &&
            (typeof firstImage === "string" ||
              (typeof firstImage === "object" &&
                firstImage.thumbnails?.full?.url))
          );
        }
        return false;
      })
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

        if (imageUrl) {
          const id = record.id || `gallery-${Math.random()}`;
          return {
            id,
            record,
            imageUrl,
          };
        }
        return null;
      })
      .filter((item): item is { id: string; record: HomeCommentRecord; imageUrl: string } => item !== null)
      .sort((a, b) => (a.record.order ?? 0) - (b.record.order ?? 0))
      .forEach(({ id, record, imageUrl }) => {
        images.push({
          id,
          url: imageUrl,
        });

        testimonialData.push({
          id,
          name: record.guest_name || "Guest",
          comment: record.comment || "",
          rating: 0,
          reviewCount: 0,
        });
      });

    return {
      galleryImages: images,
      testimonials: testimonialData,
    };
  }, [commentRecords]);

  return {
    galleryImages,
    testimonials,
    loading,
  };
};

