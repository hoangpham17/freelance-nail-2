import React from "react";
import { useHomeTitleBlock } from "../../useHomeTitleBlock";
import { HomeSectionHeading } from "../HomeSectionHeading";
import { ServiceList } from "./ServiceList";
import { Wrapper } from "@/based/components/Wrapper";

const ServiceSection: React.FC = () => {
  const { getBlockBySection } = useHomeTitleBlock();
  const block = getBlockBySection("services");

  return (
    <section
      className="home-section-gradient relative overflow-hidden"
      data-home-grad="service"
    >
      <Wrapper className="relative z-[1] py-10 md:py-16">
        <HomeSectionHeading
          variant="service"
          titleHtml={block?.title}
          descriptionHtml={block?.description ?? block?.sub_title}
        />
      </Wrapper>
      <ServiceList />
    </section>
  );
};

export default ServiceSection;
