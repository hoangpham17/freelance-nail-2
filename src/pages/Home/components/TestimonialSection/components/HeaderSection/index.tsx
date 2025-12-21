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
              "font-prata font-semibold text-black leading-none",
              responsiveFontSizeArray(54, 130)
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
          <img
            src="/assets/images/HomePage/image-comment.png"
            alt="comment"
            className="w-full absolute top-0 lg:top-10 right-0 -z-[1]"
          />
        </div>
        <div className="flex-1">
          <p
            className={clsx(
              "font-prata font-bold text-black leading-[30px] lg:leading-[85px]",
              responsiveFontSizeArray(24, 75)
            )}
          >
            Your nail has never felt <br /> better
            <span className="text-[#9E7B6A]"> Brighter</span> and
            <span className="text-[#9E7B6A]"> Healthier</span>
            <br />
            with Veira
          </p>
        </div>
      </Flex>
    </div>
  );
};

export default HeaderSection;
