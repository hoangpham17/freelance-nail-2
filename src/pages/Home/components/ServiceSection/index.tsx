import React from "react";
import { useHomeTitleBlock } from "../../useHomeTitleBlock";
import { HomeSectionHeading } from "../HomeSectionHeading";
import { ServiceList } from "./ServiceList";
import { Wrapper } from "@/based/components/Wrapper";

const ServiceSection: React.FC = () => {
  const { getBlockBySection } = useHomeTitleBlock();
  const block = getBlockBySection("services");

  const descriptionHtml = [block?.sub_title, block?.description]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className="home-section-gradient relative overflow-hidden"
      data-home-grad="service"
    >
      <Wrapper className="relative z-[1] pt-16 md:pt-20 lg:pt-24 pb-10 md:pb-14 max-w-[1440px] 2xl:max-w-[1680px]">
        <HomeSectionHeading
          variant="service"
          titleHtml={block?.title}
          descriptionHtml={descriptionHtml || undefined}
        />
      </Wrapper>
      <ServiceList />
    </section>
  );
};

export default ServiceSection;
