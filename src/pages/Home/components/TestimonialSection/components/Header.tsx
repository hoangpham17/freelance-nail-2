import React from "react";
import { useHomeTitleBlock } from "../../../useHomeTitleBlock";
import { HomeSectionHeading } from "../../HomeSectionHeading";

const Header: React.FC = () => {
  const { getBlockBySection } = useHomeTitleBlock();
  const block = getBlockBySection("testimonial");

  return (
    <HomeSectionHeading
      variant="testimonial"
      titleHtml={block?.title}
      className="mb-8 md:mb-12"
    />
  );
};

export default Header;
