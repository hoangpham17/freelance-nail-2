import React from "react";
import { NoiseBackground } from "@/components/NoiseBackground";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

const businessHours = [
  { label: "MON - FRI", value: "9AM – 7PM" },
  { label: "SATURDAY", value: "9AM – 4PM" },
  { label: "SUNDAY", value: "11AM – 4PM" },
];

const WelcomeSection: React.FC = () => {
  return (
    <div className="relative h-[180px] md:h-[220px] lg:h-[320px] flex justify-center items-end">
      <NoiseBackground className="w-[320px] h-[180px] md:w-[400px] md:h-[210px] lg:w-[573px] lg:h-[280px] max-w-[95%] rounded-t-full -bottom-px bg-[#805D3D] absolute z-[5] flex flex-col items-center justify-center pt-6 md:pt-8 lg:pt-10 text-white overflow-hidden">
        <h2
          className={clsx(
            "font-playfairDisplay font-medium tracking-[0.1em] mb-3 md:mb-4 lg:mb-5 uppercase text-white",
            responsiveFontSizeArray(16, 32),
          )}
        >
          BUSINESS HOURS
        </h2>
        <div className="w-[80%] max-w-[195px] xl:max-w-[282px] px-4 md:px-0">
          {businessHours.map((item) => (
            <div
              key={item.label}
              className={clsx(
                "flex justify-between mb-1 md:mb-1.5 tracking-[0.05em] text-white/95 gap-2",
                responsiveFontSizeArray(12, 20),
              )}
            >
              <span className="uppercase font-playfairDisplay text-center text-[#F6EFE9]">
                {item.label}
              </span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </NoiseBackground>
    </div>
  );
};

export default WelcomeSection;
