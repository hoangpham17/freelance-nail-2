import React from "react";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import hostAPartyContent from "@/content/hostAParty.json";

const OccasionsSection: React.FC = () => {
  const occasions = (
    hostAPartyContent as {
      occasions: {
        heading: string;
        subtext: string;
        items: Array<{ label: string; color: string; colorDark: string }>;
      };
    }
  ).occasions;
  return (
    <section className="relative py-8 lg:py-14 overflow-hidden bg-white">
      <Wrapper>
        <div className="max-w-2xl mx-auto text-center mb-6 lg:mb-10">
          <h2
            className={clsx(
              "font-playfairDisplay font-bold text-[#6B4A2F] tracking-tight",
              responsiveFontSizeArray(26, 36),
            )}
          >
            {occasions.heading}
          </h2>
          {/* <p
            className={clsx(
              "text-[#6B5B52] font-light mt-3 text-base md:text-lg max-w-lg mx-auto leading-relaxed",
            )}
          >
            {occasions.subtext}
          </p> */}
        </div>

        {/* Horizontal row: accent + label, separated by dots */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-4 sm:gap-x-6 sm:gap-y-6 lg:gap-x-8">
          {occasions.items.map((occasion, index) => (
            <React.Fragment key={occasion.label}>
              {index > 0 && (
                <span
                  className="w-2 h-2 rounded-full bg-[#A1744F]"
                  aria-hidden
                ></span>
              )}
              <div className="flex items-center gap-2 sm:gap-3 group">
                <span
                  className="flex-shrink-0 w-1.5 h-6 sm:h-7 rounded-full transition-all duration-300 group-hover:w-2"
                  style={{
                    backgroundColor: occasion.colorDark,
                  }}
                  aria-hidden
                />
                <span
                  className={clsx(
                    "font-playfairDisplay font-semibold text-[#3D352F] tracking-tight whitespace-nowrap",
                    "text-lg sm:text-xl md:text-2xl",
                  )}
                >
                  {occasion.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};

export default OccasionsSection;
