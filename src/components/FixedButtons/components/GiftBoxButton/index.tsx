import React from "react";
import { useCampaignStore } from "@/shared/store/campaignStore";
import SvgIcon from "@/based/SvgIcon";

const GiftBoxButton: React.FC = () => {
  const isShowPopupCampaign = useCampaignStore(
    (state) => state.isShowPopupCampaign,
  );
  const setIsShowPopupCampaign = useCampaignStore(
    (state) => state.setIsShowPopupCampaign,
  );
  const hasPopupCampaign = useCampaignStore(
    (state) => state.hasPopupCampaign,
  );
  const isGiftButtonDismissed = useCampaignStore(
    (state) => state.isGiftButtonDismissed,
  );
  const setIsGiftButtonDismissed = useCampaignStore(
    (state) => state.setIsGiftButtonDismissed,
  );

  const handleGiftClick = () => {
    setIsShowPopupCampaign(true);
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering handleGiftClick
    setIsGiftButtonDismissed(true);
  };

  // Only show button when popup is not showing, has campaign, and not dismissed
  if (isShowPopupCampaign || !hasPopupCampaign || isGiftButtonDismissed) {
    return null;
  }

  return (
    <button
      onClick={handleGiftClick}
      className="relative md:w-[95px] md:h-[95px] w-[65px] h-[65px] rounded-full transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer overflow-visible border-0 p-0 group max-md:-mr-2 max-md:-mb-1"
      aria-label="Open promotion popup"
    >
      {/* Close button */}
      <button
        onClick={handleCloseClick}
        className="lg:opacity-0 group-hover:opacity-100 flex absolute -top-1 -right-1 md:w-6 md:h-6 w-4 h-4 bg-white rounded-full items-center justify-center shadow-md hover:bg-gray-100 transition z-10"
        aria-label="Close gift button"
      >
        <SvgIcon
          src="/assets/svgs/x-close.svg"
          ariaLabel="Close"
          width={14}
          height={14}
          className="text-[#A1744F]"
        />
      </button>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[70px] md:h-[70px] w-[46px] h-[46px] rounded-full" style={{
        boxShadow:
          "0px 4px 27px 5px #BA876BC2",
      }} />
      <img
        src="/assets/images/HomePage/gift-box.png"
        alt="Gift box"
        className="w-full h-full object-contain"
      />
    </button>
  );
};

export default GiftBoxButton;

