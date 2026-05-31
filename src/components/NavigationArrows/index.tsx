import React from "react";
import clsx from "clsx";
import { SlideNavButton } from "@/components/SlideNavButton";

export interface NavigationArrowsProps
  extends React.ComponentPropsWithoutRef<"div"> {
  onPrev?: () => void;
  onNext?: () => void;
  disabledPrev?: boolean;
  disabledNext?: boolean;
  /** @deprecated Styles are unified via SlideNavButton; kept for backward compatibility */
  buttonClassName?: string;
  prevButtonClassName?: string;
  nextButtonClassName?: string;
  prevAriaLabel?: string;
  nextAriaLabel?: string;
}

export const NavigationArrows: React.FC<NavigationArrowsProps> = ({
  onPrev,
  onNext,
  disabledPrev,
  disabledNext,
  className,
  buttonClassName,
  prevButtonClassName,
  nextButtonClassName,
  prevAriaLabel,
  nextAriaLabel,
  ...rest
}) => (
  <div
    {...rest}
    className={clsx(
      "flex items-center justify-between pointer-events-none",
      className,
    )}
  >
    <SlideNavButton
      direction="prev"
      onClick={onPrev}
      disabled={disabledPrev}
      ariaLabel={prevAriaLabel}
      className={clsx(
        "pointer-events-auto",
        buttonClassName,
        prevButtonClassName,
      )}
    />
    <SlideNavButton
      direction="next"
      onClick={onNext}
      disabled={disabledNext}
      ariaLabel={nextAriaLabel}
      className={clsx(
        "pointer-events-auto",
        buttonClassName,
        nextButtonClassName,
      )}
    />
  </div>
);

export default NavigationArrows;
