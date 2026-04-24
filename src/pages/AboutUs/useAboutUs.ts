import { useQuery } from "@tanstack/react-query";
import {
  fetchAirtableData,
  AIRTABLE_ENDPOINTS,
} from "@/services/airtable.service";
import type { AboutUsSection, AboutUsSectionRecord } from "./types";

interface UseAboutUsResult {
  data: AboutUsSection[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const mapRecordToSection = (record: AboutUsSectionRecord): AboutUsSection => {
  const imageUrl =
    Array.isArray(record.image) && record.image.length > 0
      ? record.image[0].url
      : "";
  const position =
    record.position === "left" || record.position === "right"
      ? record.position
      : "left";
  return {
    id: record.id,
    title: record.title ?? "",
    description: record.description ?? "",
    image: imageUrl,
    position,
  };
};

const fetchAllAboutUsSections = async (): Promise<AboutUsSection[]> => {
  const allRecords: AboutUsSectionRecord[] = [];
  let offset: string | undefined = undefined;
  const pageSize = 100;

  do {
    const result: { records: AboutUsSectionRecord[]; offset?: string } =
      await fetchAirtableData<AboutUsSectionRecord>(
        AIRTABLE_ENDPOINTS.aboutUs,
        {
          sort: [{ field: "order", direction: "asc" }],
          pageSize,
          offset,
        },
      );
    allRecords.push(...result.records);
    offset = result.offset;
  } while (offset);

  return allRecords.map(mapRecordToSection);
};

export const useAboutUs = (): UseAboutUsResult => {
  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch: queryRefetch,
  } = useQuery({
    queryKey: ["aboutUs", AIRTABLE_ENDPOINTS.aboutUs],
    queryFn: fetchAllAboutUsSections,
    staleTime: 3 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
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
