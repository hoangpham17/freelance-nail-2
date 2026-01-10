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

/**
 * Builds Airtable filter formula for search query
 * Searches in description and keyword fields
 * Uses FIND with LOWER for case-insensitive search that handles empty fields better
 */
const buildSearchFormula = (searchQuery: string): string => {
  const escapedQuery = searchQuery.replace(/'/g, "''");

  return `OR(
    AND({description}, FIND(LOWER("${escapedQuery}"), LOWER({description})) > 0),
    AND({keyword}, FIND(LOWER("${escapedQuery}"), LOWER({keyword})) > 0)
  )`;
};

const combineFilters = (...filters: string[]): string => {
  const validFilters = filters.filter(Boolean);
  if (validFilters.length === 0) return "";
  if (validFilters.length === 1) return validFilters[0];
  return `AND(${validFilters.join(", ")})`;
};

export const useInfiniteGallery = <T = Record<string, unknown>>(
  category?: string,
  pageSize: number = 21,
  searchQuery?: string
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
    queryKey: [
      "infinite-gallery",
      AIRTABLE_ENDPOINTS.gallery,
      category,
      searchQuery,
    ],
    queryFn: async ({ pageParam }: { pageParam: string | undefined }) => {
      const options: AirtableQueryOptions = {
        pageSize,
      };

      // Only sort by order if there's no search query
      // When searching, we want to show results in relevance order (no sorting)
      const hasSearchQuery = searchQuery && searchQuery.trim();
      if (!hasSearchQuery) {
        options.sort = [{ field: "order", direction: "asc" }];
      }

      // Build filter formulas
      const filters: string[] = [];

      // Category filter
      if (category && category !== "All") {
        filters.push(`{category} = "${category}"`);
      }

      // Search filter
      if (hasSearchQuery) {
        filters.push(buildSearchFormula(searchQuery.trim()));
      }

      // Combine filters if any
      if (filters.length > 0) {
        options.filterByFormula = combineFilters(...filters);
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
