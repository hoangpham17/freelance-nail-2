import React from "react";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { useScreen } from "@/hooks/useScreen";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { Flex } from "antd";
import SvgIcon from "@/based/SvgIcon";

const BannerSection: React.FC = () => {
  const { isDesktop, isTablet } = useScreen();

  return (
    <Wrapper className="relative pt-[70px] lg:pt-[105px] !pb-4 md:!px-6 lg:!px-8 !px-0">
      <div
        className={clsx(
          "w-full p-6 lg:p-12 relative min-h-[350px] md:min-h-[450px] md:border-4 border-white md:rounded-[32px]"
        )}
        style={{
          backgroundImage:
            isTablet || isDesktop
              ? `url(/assets/images/Gallery/bg-info-card-desktop.png)`
              : `url(/assets/images/Gallery/bg-info-card-mobile.png)`,
          backgroundSize: "cover",
          backgroundPosition:
            isTablet || isDesktop ? "right center" : "70% center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Flex vertical className="max-w-[600px]">
          <h1
            className={clsx(
              "font-prata text-[#F2F2F7] mb-2 md:mb-6 leading-[32px] md:leading-[64px] mt-[130px] lg:mt-0",
              responsiveFontSizeArray(32, 57)
            )}
            style={{
              textShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div>BEAUTY</div>
            <div>ENHANCEMENT</div>
          </h1>
          <Flex
            className="px-3 py-3 md:px-[38px] md:py-4 gap-2 border border-white rounded-2xl"
            vertical
          >
            <p
              className={clsx(
                "text-white uppercase text-center font-light",
                responsiveFontSizeArray(16, 21)
              )}
            >
              IF YOU'VE ALWAYS HAD GENERAL OUR, SUCH AS HOW TO VIEW OR LIGHT
              NAIL TONE, TRY CONNECT TO OUR TO SEE RESULTS.
            </p>

            <button
              className={clsx(
                "bg-white/80 text-[#494747] uppercase rounded-full min-h-[34px] lg:min-h-[48px] font-light",
                "p2 w-full",
                "hover:bg-white transition-colors",
                "border border-white",
                responsiveFontSizeArray(16, 20)
              )}
              style={{
                boxShadow: "0px 4px 4px 0px #FFFFFF40",
              }}
            >
              <Flex className="gap-2 px-2" align="center" justify="center">
                <span>EXPLORE GODDESS TICKETS</span>
                <SvgIcon
                  src="/assets/svgs/foward.svg"
                  ariaLabel="text"
                  width={16}
                  height={16}
                  className="text-black"
                />
              </Flex>
            </button>
          </Flex>
        </Flex>
      </div>
    </Wrapper>
  );
};

export default BannerSection;
