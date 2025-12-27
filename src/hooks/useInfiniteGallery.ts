import { useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchAirtableData,
  AirtableQueryOptions,
  AIRTABLE_ENDPOINTS,
} from "../services/airtable.service";

interface UseInfiniteGalleryResult<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  refetch: () => Promise<void>;
}

export const useInfiniteGallery = <T = Record<string, unknown>>(
  category?: string,
  pageSize: number = 21
): UseInfiniteGalleryResult<T> => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: queryRefetch,
  } = useInfiniteQuery({
    queryKey: ["infinite-gallery", AIRTABLE_ENDPOINTS.gallery, category],
    queryFn: async ({ pageParam }: { pageParam: string | undefined }) => {
      const options: AirtableQueryOptions = {
        pageSize,
        sort: [{ field: "order", direction: "asc" }],
      };

      if (category && category !== "All") {
        options.filterByFormula = `{category} = "${category}"`;
      }

      if (pageParam) {
        options.offset = pageParam as string;
      }

      return fetchAirtableData<T>(AIRTABLE_ENDPOINTS.gallery, options);
    },
    getNextPageParam: (lastPage) => lastPage.offset || undefined,
    initialPageParam: undefined,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const allRecords = data?.pages?.flatMap((page) => page.records) ?? [];
  const pages = data?.pages;
  const loading = isLoading && (!data || !pages || pages.length === 0);

  const refetch = async () => {
    await queryRefetch();
  };

  return {
    data: allRecords,
    loading,
    error:
      error instanceof Error ? error : error ? new Error(String(error)) : null,
    hasNextPage: hasNextPage ?? false,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  };
};
