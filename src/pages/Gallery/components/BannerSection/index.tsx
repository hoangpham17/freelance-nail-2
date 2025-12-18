import React from "react";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { useScreen } from "@/hooks/useScreen";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

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

      {/* Info Card Overlay */}
      <Wrapper className="relative pt-[200px] lg:pt-[250px] pb-8">
        <div className="w-full lg:w-auto lg:max-w-[600px]">
          {/* Main Heading - Above Card */}
          <h1
            className={clsx(
              "font-prata font-bold text-[#F5F0E8] mb-6 leading-tight",
              isDesktop ? "text-6xl lg:text-7xl" : "text-4xl"
            )}
            style={{
              textShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div>BEAUTY</div>
            <div>ENHANCEMENT</div>
          </h1>

          {/* Info Card */}
          <div
            className={clsx(
              "bg-white/50 backdrop-blur-md rounded-3xl lg:rounded-4xl p-6 lg:p-8",
              "border border-white/60 shadow-lg relative -mt-4"
            )}
            style={{
              boxShadow: "0px 5px 16px 0px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Description Text */}
            <p
              className={clsx(
                "text-[#494747] font-medium mb-6 uppercase leading-relaxed",
                isDesktop ? "text-base lg:text-lg" : "text-sm"
              )}
            >
              IF YOU'VE ALWAYS HAD GENERAL OUR, SUCH AS HOW TO VIEW OR LIGHT
              NAIL TONE, TRY CONNECT TO OUR TO SEE RESULTS.
            </p>

            {/* CTA Button - Centered */}
            <div className="flex justify-center">
              <button
                className={clsx(
                  "bg-[#F5F0E8] text-[#494747] font-medium uppercase rounded-3xl",
                  "px-6 py-3 lg:px-8 lg:py-4",
                  "hover:bg-[#E8E0D5] transition-colors",
                  "border border-white/40",
                  responsiveFontSizeArray(14, 16)
                )}
                style={{
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                EXPLORE GODDESS TICKETS &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default BannerSection;
