import React from "react";
import { Flex } from "antd";
import clsx from "clsx";
import { useHomeTitleBlock } from "../../useHomeTitleBlock";
import { parseAirtableRichtext } from "@/shared/utils/richtext";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { SectionTitle } from "@/components/SectionTitle";
import { Background } from "./Background";
import { ServiceList } from "./ServiceList";
import { Wrapper } from "@/based/components/Wrapper";

const ServiceSection: React.FC = () => {
  const { getBlockBySection } = useHomeTitleBlock();

  const block = getBlockBySection("services");

  return (
    <section>
      <Flex
        vertical
        justify="space-around"
        className="relative text-center z-[1] overflow-hidden"
      >
        <Background />

        <Wrapper className="relative z-[2]">
          <Flex
            vertical
            className="max-w-[895px] mx-auto z-[1] text-black py-8 md:py-16"
          >
            <SectionTitle html={block?.title} />
            {block?.sub_title ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: parseAirtableRichtext(block?.sub_title),
                }}
                className={clsx(
                  "text-[#8A6A4F] font-extralight",
                  responsiveFontSizeArray(16, 32),
                )}
              />
            ) : null}
            {block?.description ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: parseAirtableRichtext(block?.description),
                }}
                className={clsx(
                  "text-[#4A3A2F] mt-4 md:mt-8 font-light",
                  responsiveFontSizeArray(14, 18),
                )}
              />
            ) : null}
          </Flex>
        </Wrapper>
        <ServiceList />
      </Flex>
    </section>
  );
};

export default ServiceSection;
