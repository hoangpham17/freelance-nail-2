import React from "react";
import { ServiceItem, AirtableAttachment } from "../../types";
import "./style.css";

const resolveIcon = (icon?: string | AirtableAttachment[]) => {
  if (typeof icon === "string") return icon;
  if (Array.isArray(icon) && icon.length > 0) return icon[0]?.url;
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
  addons,
}) => {
  const iconUrl = resolveIcon(icon);

  return (
    <div className="services-menu__item" id={id}>
      <div className="services-menu__item-wrapper">
        {iconUrl && (
          <div className="services-menu__item-img">
            <img
              src={iconUrl}
              alt={title || name}
              className="img"
              onError={(e) => {
                e.currentTarget.src =
                  "/assets/images/Services/thumbnail-service-item.png";
              }}
            />
          </div>
        )}
        <div className="services-menu__item-content">
          <div className="services-menu__item-title-block">
            <h3 className="services-menu__item-title gold">{title || name}</h3>
            <div className="services-menu__item-divider"></div>
          </div>
          <span className="services-menu__item-cost gold">
            {price || cost || "N/A"}
          </span>
          {subtitle && (
            <p className="services-menu__item-subtitle gray-2">{subtitle}</p>
          )}
          {description && (
            <p className="services-menu__item-subtitle gray-2">
              {description}
            </p>
          )}
          {addons && (
            <div className="services-menu__add-on">
              <div className="services-menu__add-on-title gold">Add-ons:</div>
              <div className="services-menu__add-on-desc gray-2">{addons}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
