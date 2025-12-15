import React from "react";
import { ServiceCategory } from "../../types";
import ServiceCard from "../ServiceCard";
import { Wrapper } from "@/based/components/Wrapper";

interface ServiceCategorySectionProps {
  category: ServiceCategory;
  index: number;
}

const ServiceCategorySection: React.FC<ServiceCategorySectionProps> = ({
  category,
  index,
}) => {
  const formattedIndex = String(index).padStart(2, "0");

  return (
    <div
      id={category.id}
      className="relative w-full py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={category.sectionBackgroundImage}
          alt={category.title}
          className="w-full h-full object-cover"
        />
      </div>

      <Wrapper className="relative z-10 px-4 md:px-6 lg:px-8">
        <div>
          <div className="flex-shrink-0 mb-6 lg:mb-0 lg:w-1/3">
            <div className="flex items-center gap-4 md:gap-6">
              <span className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-light text-[#d4a574] leading-none">
                {formattedIndex}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-[#3a3a3a]">
                {category.title}
              </h2>
            </div>
          </div>

          <div className="flex-1 lg:w-2/3">
            {category.description && (
              <p className="text-base md:text-lg text-[#666] mb-8 lg:mb-12 max-w-2xl">
                {category.description}
              </p>
            )}

            {/* Services Grid - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {category.services.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default ServiceCategorySection;
