import React from "react";
import { ServiceItem, AirtableAttachment } from "../../types";

const resolveImage = (value?: string | AirtableAttachment[]) => {
  if (typeof value === "string") return value;
  if (Array.isArray(value) && value.length > 0) return value[0]?.url;
  return null;
};

const ServiceCard: React.FC<ServiceItem> = ({
  id,
  title,
  name,
  subtitle,
  description,
  price,
  cost,
  icon,
  image,
  addons,
}) => {
  const imageSource = icon ?? image;
  const iconUrl = resolveImage(imageSource);
  const displayPrice = price || cost || "N/A";
  const displayName = title || name || "";

  return (
    <div
      id={id}
      className="py-4 md:py-5 border-b border-white/40 last:border-b-0"
    >
      <div className="flex gap-3 md:gap-4">
        {/* Thumbnail Image */}
        {iconUrl && (
          <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden shadow-sm">
            <img
              src={iconUrl}
              alt={displayName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "/assets/images/Services/thumbnail-service-item.png";
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-base md:text-lg font-serif font-semibold text-[#3a3a3a] flex-1">
              {displayName}
            </h3>
            <span className="text-base md:text-lg font-semibold text-[#d4a574] whitespace-nowrap">
              {displayPrice}
            </span>
          </div>

          {(subtitle || description) && (
            <p className="text-xs md:text-sm text-[#666] mb-1 md:mb-2">
              {subtitle || description}
            </p>
          )}

          {addons && (
            <div className="mt-1 md:mt-2 text-[11px] md:text-xs text-[#666]">
              {addons}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
