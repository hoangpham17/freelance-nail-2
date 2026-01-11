import { useQuery } from "@tanstack/react-query";
import {
  fetchAirtableData,
  AIRTABLE_ENDPOINTS,
} from "../../services/airtable.service";
import { PolicyItem } from "./types";

interface UsePoliciesResult {
  data: PolicyItem[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Fetch all policies from Airtable with sorting by order field
 * Handles pagination to get all records
 */
const fetchAllPolicies = async (): Promise<PolicyItem[]> => {
  const allRecords: PolicyItem[] = [];
  let offset: string | undefined = undefined;
  const pageSize = 100; // Airtable max page size

  do {
    const result = await fetchAirtableData<PolicyItem>(
      AIRTABLE_ENDPOINTS.policies,
      {
        sort: [{ field: "order", direction: "asc" }],
        pageSize,
        offset,
      }
    );

    allRecords.push(...result.records);
    offset = result.offset;
  } while (offset);

  return allRecords;
};

export const usePolicies = (): UsePoliciesResult => {
  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch: queryRefetch,
  } = useQuery({
    queryKey: ["policies", AIRTABLE_ENDPOINTS.policies],
    queryFn: fetchAllPolicies,
    staleTime: 3 * 60 * 1000, // Cache data for 3 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });

  const refetch = async () => {
    await queryRefetch();
  };

  const loading = (isLoading || (isFetching && !data)) && !data;

  return {
    data: data ?? [],
    loading,
    error:
      error instanceof Error ? error : error ? new Error(String(error)) : null,
    refetch,
  };
};
