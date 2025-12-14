import React from "react";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { Flex } from "antd";

const HeaderSection: React.FC = () => {
  return (
    <div className="relative">
      <Flex className="items-start lg:items-center justify-center lg:justify-start gap-6 md:gap-12 lg:gap-16 w-full">
        <div className="relative flex-shrink-0">
          <p
            className={clsx(
              "font-prata font-semibold text-black text-[54px] sm:text-[67px] md:text-[73px] lg:text-[86px] xl:text-[99px] 2xl:text-[130px]"
            )}
          >
            10K
          </p>
          <p
            className={clsx(
              "text-sm lg:text-base font-semibold uppercase tracking-wider text-[#494747]",
              responsiveFontSizeArray(16, 36)
            )}
          >
            COMMENT
          </p>
        </div>
        <div className="flex-1">
          <p
            className={clsx(
              "font-prata font-bold text-black",
              responsiveFontSizeArray(24, 75)
            )}
          >
            Your nail has never felt <br /> better
            <span className="text-[#D1A054]"> Brighter</span> and
            <span className="text-[#D1A054]"> Healthier</span>
            <br />
            with Veira
          </p>
        </div>
      </Flex>
    </div>
  );
};

export default HeaderSection;
