import React from "react";
import { Flex } from "antd";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { useHomeTitleBlock } from "../../../useHomeTitleBlock";
import { parseAirtableRichtext } from "@/shared/utils/richtext";
import { SectionTitle } from "@/components/SectionTitle";
import { NavigationArrows } from "@/components/NavigationArrows";

interface HeaderProps {
  onPrev?: () => void;
  onNext?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onPrev, onNext }) => {
  const { getBlockBySection } = useHomeTitleBlock();
  const block = getBlockBySection("gallery");

  return (
    <Flex
      justify="space-between"
      align="end"
      className="mb-6 lg:mb-14 px-4 lg:px-0"
    >
      <Flex vertical className="max-w-[800px]">
        <SectionTitle html={block?.title} fontSize={[40, 72]} leading="1.1" />
        {block?.sub_title && (
          <div
            dangerouslySetInnerHTML={{
              __html: parseAirtableRichtext(block?.sub_title),
            }}
            className={clsx(
              "text-[#8A6A4F] font-light mt-2 opacity-80",
              responsiveFontSizeArray(16, 24),
            )}
          />
        )}
      </Flex>

      <NavigationArrows
        onPrev={onPrev}
        onNext={onNext}
        className="hidden md:flex"
      />
    </Flex>
  );
};

export default Header;
