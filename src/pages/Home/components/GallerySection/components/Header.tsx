import React from "react";
import { useHomeTitleBlock } from "../../../useHomeTitleBlock";
import { HomeSectionHeading } from "../../HomeSectionHeading";

const Header: React.FC = () => {
  const { getBlockBySection } = useHomeTitleBlock();
  const block = getBlockBySection("gallery");

  return (
    <HomeSectionHeading
      variant="gallery"
      titleHtml={block?.title}
      subtitleHtml={block?.sub_title}
      align="center"
      className="mb-8 lg:mb-10"
      showUnderline={false}
    />
  );
};

export default Header;
