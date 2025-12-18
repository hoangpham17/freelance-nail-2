import React from "react";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { useScreen } from "@/hooks/useScreen";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { Flex } from "antd";
import SvgIcon from "@/based/SvgIcon";

const BannerSection: React.FC = () => {
  const { isDesktop } = useScreen();

  return (
    <>
      <Wrapper
        className={clsx(
          "absolute left-1/2 -translate-x-1/2 w-full h-[328px]",
          isDesktop ? "-top-[100px]" : "-top-[64px]"
        )}
      >
        <div
          className="bg-center w-full h-full"
          style={{
            backgroundImage: `url(/assets/images/Gallery/banner.png)`,
            backgroundSize: "auto 100%",
            backgroundRepeat: "no-repeat",
          }}
        />
      </Wrapper>

      <Wrapper className="relative pt-[200px] lg:pt-[105px] pb-8">
        <div
          className={clsx("w-full p-6 lg:p-8 relative min-h-[450px]")}
          style={{
            backgroundImage: `url(/assets/images/Gallery/bg-info-card.png)`,
            backgroundSize: "cover",
            backgroundPosition: isDesktop ? "center" : "right center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Flex vertical className="max-w-[600px]">
            <h1
              className={clsx(
                "font-prata font-bold text-[#F5F0E8] mb-6 leading-tight",
                responsiveFontSizeArray(36, 90)
              )}
              style={{
                textShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div>BEAUTY</div>
              <div>ENHANCEMENT</div>
            </h1>
            <Flex
              className="px-3 py-4 gap-2 border border-white rounded-2xl"
              vertical
            >
              <p
                className={clsx(
                  "text-white uppercase text-center",
                  responsiveFontSizeArray(14, 24)
                )}
              >
                IF YOU'VE ALWAYS HAD GENERAL OUR, SUCH AS HOW TO VIEW OR LIGHT
                NAIL TONE, TRY CONNECT TO OUR TO SEE RESULTS.
              </p>

              <button
                className={clsx(
                  "bg-white/80 text-black uppercase rounded-full h-[34px] lg:h-[48px]",
                  "p2 w-full",
                  "hover:bg-white transition-colors",
                  "border border-white",
                  responsiveFontSizeArray(16, 21)
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
    </>
  );
};

export default BannerSection;
