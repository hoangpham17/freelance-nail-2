import { useQuery } from "@tanstack/react-query";
import { fetchAirtableData } from "../services/airtable.service";

interface UseAirtableResult<T> {
  data: T[] | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useAirtable = <T = Record<string, unknown>>(
  tableId: string,
  autoFetch: boolean = true
): UseAirtableResult<T> => {
  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch: queryRefetch,
  } = useQuery({
    queryKey: ["airtable", tableId],
    queryFn: () => fetchAirtableData<T>(tableId),
    enabled: autoFetch,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes (formerly cacheTime)
  });

  const refetch = async () => {
    await queryRefetch();
  };

  const loading = (isLoading || (isFetching && !data)) && !data;

  return {
    data: data ?? null,
    loading,
    error:
      error instanceof Error ? error : error ? new Error(String(error)) : null,
    refetch,
  };
};
