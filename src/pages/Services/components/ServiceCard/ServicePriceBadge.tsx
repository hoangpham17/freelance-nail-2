import React from "react";
import clsx from "clsx";
import SvgIcon from "@/based/SvgIcon";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import {
  SERVICE_PRICE_BADGE_CASH,
  SERVICE_PRICE_BADGE_VISA,
} from "./servicePriceLayout";

export type ServicePriceBadgeType = "cash" | "card";

type ServicePriceBadgeProps = {
  type: ServicePriceBadgeType;
  children: React.ReactNode;
  showIcon?: boolean;
  variant?: "price" | "label";
};

const BADGE_CONFIG = {
  cash: {
    badgeClass: SERVICE_PRICE_BADGE_CASH,
    iconSrc: "/assets/svgs/cash.svg",
    iconLabel: "Cash",
    textClass: "service-price-badge__text",
    iconClass: "text-madison-muted",
  },
  card: {
    badgeClass: SERVICE_PRICE_BADGE_VISA,
    iconSrc: "/assets/svgs/credit-card.svg",
    iconLabel: "Card",
    textClass: "service-price-badge__text service-price-badge__text--card",
    iconClass: "text-madison-gold",
  },
} as const;

const ServicePriceBadge: React.FC<ServicePriceBadgeProps> = ({
  type,
  children,
  showIcon = false,
  variant = "price",
}) => {
  const { badgeClass, iconSrc, iconLabel, textClass, iconClass } =
    BADGE_CONFIG[type];

  if (variant === "label") {
    return (
      <div className={badgeClass}>
        <span
          className={clsx(
            "service-price-label",
            textClass,
            responsiveFontSizeArray(11, 13),
          )}
        >
          {children}
        </span>
      </div>
    );
  }

  return (
    <div className={badgeClass}>
      {showIcon && (
        <span className="inline-flex size-4 shrink-0 items-center justify-center">
          <SvgIcon
            src={iconSrc}
            ariaLabel={iconLabel}
            width={18}
            height={18}
            viewBox="0 0 18 18"
            className={iconClass}
          />
        </span>
      )}
      <span className={clsx(textClass, responsiveFontSizeArray(16, 18))}>
        {children}
      </span>
    </div>
  );
};

export default ServicePriceBadge;
