import React, { useState } from "react";
import { ServiceItem } from "../../types";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import clsx from "clsx";
import { Flex } from "antd";
import { parseAirtableRichtext } from "@/shared/utils/richtext";
import SvgIcon from "@/based/SvgIcon";
import { useScreen } from "@/hooks/useScreen";

export type ServiceCardProps = ServiceItem & {
  isExpanded?: boolean;
  onToggle?: () => void;
  disableToggle?: boolean;
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  name,
  description,
  price,
  add_on_services,
  isExpanded: isExpandedProp,
  onToggle,
  disableToggle,
}) => {
  const { isDesktop } = useScreen();
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
  const displayPrice = price || "";
  const displayName = name || "";
  const hasContent = description || add_on_services;
  const isToggleDisabled = disableToggle || !hasContent;

  return (
    <div
      id={id}
      className={clsx(
        "w-full transition-all duration-300 rounded-lg overflow-hidden my-1.5 lg:my-2",
        isExpanded && !isToggleDisabled && "bg-madison-surface/40",
      )}
    >
      {/* Header - Always visible */}
      <div
        className={clsx(
          "flex items-center justify-between py-3 lg:py-4 px-4 lg:px-6 relative",
          hasContent &&
            !isToggleDisabled &&
            "cursor-pointer hover:opacity-90 transition-opacity",
        )}
        onClick={() => hasContent && !isToggleDisabled && handleToggle()}
      >
        <h3
          className={clsx(
            "font-tangerine text-gold-gradient m-0 flex-1 pr-4",
            responsiveFontSizeArray(18, 24),
          )}
        >
          {displayName}
        </h3>

        <Flex align="center" gap={8} className="flex-shrink-0 relative">
          {displayPrice && (
            <div className="px-3 py-1 lg:px-4 lg:py-1.5 rounded-lg bg-madison-surface/60 border border-madison-border/50">
              <span
                className={clsx(
                  "text-madison-gold font-medium whitespace-nowrap",
                  responsiveFontSizeArray(16, 18),
                )}
              >
                ${displayPrice}
              </span>
            </div>
          )}

          {hasContent && (
            <div
              className={clsx(
                "absolute left-full top-1/2 flex-shrink-0 w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center transition-transform duration-300",
                isToggleDisabled && "hidden",
              )}
              style={{
                transform: `translateY(-50%) ${isExpanded ? "rotate(0deg)" : "rotate(180deg)"}`,
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
        </Flex>
      </div>

      {/* Expandable Content - grid 0fr→1fr for smooth height animation */}
      {hasContent && (
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
      )}
    </div>
  );
};

export default ServiceCard;
