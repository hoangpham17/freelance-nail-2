import { useMemo } from "react";
import { useAirtable } from "@/hooks/useAirtable";
import { AIRTABLE_ENDPOINTS } from "@/services/airtable.service";
import { GalleryRecord } from "../../types";
import { GalleryItem } from "./types";
import {
  getGalleryAttachmentUrl,
  hasValidGalleryAttachment,
  isVideoAttachment,
} from "./utils/galleryAttachment";

export const useGalleryItems = (): GalleryItem[] => {
  const { data: galleryRecords } = useAirtable<GalleryRecord>(
    AIRTABLE_ENDPOINTS.home_gallery,
  );

  const galleryItems: GalleryItem[] = useMemo(() => {
    if (!galleryRecords || galleryRecords.length === 0) {
      return [];
    }

    return galleryRecords
      .filter((record) => {
        if (!Array.isArray(record.image) || record.image.length === 0) {
          return false;
        }
        return hasValidGalleryAttachment(record.image[0]);
      })
      .map((record, index) => {
        const attachment = record.image![0]!;
        const url = getGalleryAttachmentUrl(attachment);
        const isVideo = isVideoAttachment(attachment);

        return {
          id: record.id || `gallery-record-${index}`,
          url,
          isVideo,
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
