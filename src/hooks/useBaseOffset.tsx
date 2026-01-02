import { useMemo } from "react";
import { useScreen } from "./useScreen";
import { useCampaignStore } from "../shared/store/campaignStore";

export const useBaseOffset = () => {
  const { isDesktop } = useScreen();

  const campaignBarHeight = useCampaignStore(
    (state) => state.campaignBarHeight
  );

  const baseOffset = useMemo(() => (isDesktop ? 100 : 64), [isDesktop]);

  const mainTopSpacing = useMemo(() => {
    return baseOffset + campaignBarHeight;
  }, [baseOffset, campaignBarHeight]);

  return {
    mainTopSpacing,
    campaignBarHeight,
  };
};
