import React, { useState } from "react";
import { ServiceItem } from "../../types";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import clsx from "clsx";
import { Flex } from "antd";
import { parseAirtableRichtext } from "@/shared/utils/richtext";
import ServicePriceDisplay from "./ServicePriceDisplay";
import {
  normalizeServicePrice,
  parseServiceTiers,
} from "./servicePriceUtils";

export type ServiceCardProps = ServiceItem & {
  showCashColumn?: boolean;
  showVisaColumn?: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
  disableToggle?: boolean;
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  name,
  description,
  price,
  visa_surcharge,
  add_on_services,
  isExpanded: isExpandedProp,
  onToggle,
  disableToggle,
  showCashColumn = false,
  showVisaColumn = false,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isControlled = onToggle !== undefined;
  const isExpanded = isControlled
    ? (isExpandedProp ?? false)
    : internalExpanded;
  const handleToggle = () => {
    if (isControlled) {
      onToggle?.();
    } else {
      setInternalExpanded((prev) => !prev);
    }
  };

  const displayName = name || "";
  const displayPrice = normalizeServicePrice(price);
  const displayVisaPrice = normalizeServicePrice(visa_surcharge);
  const tiers = parseServiceTiers(displayName, displayPrice, displayVisaPrice);
  const hasContent = description || add_on_services;
  const isToggleDisabled = disableToggle || !hasContent;

  const titleClassName = clsx(
    "font-tangerine text-gold-gradient m-0 flex-1 pr-4",
    responsiveFontSizeArray(18, 24),
  );

  const renderExpandableContent = () =>
    hasContent ? (
      <div
        className={clsx(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <Flex
            vertical
            gap={12}
            className={clsx(
              "services-richtext px-4 lg:px-6 pb-4 lg:pb-6 pt-2 text-madison-muted font-light",
              responsiveFontSizeArray(14, 16),
            )}
          >
            {description && (
              <div
                dangerouslySetInnerHTML={{
                  __html: parseAirtableRichtext(description),
                }}
              />
            )}

            {add_on_services && (
              <div
                dangerouslySetInnerHTML={{
                  __html: parseAirtableRichtext(add_on_services),
                }}
              />
            )}
          </Flex>
        </div>
      </div>
    ) : null;

  return (
    <div
      id={id}
      className={clsx(
        "w-full transition-all duration-300 rounded-lg overflow-hidden my-1.5 lg:my-2",
        isExpanded && !isToggleDisabled && "bg-madison-surface/40",
      )}
    >
      {tiers ? (
        <>
          <div
            className={clsx(
              "px-4 lg:px-6 py-3 lg:py-4",
              hasContent &&
                !isToggleDisabled &&
                "cursor-pointer hover:opacity-90 transition-opacity",
            )}
            onClick={() => hasContent && !isToggleDisabled && handleToggle()}
          >
            {tiers.map((tier, index) => (
              <div
                key={`${tier.label}-${index}`}
                className={clsx(
                  "flex items-center justify-between",
                  index > 0 && "mt-2 lg:mt-3",
                )}
              >
                <h3 className={titleClassName}>{tier.label}</h3>

                <ServicePriceDisplay
                  showCashColumn={showCashColumn}
                  showVisaColumn={showVisaColumn}
                  cashPrice={tier.cashPrice}
                  cardPrice={tier.cardPrice}
                  hasContent={index === tiers.length - 1 && !!hasContent}
                  isExpanded={isExpanded}
                  isToggleDisabled={isToggleDisabled}
                />
              </div>
            ))}
          </div>
          {renderExpandableContent()}
        </>
      ) : (
        <>
          <div
            className={clsx(
              "flex items-center justify-between py-3 lg:py-4 px-4 lg:px-6 relative",
              hasContent &&
                !isToggleDisabled &&
                "cursor-pointer hover:opacity-90 transition-opacity",
            )}
            onClick={() => hasContent && !isToggleDisabled && handleToggle()}
          >
            <h3 className={titleClassName}>{displayName}</h3>

            <ServicePriceDisplay
              showCashColumn={showCashColumn}
              showVisaColumn={showVisaColumn}
              cashPrice={displayPrice}
              cardPrice={displayVisaPrice}
              hasContent={!!hasContent}
              isExpanded={isExpanded}
              isToggleDisabled={isToggleDisabled}
            />
          </div>
          {renderExpandableContent()}
        </>
      )}
    </div>
  );
};

export default ServiceCard;
