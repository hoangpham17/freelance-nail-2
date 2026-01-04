import { useMemo } from "react";
import { useCampaignStore } from "../shared/store/campaignStore";

export const useBaseOffset = () => {
  const campaignBarHeight = useCampaignStore(
    (state) => state.campaignBarHeight
  );
  const headerHeight = useCampaignStore((state) => state.headerHeight);

  const mainTopSpacing = useMemo(() => {
    return headerHeight + campaignBarHeight;
  }, [headerHeight, campaignBarHeight]);

  return {
    mainTopSpacing,
    campaignBarHeight,
  };
};
