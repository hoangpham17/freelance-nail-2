import { useMemo } from "react";
import { useAirtable } from "../../hooks/useAirtable";
import { AIRTABLE_ENDPOINTS } from "../../services/airtable.service";
import { HomeTitleBlockRecord } from "./types";

export interface UseHomeTitleBlockResult {
  titleBlocks: HomeTitleBlockRecord[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  getBlockBySection: (id_section: string) => HomeTitleBlockRecord | undefined;
}

export const useHomeTitleBlock = (): UseHomeTitleBlockResult => {
  const { data, loading, error, refetch } = useAirtable<HomeTitleBlockRecord>(
    AIRTABLE_ENDPOINTS.home_title_block,
  );

  const titleBlocks: HomeTitleBlockRecord[] = useMemo(() => {
    return data || [];
  }, [data]);

  const getBlockBySection = (blockName: string) => {
    return titleBlocks.find((item) => item.block === blockName);
  };

  return {
    titleBlocks,
    loading,
    error,
    refetch,
    getBlockBySection,
  };
};
