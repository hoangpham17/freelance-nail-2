import React, { useEffect, useRef, useState } from "react";
import { PromotionData } from "../../types";
import clsx from "clsx";
import SvgIcon from "@/based/SvgIcon";
import { Wrapper } from "@/based/components/Wrapper";
import { useCampaignStore } from "@/shared/store/campaignStore";
import { Flex } from "antd";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

const getPromotionText = (promotion?: PromotionData): string => {
  if (!promotion) return "";
  return promotion.Content?.trim() || promotion.title?.trim() || "";
};

interface PromotionProps {
  textPromotions: PromotionData[];
  showCampaignBar: boolean;
  isCampaignDismissed: boolean;
  onCloseCampaign: () => void;
}

const Promotion: React.FC<PromotionProps> = ({
  textPromotions,
  showCampaignBar,
  isCampaignDismissed,
  onCloseCampaign,
}) => {
  const campaignBarRef = useRef<HTMLDivElement>(null);
  const setCampaignBarHeight = useCampaignStore(
    (state) => state.setCampaignBarHeight,
  );
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const element = campaignBarRef.current;
    if (!element) return;

    if (!showCampaignBar) {
      setCampaignBarHeight(0);
      return;
    }

    setCampaignBarHeight(element.offsetHeight);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setCampaignBarHeight(entry.contentRect.height);
    });

    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [setCampaignBarHeight, showCampaignBar]);

  useEffect(() => {
    setCurrentTextIndex(0);
  }, [textPromotions]);

  useEffect(() => {
    if (textPromotions.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % textPromotions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [textPromotions.length]);

  return (
    <div
      ref={campaignBarRef}
      className={clsx(
        "madison-campaign-bar block w-full transition-all duration-300 ease-linear overflow-hidden",
        showCampaignBar && !isCampaignDismissed
          ? "opacity-100 max-h-24 translate-y-0"
          : "opacity-0 max-h-0 -translate-y-full pointer-events-none",
      )}
      data-campaign
    >
      <Wrapper className="relative w-full max-w-full !px-4 md:!px-8 lg:!px-[120px]">
        <div className="relative py-3 md:py-4 px-8" id="campaign">
          <button
            className="absolute top-1/2 right-2 -translate-y-1/2 p-2 cursor-pointer bg-transparent border-0 z-10 flex items-center justify-center text-madison-muted hover:text-madison-gold"
            data-close-campaign
            onClick={onCloseCampaign}
            aria-label="Close campaign"
          >
            <SvgIcon
              src="/assets/svgs/x-close.svg"
              ariaLabel="Close"
              width={20}
              height={20}
              className="size-5"
            />
          </button>
          <div
            className={clsx(
              "text-madison-gold-dark text-center font-semibold font-montserrat w-full",
              textPromotions.length > 1 && "relative min-h-[1.5em]",
              responsiveFontSizeArray(14, 20),
            )}
            data-campaign-text
          >
            {textPromotions.length === 1 ? (
              <span className="break-words">{getPromotionText(textPromotions[0])}</span>
            ) : (
              textPromotions.map((promotion, index) => {
                const text = getPromotionText(promotion);
                const isActive = index === currentTextIndex;
                return (
                  <div
                    key={promotion.id || index}
                    className={clsx(
                      "transition-opacity duration-500 w-full",
                      !isActive && "opacity-0 absolute inset-0",
                      isActive && "opacity-100",
                    )}
                  >
                    <Flex align="center" justify="center" className="px-1">
                      <span className="break-words">{text}</span>
                    </Flex>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Promotion;
