import React from "react";
import { Flex } from "antd";
import clsx from "clsx";
import SvgIcon from "@/based/SvgIcon";

interface NavigationArrowsProps {
  onPrev?: () => void;
  onNext?: () => void;
  className?: string;
  buttonClassName?: string;
  prevButtonClassName?: string;
  nextButtonClassName?: string;
}

export const NavigationArrows: React.FC<NavigationArrowsProps> = ({
  onPrev,
  onNext,
  className,
  buttonClassName,
  prevButtonClassName,
  nextButtonClassName,
}) => {
  const baseButtonStyles =
    "w-12 h-12 lg:w-[60px] lg:h-[60px] rounded-full border border-[#B2866D] flex items-center justify-center text-[#B2866D] hover:bg-[#B2866D] hover:text-white transition-all duration-300 pointer-events-auto";

  return (
    <Flex gap={16} className={clsx("mb-2", className)}>
      <button
        onClick={onPrev}
        className={clsx(baseButtonStyles, buttonClassName, prevButtonClassName)}
      >
        <SvgIcon
          src="/assets/svgs/chevron-right.svg"
          ariaLabel="prev"
          width={12}
          height={22}
          viewBox="0 0 13 23"
          className="rotate-180 shrink-0"
        />
      </button>
      <button
        onClick={onNext}
        className={clsx(baseButtonStyles, buttonClassName, nextButtonClassName)}
      >
        <SvgIcon
          src="/assets/svgs/chevron-right.svg"
          ariaLabel="next"
          width={12}
          height={22}
          viewBox="0 0 13 23"
          className="shrink-0"
        />
      </button>
    </Flex>
  );
};
