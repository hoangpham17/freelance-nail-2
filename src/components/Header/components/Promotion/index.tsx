import React, { useEffect, useRef, useState } from "react";
import { PromotionData, AirtableAttachment } from "../../types";
import clsx from "clsx";
import SvgIcon from "@/based/SvgIcon";
import { Wrapper } from "@/based/components/Wrapper";
import { useCampaignStore } from "@/shared/store/campaignStore";

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

const getPromotionText = (promotion?: PromotionData): string => {
  if (!promotion) return "";
  return promotion.Content?.trim() || promotion.title?.trim() || "";
};

interface PromotionProps {
  textPromotions: PromotionData[];
  imagePromotions: PromotionData[];
  showCampaignBar: boolean;
  isCampaignDismissed: boolean;
  isPopupOpen: boolean;
  onCloseCampaign: () => void;
  onClosePopup: () => void;
}

const Promotion: React.FC<PromotionProps> = ({
  textPromotions,
  imagePromotions,
  showCampaignBar,
  isCampaignDismissed,
  isPopupOpen,
  onCloseCampaign,
  onClosePopup,
}) => {
  const campaignBarRef = useRef<HTMLDivElement>(null);
  const setCampaignBarHeight = useCampaignStore(
    (state) => state.setCampaignBarHeight
  );

  // State for text promotion rotation
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const element = campaignBarRef.current;

    // Nếu không có element thì không làm gì
    if (!element) return;

    // Khi bar ẩn thì height = 0
    if (!showCampaignBar) {
      setCampaignBarHeight(0);
      return;
    }

    // Đo ban đầu sau khi element đã render
    setCampaignBarHeight(element.offsetHeight);

    // Quan sát mọi thay đổi kích thước (text/content thay đổi, responsive, v.v.)
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const nextHeight = entry.contentRect.height;
      setCampaignBarHeight(nextHeight);
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [setCampaignBarHeight, showCampaignBar]);

  // Reset index when promotions change
  useEffect(() => {
    setCurrentTextIndex(0);
  }, [textPromotions]);

  // Handle text promotion rotation with fade in/out (3s each)
  useEffect(() => {
    if (textPromotions.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % textPromotions.length);
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, [textPromotions.length]);

  return (
    <>
      {/* Campaign Block */}
      <div
        ref={campaignBarRef}
        className={clsx(
          "block transition-all duration-300 ease-linear overflow-hidden bg-[#D5B994]",
          showCampaignBar && !isCampaignDismissed
            ? "opacity-100 max-h-[4.4375rem] translate-y-0"
            : "opacity-0 max-h-0 -translate-y-[71px]"
        )}
        data-campaign
      >
        <Wrapper className="px-4 md:px-4 lg:px-8">
          <div className="relative py-1 md:py-2.5 pr-4" id="campaign">
            <button
              className="absolute top-1/2 -right-4 -translate-y-1/2 p-2.5 md:p-1.5 cursor-pointer bg-transparent border-0"
              data-close-campaign
              onClick={onCloseCampaign}
              aria-label="Close campaign"
            >
              <SvgIcon
                src={"/assets/svgs/x-close.svg"}
                ariaLabel="text"
                width={20}
                height={20}
                className="size-[20px] shrink-0 text-white"
              />
            </button>
            <div
              className={clsx(
                "text-white text-sm xl:text-lg md:text-base text-center",
                textPromotions.length > 1 && "relative min-h-[1.5em]"
              )}
              data-campaign-text
            >
              {textPromotions.length === 1 ? (
                <div>{getPromotionText(textPromotions[0])}</div>
              ) : (
                textPromotions.map((promotion, index) => {
                  const text = getPromotionText(promotion);
                  const isActive = index === currentTextIndex;
                  return (
                    <div
                      key={promotion.id || index}
                      className={clsx(
                        "transition-opacity duration-500 ease-in-out",
                        !isActive && "opacity-0 absolute inset-0",
                        isActive && "opacity-100"
                      )}
                    >
                      {text}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </Wrapper>
      </div>

      {/* Popup Campaign */}
      {isPopupOpen && imagePromotions.length > 0 && (
        <>
          <div
            className="fixed inset-0 z-[110] bg-black/80 cursor-pointer"
            data-popup-close
            onClick={onClosePopup}
          ></div>
          <div
            className="fixed inset-0 z-[111] flex items-start justify-center px-4 overflow-y-auto pointer-events-none"
            data-popup
            data-campaign-popup
          >
            <div className="relative max-w-[90%] md:max-w-[75%] lg:max-w-[30%] w-full pt-[30vh] pb-8 pointer-events-auto">
              <button
                className="sticky top-4 ml-auto w-10 h-10 bg-white border border-white rounded-full cursor-pointer transition-all duration-300 z-[2] md:w-8 md:h-8 hover:scale-110 active:scale-95 flex items-center justify-center mb-4"
                data-popup-close
                onClick={onClosePopup}
                aria-label="Close popup"
              >
                <SvgIcon
                  src={"assets/svgs/x-close.svg"}
                  ariaLabel="text"
                  width={24}
                  height={24}
                  className="size-[24px] shrink-0"
                />
              </button>
              <div className="flex flex-col gap-6">
                {imagePromotions.map((promotion, index) => {
                  const imageSrc =
                    resolveImageUrl(promotion.image) ||
                    "/assets/images/Background/home-1.jpg";
                  return (
                    <div
                      key={promotion.id || index}
                      className="relative w-full"
                    >
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
      )}
    </>
  );
};

export default Promotion;
