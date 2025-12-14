import React from "react";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

const HeaderSection: React.FC = () => {
  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 lg:gap-16 w-full">
        <div className="relative flex-shrink-0">
          <p
            className={clsx(
              "font-prata font-semibold text-black 2xl:text-[130px]",
              responsiveFontSizeArray(54, 130)
            )}
          >
            10K
          </p>
          <p
            className={clsx(
              "text-sm md:text-base font-semibold uppercase tracking-wider text-[#494747]",
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
      </div>
    </div>
  );
};

export default HeaderSection;
