import React from "react";
import { useAirtable } from "@/hooks/useAirtable";
import { AIRTABLE_ENDPOINTS } from "@/services/airtable.service";
import { PromotionData, AirtableAttachment } from "@/components/Header/types";
import { useCampaignStore } from "@/shared/store/campaignStore";
import { PopupCloseButton } from "@/components/PopupCloseButton";

const resolveImageUrl = (image?: AirtableAttachment[]): string => {
  if (!image || !Array.isArray(image) || image.length === 0) {
    return "";
  }
  // Use full thumbnail if available, otherwise use url
  const firstImage = image[0];
  if (firstImage?.thumbnails?.full?.url) {
    return firstImage.thumbnails.full.url;
  }
  return firstImage?.url || "";
};

const CampaignPopup: React.FC = () => {
  const { data: promotionData } = useAirtable<PromotionData>(
    AIRTABLE_ENDPOINTS.promotion,
  );

  const isShowPopupCampaign = useCampaignStore(
    (state) => state.isShowPopupCampaign,
  );
  const setIsShowPopupCampaign = useCampaignStore(
    (state) => state.setIsShowPopupCampaign,
  );

  // Filter image promotions
  const imagePromotions = React.useMemo(() => {
    if (!promotionData || promotionData.length === 0) {
      return [];
    }

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const imagePromos: PromotionData[] = [];

    promotionData.forEach((promotion) => {
      let startDate: Date | null = null;
      let endDate: Date | null = null;

      if (promotion.start_date) {
        startDate = new Date(promotion.start_date);
        startDate.setHours(0, 0, 0, 0);
      }

      if (promotion.end_date) {
        endDate = new Date(promotion.end_date);
        endDate.setHours(23, 59, 59, 999);
      }

      const isEnabled = Boolean(promotion.enabled);
      const isAfterStart = !startDate || now >= startDate;
      const isBeforeEnd = !endDate || now <= endDate;
      const isActive = isEnabled && isAfterStart && isBeforeEnd;

      if (!isActive) return;

      if (
        promotion.type === "Image" &&
        promotion.image &&
        Array.isArray(promotion.image) &&
        promotion.image.length > 0
      ) {
        imagePromos.push(promotion);
      }
    });

    imagePromos.sort(
      (a, b) => (a.order ?? a.index ?? 0) - (b.order ?? b.index ?? 0),
    );

    return imagePromos;
  }, [promotionData]);

  const handleClosePopup = () => {
    setIsShowPopupCampaign(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("has-show-campaign-popup", "true");
    }
  };

  if (!isShowPopupCampaign || imagePromotions.length === 0) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[110] bg-black/80 cursor-pointer"
        data-popup-close
        onClick={handleClosePopup}
      ></div>
      <div
        className="fixed inset-0 z-[111] flex items-center justify-center px-4 overflow-y-auto pointer-events-none"
        data-popup
        data-campaign-popup
      >
        <div className="relative max-w-[90%] md:max-w-[75%] lg:max-w-[30%] w-full my-auto py-8 pointer-events-auto">
          <PopupCloseButton
            data-popup-close
            onClick={handleClosePopup}
            className="sticky top-4 z-[2] mb-4 ml-auto"
          />
          <div className="flex flex-col gap-6">
            {imagePromotions.map((promotion, index) => {
              const imageSrc =
                resolveImageUrl(promotion.image) ||
                "/assets/images/Background/home-1.jpg";
              return (
                <div key={promotion.id || index} className="relative w-full">
                  <img
                    src={imageSrc}
                    alt="Promotion"
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignPopup;
