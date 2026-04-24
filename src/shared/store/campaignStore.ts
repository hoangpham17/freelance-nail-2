import { create } from "zustand";

interface CampaignStoreState {
  showCampaignBar: boolean;
  campaignBarHeight: number;
  headerHeight: number;
  isShowPopupCampaign: boolean;
  hasPopupCampaign: boolean;
  isGiftButtonDismissed: boolean;
  setShowCampaignBar: (value: boolean) => void;
  setCampaignBarHeight: (value: number) => void;
  setHeaderHeight: (value: number) => void;
  setIsShowPopupCampaign: (value: boolean) => void;
  setHasPopupCampaign: (value: boolean) => void;
  setIsGiftButtonDismissed: (value: boolean) => void;
}

export const useCampaignStore = create<CampaignStoreState>((set) => ({
  showCampaignBar: false,
  campaignBarHeight: 0,
  headerHeight: 0,
  isShowPopupCampaign: false,
  hasPopupCampaign: false,
  isGiftButtonDismissed: false,
  setShowCampaignBar: (value) => set({ showCampaignBar: value }),
  setCampaignBarHeight: (value) => set({ campaignBarHeight: value }),
  setHeaderHeight: (value) => set({ headerHeight: value }),
  setIsShowPopupCampaign: (value) => set({ isShowPopupCampaign: value }),
  setHasPopupCampaign: (value) => set({ hasPopupCampaign: value }),
  setIsGiftButtonDismissed: (value) => set({ isGiftButtonDismissed: value }),
}));
