import React from "react";
import { ServiceCategory } from "../../types";
import ServiceCard from "../ServiceCard";
import { Wrapper } from "@/based/components/Wrapper";
import { Flex } from "antd";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { useScreen } from "@/hooks/useScreen";

interface ServiceCategorySectionProps {
  category: ServiceCategory;
  index: number;
}

const ServiceCategorySection: React.FC<ServiceCategorySectionProps> = ({
  category,
  index,
}) => {
  const { isDesktop } = useScreen();
  const formattedIndex = String(index).padStart(2, "0");

  return (
    <div
      id={category.slug}
      className={clsx(
        "relative w-full overflow-hidden pb-[16px] lg:pb-[38px]",
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
      <Wrapper className="relative z-10">
        <div>
          <Flex
            align="center"
            className={clsx(
              "lg:min-h-[236px] mb-4 md:mb-8 w-[calc(100%_+_32px)] -translate-x-[16px] lg:translate-x-0 lg:w-full",
              category.titleBackgroundImage
                ? "bg-center bg-no-repeat bg-cover"
                : "bg-white",
              index === 1 ? "mt-0" : "mt-[30px] lg:mt-[50px]"
            )}
            style={
              category.titleBackgroundImage
                ? {
                    backgroundImage: `url(${category.titleBackgroundImage})`,
                  }
                : undefined
            }
          >
            <Flex className="h-full py-3 px-4 lg:py-4 w-full lg:items-center bg-white/40 lg:bg-transparent gap-4 lg:gap-16">
              <p
                className={clsx(
                  "font-prata text-[#9E7B6A] underline text-left",
                  responsiveFontSizeArray(40, 57)
                )}
              >
                {formattedIndex}
              </p>
              <Flex
                align="center"
                className={clsx(
                  "w-full gap-4 h-full",
                  isDesktop ? "justify-between" : "items-start flex-col"
                )}
              >
                <h2
                  className={clsx(
                    "font-prata text-[#9E7B6A] m-0",
                    responsiveFontSizeArray(40, 80)
                  )}
                >
                  {category.title}
                </h2>
                {category.description && (
                  <Flex
                    align="center"
                    className={clsx(
                      "lg:max-w-[50%] w-full",
                      !isDesktop &&
                        "bg-white/30 border border-white rounded-2xl py-1 px-3"
                    )}
                  >
                    <p
                      className={clsx(
                        "font-light",
                        responsiveFontSizeArray(16, 20)
                      )}
                    >
                      {category.description}
                    </p>
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Flex>

          <div className="columns-1 lg:columns-2 gap-4 lg:gap-6">
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
