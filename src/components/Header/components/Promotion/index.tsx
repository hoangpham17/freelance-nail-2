import React from "react";
import { PromotionData } from "../../types";
import clsx from "clsx";
import SvgIcon from "@/based/SvgIcon";
import { Wrapper } from "@/based/components/Wrapper";
import { Flex } from "antd";

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
  const imageSrc =
    promotion?.icon ||
    promotion?.image ||
    "/assets/images/Background/home-1.jpg";

  return (
    <>
      {/* Campaign Block */}
      <div
        className={clsx(
          "block transition-all duration-300 ease-linear overflow-hidden bg-[#D5B994]",
          showCampaignBar && !isCampaignDismissed
            ? "opacity-100 max-h-[4.4375rem] translate-y-0"
            : "opacity-0 max-h-0 -translate-y-[71px]"
        )}
        data-campaign
      >
        <Wrapper className="px-4 md:px-4 lg:px-8">
          <div className="relative py-5 xl:py-2.5" id="campaign">
            <button
              className="absolute top-1/2 right-0 -translate-y-1/2 p-2.5 md:p-1.5 cursor-pointer bg-transparent border-0"
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
              className="text-white text-3xl xl:text-lg xl:leading-5 md:text-base md:leading-[1.125rem] leading-8 text-center font-serif"
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
          className="fixed inset-0 z-[101] flex items-center justify-center"
          data-popup
          data-campaign-popup
        >
          <div
            className="absolute inset-0 bg-black/80 cursor-pointer"
            data-popup-close
            onClick={onClosePopup}
          ></div>
          <div className="relative max-w-[30%] md:max-w-[75%] z-10">
            <button
              className="absolute -top-2.5 -right-2.5 w-10 h-10 bg-white border border-white rounded-full cursor-pointer transition-all duration-300 z-[2] md:w-8 md:h-8"
              data-popup-close
              onClick={onClosePopup}
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
              <div className="absolute left-6 right-6 bottom-6 text-white text-center text-xl uppercase tracking-[0.08em]">
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
