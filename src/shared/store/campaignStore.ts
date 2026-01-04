import { create } from "zustand";

interface CampaignStoreState {
  showCampaignBar: boolean;
  campaignBarHeight: number;
  headerHeight: number;
  setShowCampaignBar: (value: boolean) => void;
  setCampaignBarHeight: (value: number) => void;
  setHeaderHeight: (value: number) => void;
}

export const useCampaignStore = create<CampaignStoreState>((set) => ({
  showCampaignBar: false,
  campaignBarHeight: 0,
  headerHeight: 0,
  setShowCampaignBar: (value) => set({ showCampaignBar: value }),
  setCampaignBarHeight: (value) => set({ campaignBarHeight: value }),
  setHeaderHeight: (value) => set({ headerHeight: value }),
}));
