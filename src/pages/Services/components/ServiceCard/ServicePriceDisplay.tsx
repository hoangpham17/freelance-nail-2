import React from "react";
import clsx from "clsx";
import { Flex } from "antd";
import SvgIcon from "@/based/SvgIcon";
import { useScreen } from "@/hooks/useScreen";
import ServicePriceBadge from "./ServicePriceBadge";
import { formatServicePrice } from "./servicePriceUtils";
import {
  SERVICE_PRICE_CHEVRON_SLOT,
  SERVICE_PRICE_COLUMN,
  SERVICE_PRICE_GAP,
} from "./servicePriceLayout";

type ServicePriceDisplayProps = {
  showCashColumn: boolean;
  showVisaColumn: boolean;
  cashPrice: string;
  cardPrice: string;
  hasContent: boolean;
  isExpanded: boolean;
  isToggleDisabled: boolean;
};

const ServicePriceDisplay: React.FC<ServicePriceDisplayProps> = ({
  showCashColumn,
  showVisaColumn,
  cashPrice,
  cardPrice,
  hasContent,
  isExpanded,
  isToggleDisabled,
}) => {
  const { isDesktop } = useScreen();

  return (
    <Flex align="center" className={clsx("flex-shrink-0", SERVICE_PRICE_GAP)}>
      {/* Mobile: stacked badges with icons */}
      <div className="flex flex-col items-end gap-2 lg:hidden">
        {showCashColumn && cashPrice && (
          <ServicePriceBadge type="cash" showIcon>
            {formatServicePrice(cashPrice)}
          </ServicePriceBadge>
        )}
        {showVisaColumn && cardPrice && (
          <ServicePriceBadge type="card" showIcon>
            {formatServicePrice(cardPrice)}
          </ServicePriceBadge>
        )}
      </div>

      {/* Desktop: column layout */}
      <div className={clsx("hidden lg:flex items-center", SERVICE_PRICE_GAP)}>
        {showCashColumn && (
          <div className={SERVICE_PRICE_COLUMN}>
            {cashPrice && (
              <ServicePriceBadge type="cash">
                {formatServicePrice(cashPrice)}
              </ServicePriceBadge>
            )}
          </div>
        )}
        {showVisaColumn && (
          <div className={SERVICE_PRICE_COLUMN}>
            {cardPrice && (
              <ServicePriceBadge type="card">
                {formatServicePrice(cardPrice)}
              </ServicePriceBadge>
            )}
          </div>
        )}
      </div>

      {hasContent && (
        <div
          className={clsx(
            SERVICE_PRICE_CHEVRON_SLOT,
            "flex items-center justify-center transition-transform duration-300",
            isToggleDisabled && "invisible",
          )}
          style={{
            transform: isExpanded ? "rotate(0deg)" : "rotate(180deg)",
          }}
        >
          <SvgIcon
            src="/assets/svgs/chevron-right.svg"
            ariaLabel={isExpanded ? "Collapse" : "Expand"}
            width={isDesktop ? 14 : 10}
            height={isDesktop ? 14 : 10}
            className="text-madison-gold rotate-[-90deg]"
          />
        </div>
      )}
      {!hasContent && (
        <div className={SERVICE_PRICE_CHEVRON_SLOT} aria-hidden />
      )}
    </Flex>
  );
};

export default ServicePriceDisplay;
