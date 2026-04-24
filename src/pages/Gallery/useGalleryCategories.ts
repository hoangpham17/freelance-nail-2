import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAirtableData,
  AIRTABLE_ENDPOINTS,
} from "@/services/airtable.service";

/** Airtable record: tag = id, name = label, order = sort order */
export type GalleryCategoryRecord = {
  id?: string;
  tag?: string;
  name?: string;
  order?: number;
};

export type GalleryCategoryFilter = {
  id: string;
  label: string;
};

interface UseGalleryCategoriesResult {
  filters: GalleryCategoryFilter[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const fetchAllGalleryCategories = async (): Promise<
  GalleryCategoryRecord[]
> => {
  const allRecords: GalleryCategoryRecord[] = [];
  let offset: string | undefined = undefined;
  const pageSize = 100;

  do {
    const result: { records: GalleryCategoryRecord[]; offset?: string } =
      await fetchAirtableData<GalleryCategoryRecord>(
        AIRTABLE_ENDPOINTS.gallery_categories,
        {
          sort: [{ field: "order", direction: "asc" }],
          pageSize,
          offset,
        },
      );

    allRecords.push(...result.records);
    offset = result.offset;
  } while (offset);

  return allRecords;
};

export const useGalleryCategories = (): UseGalleryCategoriesResult => {
  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch: queryRefetch,
  } = useQuery({
    queryKey: ["gallery-categories", AIRTABLE_ENDPOINTS.gallery_categories],
    queryFn: fetchAllGalleryCategories,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const filters: GalleryCategoryFilter[] = useMemo(() => {
    const allItem: GalleryCategoryFilter = { id: "All", label: "All" };
    if (!data || data.length === 0) {
      return [allItem];
    }
    const sorted = [...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const rest = sorted.map((record) => ({
      id: (record.tag ?? record.id ?? "") as string,
      label: (record.name ?? "") as string,
    }));
    return [allItem, ...rest];
  }, [data]);

  const refetch = async () => {
    await queryRefetch();
  };

  const loading = (isLoading || (isFetching && !data)) && !data;

  return {
    filters,
    loading,
    error:
      error instanceof Error ? error : error ? new Error(String(error)) : null,
    refetch,
  };
};
