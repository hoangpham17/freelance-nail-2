import React, { useEffect, useRef } from "react";
import { PromotionData } from "../../types";
import clsx from "clsx";
import SvgIcon from "@/based/SvgIcon";
import { Wrapper } from "@/based/components/Wrapper";
import { Flex } from "antd";
import { useCampaignStore } from "@/shared/store/campaignStore";

interface PromotionProps {
  promotion?: PromotionData;
  promotionText: string;
  showCampaignBar: boolean;
  isCampaignDismissed: boolean;
  isPopupOpen: boolean;
  onCloseCampaign: () => void;
  onClosePopup: () => void;
}

const Promotion: React.FC<PromotionProps> = ({
  promotion,
  showCampaignBar,
  promotionText,
  isCampaignDismissed,
  isPopupOpen,
  onCloseCampaign,
  onClosePopup,
}) => {
  const campaignBarRef = useRef<HTMLDivElement>(null);
  const setCampaignBarHeight = useCampaignStore(
    (state) => state.setCampaignBarHeight
  );

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

  const imageSrc =
    promotion?.icon ||
    promotion?.image ||
    "/assets/images/Background/home-1.jpg";

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
              className="text-white text-sm xl:text-lg md:text-base text-center"
              data-campaign-text
            >
              {promotionText}
            </div>
          </div>
        </Wrapper>
      </div>

      {/* Popup Campaign */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center px-4"
          data-popup
          data-campaign-popup
        >
          <div
            className="absolute inset-0 bg-black/80 cursor-pointer"
            data-popup-close
            onClick={onClosePopup}
          ></div>
          <div className="relative max-w-[90%] md:max-w-[75%] lg:max-w-[30%] z-10 w-full">
            <button
              className="absolute -top-2.5 -right-2.5 w-10 h-10 bg-white border border-white rounded-full cursor-pointer transition-all duration-300 z-[2] md:w-8 md:h-8 hover:scale-110 active:scale-95"
              data-popup-close
              onClick={onClosePopup}
              aria-label="Close popup"
            >
              <Flex justify="center" align="center">
                <SvgIcon
                  src={"assets/svgs/x-close.svg"}
                  ariaLabel="text"
                  width={24}
                  height={24}
                  className="size-[24px] shrink-0"
                />
              </Flex>
            </button>
            <div className="max-h-[80vh] min-h-[250px] relative">
              <img
                src={imageSrc}
                alt="Promotion"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute left-4 right-4 bottom-2 md:left-6 md:right-6 md:bottom-6 text-white text-center text-xs md:text-base uppercase">
                {promotionText}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Promotion;
