import React from "react";
import clsx from "clsx";
import SvgIcon from "@/based/SvgIcon";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import {
  SERVICE_PRICE_BADGE_CASH,
  SERVICE_PRICE_BADGE_VISA,
  SERVICE_PRICE_HEADER_LABEL,
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
  },
  card: {
    badgeClass: SERVICE_PRICE_BADGE_VISA,
    iconSrc: "/assets/svgs/credit-card.svg",
    iconLabel: "Card",
  },
} as const;

const ServicePriceBadge: React.FC<ServicePriceBadgeProps> = ({
  type,
  children,
  showIcon = false,
  variant = "price",
}) => {
  const { badgeClass, iconSrc, iconLabel } = BADGE_CONFIG[type];

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
            className="text-madison-gold"
          />
        </span>
      )}
      <span
        className={clsx(
          variant === "label"
            ? clsx(SERVICE_PRICE_HEADER_LABEL, responsiveFontSizeArray(11, 13))
            : clsx(
                "text-madison-gold font-medium",
                responsiveFontSizeArray(16, 18),
              ),
        )}
      >
        {children}
      </span>
    </div>
  );
};

export default ServicePriceBadge;
