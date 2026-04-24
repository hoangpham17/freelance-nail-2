import { useMemo } from "react";
import { useInfiniteGallery } from "../../hooks/useInfiniteGallery";
import { GalleryItem, GalleryRecord } from "./types";

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

    const items = galleryData.map((record, index) => {
      // Get image URL from new image field structure
      let imageUrl = "";
      if (
        record.image &&
        Array.isArray(record.image) &&
        record.image.length > 0
      ) {
        // Use the first image's URL
        imageUrl = record.image[0].url || "";
      } else if (record.url) {
        // Fallback to legacy url field for backward compatibility
        imageUrl = Array.isArray(record.url)
          ? record.url[0]?.url || ""
          : record.url || "";
      }

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
        url: imageUrl,
        category: category?.length ? category : undefined,
      };

      return item;
    });

    const itemsWithImages = items.filter((item) => item.url);

    // Return only items with images
    return itemsWithImages;
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
