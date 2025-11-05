import { useState, useEffect } from "react";
import { fetchAirtableData } from "../services/airtable.service";

interface UseAirtableResult<T> {
  data: T[] | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching data from Airtable API
 * @param tableId - The Airtable table ID
 * @param autoFetch - Whether to automatically fetch data on mount (default: true)
 * @returns Object containing data, loading state, error, and refetch function
 *
 * @example
 * ```tsx
 * const { data, loading, error } = useAirtable<AboutUsData>(AIRTABLE_ENDPOINTS.aboutUs);
 * ```
 */
export const useAirtable = <T = Record<string, unknown>>(
  tableId: string,
  autoFetch: boolean = true
): UseAirtableResult<T> => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchAirtableData<T>(tableId);
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Unknown error occurred")
      );
      console.error("Error fetching Airtable data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableId, autoFetch]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
