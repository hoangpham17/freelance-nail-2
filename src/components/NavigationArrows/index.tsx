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
    "w-12 h-12 lg:w-[60px] lg:h-[60px] rounded-full border border-madison-gold flex items-center justify-center text-madison-gold bg-transparent hover:bg-madison-gold hover:text-madison-gold-text transition-all duration-300 pointer-events-auto";

  return (
    <Flex gap={16} className={clsx("mb-2", className)}>
      <button
        type="button"
        onClick={onPrev}
        className={clsx(baseButtonStyles, buttonClassName, prevButtonClassName)}
        aria-label="Previous"
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
        type="button"
        onClick={onNext}
        className={clsx(baseButtonStyles, buttonClassName, nextButtonClassName)}
        aria-label="Next"
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
