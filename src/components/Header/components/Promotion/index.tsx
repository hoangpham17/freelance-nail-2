import React, { useEffect, useRef, useState } from "react";
import { PromotionData } from "../../types";
import clsx from "clsx";
import SvgIcon from "@/based/SvgIcon";
import { Wrapper } from "@/based/components/Wrapper";
import { useCampaignStore } from "@/shared/store/campaignStore";
import { Flex } from "antd";
import { NoiseBackground } from "@/components/NoiseBackground";
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
      const nextHeight = entry.contentRect.height;
      setCampaignBarHeight(nextHeight);
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
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
    <NoiseBackground
      ref={campaignBarRef}
      className={clsx(
        "block transition-all duration-300 ease-linear overflow-hidden bg-[#E8D6C9] w-full",
        showCampaignBar && !isCampaignDismissed
          ? "opacity-100 max-h-[4.4375rem] translate-y-0"
          : "opacity-0 max-h-0 -translate-y-[71px]",
      )}
      data-campaign
    >
      <Wrapper className="!px-0 md:px-4 lg:px-8 w-full max-w-full overflow-hidden">
        <div
          className="relative py-1 md:py-2 px-8 md:px-4 w-full overflow-hidden"
          id="campaign"
        >
          <button
            className="absolute top-1/2 right-0 -translate-y-1/2 p-2 md:p-1.5 cursor-pointer bg-transparent border-0 group z-10 flex items-center justify-center"
            data-close-campaign
            onClick={onCloseCampaign}
            aria-label="Close campaign"
          >
            <SvgIcon
              src={"/assets/svgs/x-close.svg"}
              ariaLabel="text"
              width={20}
              height={20}
              className="size-[20px] shrink-0 text-[#4A3A2F] group-hover:text-[#A1744F]"
            />
          </button>
          <div
            className={clsx(
              "text-[#4A3A2F] text-center font-light w-full max-w-full overflow-hidden pr-2",
              textPromotions.length > 1 && "relative min-h-[1.5em]",
              responsiveFontSizeArray(12, 18),
            )}
            data-campaign-text
          >
            {textPromotions.length === 1 ? (
              <Flex
                align="center"
                justify="center"
                gap={2}
                wrap="wrap"
                className="px-1"
              >
                <SvgIcon
                  src={"/assets/svgs/promotion.svg"}
                  ariaLabel="text"
                  width={20}
                  height={20}
                  className="size-[20px] md:size-[24px] hidden md:block"
                />
                <span className="break-words min-w-0 text-center">
                  {getPromotionText(textPromotions[0])}
                </span>
                <SvgIcon
                  src={"/assets/svgs/promotion.svg"}
                  ariaLabel="text"
                  width={20}
                  height={20}
                  className="size-[20px] md:size-[24px] hidden md:block"
                />
              </Flex>
            ) : (
              textPromotions.map((promotion, index) => {
                const text = getPromotionText(promotion);
                const isActive = index === currentTextIndex;
                return (
                  <div
                    key={promotion.id || index}
                    className={clsx(
                      "transition-opacity duration-500 ease-in-out w-full max-w-full overflow-hidden",
                      !isActive && "opacity-0 absolute inset-0",
                      isActive && "opacity-100",
                    )}
                  >
                    <Flex
                      align="center"
                      justify="center"
                      gap={4}
                      wrap="wrap"
                      className="px-1"
                    >
                      <SvgIcon
                        src={"/assets/svgs/promotion.svg"}
                        ariaLabel="text"
                        width={20}
                        height={20}
                        className="size-[20px] md:size-[24px] hidden md:block"
                      />
                      <span className="break-words min-w-0 text-center">
                        {text}
                      </span>
                      <SvgIcon
                        src={"/assets/svgs/promotion.svg"}
                        ariaLabel="text"
                        width={20}
                        height={20}
                        className="size-[20px] md:size-[24px] hidden md:block"
                      />
                    </Flex>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </Wrapper>
    </NoiseBackground>
  );
};

export default Promotion;
