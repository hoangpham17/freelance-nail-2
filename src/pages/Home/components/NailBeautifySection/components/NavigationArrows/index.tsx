import SvgIcon from "@/based/SvgIcon";
import { useScreen } from "@/hooks/useScreen";
import React, { useMemo } from "react";
import Slider from "react-slick";

interface NavigationArrowsProps {
  sliderRef: React.RefObject<Slider>;
}

const NavigationArrows: React.FC<NavigationArrowsProps> = ({ sliderRef }) => {
  const { isMobile, isDesktop } = useScreen();

  const iconSize = useMemo(() => (isMobile ? 16 : 20), [isMobile]);

  return (
    <div className="flex justify-center md:justify-end order-2 md:order-1">
      <div className="flex gap-2 md:h-0 md:translate-y-[-80px] md:pr-4">
        <button
          className="w-8 h-8 md:w-[50px] md:h-[50px] rounded-full bg-white/60 md:border border-[rgba(139,111,71,0.2)] text-[#D1A054] flex items-center justify-center cursor-pointer transition-all duration-300 text-xl font-bold leading-none hover:bg-white"
          onClick={() => sliderRef.current?.slickPrev()}
          style={
            isDesktop ? { boxShadow: "0px 4px 12px 0px #E24C881F" } : undefined
          }
          aria-label="Previous"
        >
          <SvgIcon
            src={"assets/svgs/chevron-right.svg"}
            ariaLabel="text"
            width={iconSize}
            height={iconSize}
            className="shrink-0 rotate-180"
          />
        </button>
        <button
          className="w-8 h-8 md:w-[50px] md:h-[50px] rounded-full bg-white/60 md:border border-[rgba(139,111,71,0.2)] text-[#D1A054] flex items-center justify-center cursor-pointer transition-all duration-300 text-xl font-bold leading-none hover:bg-white"
          onClick={() => sliderRef.current?.slickNext()}
          style={
            isDesktop ? { boxShadow: "0px 4px 12px 0px #E24C881F" } : undefined
          }
          aria-label="Next"
        >
          <SvgIcon
            src={"assets/svgs/chevron-right.svg"}
            ariaLabel="text"
            width={iconSize}
            height={iconSize}
            className="shrink-0"
          />
        </button>
      </div>
    </div>
  );
};

export default NavigationArrows;
