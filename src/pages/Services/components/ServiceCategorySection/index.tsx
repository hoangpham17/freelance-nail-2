import React from "react";
import { ServiceCategory } from "../../types";
import ServiceCard from "../ServiceCard";
import { Wrapper } from "@/based/components/Wrapper";
import { Flex } from "antd";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

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
      className={clsx(
        "relative w-full min-h-screen overflow-hidden pb-[30px] lg:pb-[50px]",
        category.sectionBackgroundImage
          ? "bg-center bg-no-repeat bg-cover"
          : "bg-white"
      )}
      style={
        category.sectionBackgroundImage
          ? {
              backgroundImage: `url(${category.sectionBackgroundImage})`,
              backgroundAttachment: "fixed",
            }
          : undefined
      }
    >
      <Wrapper className="relative z-10 px-4 md:px-6 lg:px-8">
        <div>
          <div
            className={clsx(
              "min-h-[236px] mb-4 md:mb-8",
              category.titleBackgroundImage
                ? "bg-center bg-no-repeat bg-cover"
                : "bg-white"
            )}
            style={
              category.titleBackgroundImage
                ? {
                    backgroundImage: `url(${category.titleBackgroundImage})`,
                  }
                : undefined
            }
          >
            <div>
              <Flex align="center" gap={16} className="h-full p-4 w-full">
                <p
                  className={clsx(
                    "font-prata text-[#9E7B6A] underline mt-2",
                    responsiveFontSizeArray(45, 57)
                  )}
                >
                  {formattedIndex}
                </p>
                <Flex
                  align="center"
                  className="flex-col lg:flex-row justify-between w-full"
                >
                  <h2
                    className={clsx(
                      "font-prata text-[#9E7B6A] m-0",
                      responsiveFontSizeArray(48, 80)
                    )}
                  >
                    {category.title}
                  </h2>
                  <Flex align="center">
                    <p>{category.description}</p>
                  </Flex>
                </Flex>
              </Flex>
            </div>
          </div>

          <div className="columns-1 md:columns-2 gap-4 md:gap-6">
            {category.services.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default ServiceCategorySection;
