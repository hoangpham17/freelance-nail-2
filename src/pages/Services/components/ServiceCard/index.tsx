import React from "react";
import { ServiceItem, AirtableAttachment } from "../../types";
import {
  responsiveFontSizeArray,
} from "@/shared/utils/helper";
import clsx from "clsx";
import { Flex } from "antd";
import { parseAirtableRichtext } from "@/shared/utils/richtext";

const resolveImage = (value?: string | AirtableAttachment[]) => {
  if (typeof value === "string") return value;
  if (Array.isArray(value) && value.length > 0) return value[0]?.url;
  return null;
};

const ServiceCard: React.FC<ServiceItem> = ({
  id,
  name,
  description,
  price,
  image,
  add_on_services,
}) => {
  const imageSource = image;
  const imageUrl = resolveImage(imageSource);
  const displayPrice = price || "";
  const displayName = name || "";

  return (
    <div
      id={id}
      className="py-2 lg:py-3 px-3 lg:px-4 mb-2 lg:mb-3 rounded-2xl bg-[#F7F7F7CC] break-inside-avoid"
    >
      <Flex className="flex-col md:flex-row justify-between gap-2 md:gap-3">
        <Flex gap={12} className="w-full">
          {imageUrl && (
            <div className="flex-shrink-0 w-16 h-16 lg:w-[100px] lg:h-[100px] rounded-md overflow-hidden shadow-sm">
              <img
                src={imageUrl}
                alt={displayName}
                className="w-full h-full object-cover border-2 border-white rounded-2xl"
                onError={(e) => {
                  e.currentTarget.src =
                    "/assets/images/Services/thumbnail-service-item.png";
                }}
              />
            </div>
          )}
          <Flex vertical className="gap-1 md:gap-2">
            <h3
              className={clsx(
                "font-prata text-[#10182A] flex-1",
                responsiveFontSizeArray(18, 24)
              )}
            >
              {displayName}
            </h3>

            {description && (
              <div
                className={clsx(
                  "text-[#10182A] font-light mb-1 md:mb-2 whitespace-pre-wrap",
                  responsiveFontSizeArray(16, 20)
                )}
                dangerouslySetInnerHTML={{
                  __html: parseAirtableRichtext(description),
                }}
              />
            )}

            {add_on_services && (
              <Flex vertical className="text-[#9E7B6A] font-light mt-3 md:mt-4">
                <span
                  className={clsx(
                    "font-prata font-normal",
                    responsiveFontSizeArray(24, 32)
                  )}
                >
                  *Additional charge:
                </span>
                <div
                  className={clsx(
                    "whitespace-pre-wrap",
                    responsiveFontSizeArray(14, 16)
                  )}
                  dangerouslySetInnerHTML={{
                    __html: parseAirtableRichtext(add_on_services),
                  }}
                />
              </Flex>
            )}
          </Flex>
        </Flex>

        <span
          className={clsx(
            "text-[#D1A054] whitespace-nowrap font-prata text-right lg:text-left",
            responsiveFontSizeArray(24, 40)
          )}
        >
          ${displayPrice}
        </span>
      </Flex>
    </div>
  );
};

export default ServiceCard;
