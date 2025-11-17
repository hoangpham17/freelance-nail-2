import React from "react";
import { ServiceCategory } from "../../types";
import ServiceCard from "../ServiceCard";
import "./style.css";

const ServiceCategorySection: React.FC<{ category: ServiceCategory }> = ({
  category,
}) => {
  return (
    <div
      id={category.id}
      className="services-menu__background"
      style={{ backgroundImage: `url('${category.backgroundImage}')` }}
      data-service-block
    >
      <div className="services-menu__block">
        <div className="container">
          <div className="inner">
            <h2 className="services-menu__block-title blend-text">
              {category.title}
            </h2>
            {category.description && (
              <p className="services-menu__block-desc gray-2">
                {category.description}
              </p>
            )}
            <div className="services-menu__list-service">
              <div className="services-menu__list-item">
                {category.services.map((service) => (
                  <ServiceCard key={service.id} {...service} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCategorySection;
