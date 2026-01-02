import { useMemo } from "react";
import { useScreen } from "./useScreen";
import { useCampaignStore } from "../shared/store/campaignStore";

export const useBaseOffset = () => {
  const { isDesktop } = useScreen();
  const showCampaignBar = useCampaignStore((state) => state.showCampaignBar);
  const campaignBarHeight = useCampaignStore(
    (state) => state.campaignBarHeight
  );

  const baseOffset = useMemo(() => (isDesktop ? 100 : 64), [isDesktop]);
  const mainTopSpacing = useMemo(() => {
    if (showCampaignBar) {
      return baseOffset + campaignBarHeight;
    }
    return baseOffset;
  }, [showCampaignBar, baseOffset, campaignBarHeight]);

  return {
    mainTopSpacing,
    campaignBarHeight,
  };
};
