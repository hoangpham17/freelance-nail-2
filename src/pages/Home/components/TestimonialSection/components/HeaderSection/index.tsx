import React from "react";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { Flex } from "antd";

const HeaderSection: React.FC = () => {
  return (
    <div className="relative">
      <Flex className="items-start justify-center lg:justify-start gap-4 md:gap-8 lg:gap-10 w-full">
        <div className="relative flex-shrink-0">
          <p
            className={clsx(
              "font-prata leading-none lg:leading-[80px] mt-2 lg:mt-12",
              responsiveFontSizeArray(54, 130)
            )}
          >
            10K
          </p>
          <p
            className={clsx(
              "font-light text-[#10182A] text-center",
              responsiveFontSizeArray(20, 40)
            )}
          >
            COMMENT
          </p>
          <img
            src="/assets/images/HomePage/image-comment.png"
            alt="comment"
            className="w-full lg:w-[120%] lg:max-w-[120%] absolute top-0 lg:top-20 left-0 lg:-left-4 -z-[1]"
          />
        </div>
        <div className="flex-1">
          <p
            className={clsx(
              "font-prata leading-[28px] lg:leading-[75px]",
              responsiveFontSizeArray(24, 75)
            )}
          >
            Your nail has never felt better
            <span className="text-[#9E7B6A]"> Brighter</span> and
            <span className="text-[#9E7B6A]"> Healthier</span> with Veira
          </p>
        </div>
      </Flex>
    </div>
  );
};

export default HeaderSection;
