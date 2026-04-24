import { useMemo } from "react";
import { useAirtable } from "@/hooks/useAirtable";
import { AIRTABLE_ENDPOINTS } from "@/services/airtable.service";
import { GalleryRecord } from "../../types";
import { GalleryItem } from "./types";

export const useGalleryItems = (): GalleryItem[] => {
  const { data: galleryRecords } = useAirtable<GalleryRecord>(
    AIRTABLE_ENDPOINTS.home_gallery
  );

  const galleryItems: GalleryItem[] = useMemo(() => {
    if (!galleryRecords || galleryRecords.length === 0) {
      return [];
    }

    return galleryRecords
      .filter((record) => {
        // Filter out records without valid URLs
        if (Array.isArray(record.image) && record.image.length > 0) {
          const firstUrl = record.image[0];
          return (
            firstUrl &&
            (typeof firstUrl === "string" ||
              (typeof firstUrl === "object" && firstUrl.thumbnails?.full?.url))
          );
        }
        return false;
      })
      .map((record) => {
        let imageUrl: string | undefined = undefined;
        if (Array.isArray(record.image) && record.image.length > 0) {
          const firstUrl = record.image[0];
          if (typeof firstUrl === "object" && firstUrl.thumbnails?.full?.url) {
            imageUrl = firstUrl.thumbnails.full.url;
          } else if (typeof firstUrl === "string") {
            imageUrl = firstUrl;
          } else if (typeof firstUrl === "object" && firstUrl.url) {
            imageUrl = firstUrl.url;
          }
        }

        return {
          id: record.id || `gallery-${Math.random()}`,
          url: imageUrl,
        };
      })
      .sort((a, b) => {
        const recordA = galleryRecords.find((r) => r.id === a.id);
        const recordB = galleryRecords.find((r) => r.id === b.id);
        const orderA = recordA?.order ?? 0;
        const orderB = recordB?.order ?? 0;
        return orderA - orderB;
      });
  }, [galleryRecords]);

  return galleryItems;
};
