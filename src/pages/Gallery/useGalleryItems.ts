import { useMemo } from "react";
import { useInfiniteGallery } from "../../hooks/useInfiniteGallery";
import { GalleryItem, GalleryRecord } from "./types";
import {
  getGalleryAttachmentUrl,
  hasValidGalleryAttachment,
  isVideoAttachment,
} from "@/pages/Home/components/GallerySection/utils/galleryAttachment";

interface UseGalleryItemsParams {
  activeFilter: string;
  debouncedSearchQuery: string;
}

interface UseGalleryItemsResult {
  galleryItems: GalleryItem[];
  loading: boolean;
  error: Error | null;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

function resolveRecordMedia(record: GalleryRecord): {
  url: string;
  isVideo: boolean;
} {
  if (
    record.image &&
    Array.isArray(record.image) &&
    record.image.length > 0
  ) {
    const attachment = record.image[0];
    const url = getGalleryAttachmentUrl(attachment) ?? "";
    return {
      url,
      isVideo: hasValidGalleryAttachment(attachment)
        ? isVideoAttachment(attachment)
        : false,
    };
  }

  if (record.url) {
    const legacy = Array.isArray(record.url) ? record.url[0] : record.url;
    const url =
      typeof legacy === "string" ? legacy : legacy?.url ?? "";
    return { url, isVideo: url ? isVideoAttachment(url) : false };
  }

  return { url: "", isVideo: false };
}

export const useGalleryItems = ({
  activeFilter,
  debouncedSearchQuery,
}: UseGalleryItemsParams): UseGalleryItemsResult => {
  const {
    data: galleryData,
    loading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteGallery<GalleryRecord>(
    activeFilter !== "All" ? activeFilter : undefined,
    21,
    debouncedSearchQuery.trim() || undefined,
  );

  const galleryItems: GalleryItem[] = useMemo(() => {
    if (!galleryData || galleryData.length === 0) {
      return [];
    }

    return galleryData
      .map((record, index) => {
        const { url, isVideo } = resolveRecordMedia(record);

        const categoryArr = record.category;
        const category = Array.isArray(categoryArr)
          ? categoryArr
              .filter((c): c is string => typeof c === "string")
              .map((c) => c.toLowerCase())
          : categoryArr
            ? [String(categoryArr).toLowerCase()]
            : undefined;

        const item: GalleryItem = {
          id: record.id || `gallery-${index}`,
          url,
          isVideo,
          category: category?.length ? category : undefined,
        };

        return item;
      })
      .filter((item) => item.url);
  }, [galleryData]);

  return {
    galleryItems,
    loading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};
