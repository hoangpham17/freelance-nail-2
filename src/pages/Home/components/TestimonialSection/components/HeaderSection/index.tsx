import React from "react";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

const HeaderSection: React.FC = () => {
  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 lg:gap-16 w-full">
        <div className="relative flex-shrink-0">
          <div className="absolute -right-8 -top-4 w-32 h-20 bg-[#FFE5E5] rounded-full blur-2xl opacity-60 -z-10" />
          <div className="space-y-1">
            <p
              className={clsx(
                "font-prata font-semibold text-black",
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
        </div>
        <div className="flex-1">
          <h2
            className={clsx(
              "font-prata font-bold leading-tight text-black",
              responsiveFontSizeArray(28, 48)
            )}
          >
            Your nail has never felt better{" "}
            <span className="text-[#D1A054]">Brighter</span> and{" "}
            <span className="text-[#D1A054]">Healthier</span> with Veira
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
