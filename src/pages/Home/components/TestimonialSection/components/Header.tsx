import React from "react";
import { Flex } from "antd";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { useHomeTitleBlock } from "../../../useHomeTitleBlock";
import { parseAirtableRichtext } from "@/shared/utils/richtext";
import SvgIcon from "@/based/SvgIcon";
import { Link } from "react-router-dom";
import { PATHS } from "@/routes/Routes";
import { useScreen } from "@/hooks/useScreen";
import { SectionTitle } from "@/components/SectionTitle";
import homepageContent from "@/content/homepage.json";

const Header: React.FC = () => {
  const { getBlockBySection } = useHomeTitleBlock();
  const block = getBlockBySection("testimonial");
  const { isMobile } = useScreen();

  return (
    <div className="relative">
      <Flex
        justify="end"
        align="start"
        className="relative z-10 w-full lg:pr-4 gap-2 md:gap-8"
      >
        <div className="md:text-right">
          <SectionTitle html={block?.title} fontSize={[40, 72]} leading="90%" />
          {block?.sub_title && (
            <div
              className={clsx(
                "text-[#8A6A4F] font-extralight mt-2",
                responsiveFontSizeArray(16, 32),
              )}
              dangerouslySetInnerHTML={{
                __html: parseAirtableRichtext(block?.sub_title),
              }}
            />
          )}
        </div>

        {/* Circular Gallery Button */}
        <Link to={PATHS.gallery} className="shrink-0">
          <Flex
            vertical
            align="center"
            justify="center"
            className="w-[45px] h-[45px] md:w-[120px] md:h-[120px] lg:w-[150px] lg:h-[150px] hover:scale-105 transition bg-[#B2866D] rounded-full text-white cursor-pointer hover:bg-[#9E7B6A] relative group"
          >
            <SvgIcon
              src="/assets/svgs/arrow-detail.svg"
              ariaLabel="arrow"
              width={isMobile ? 14 : 28}
              height={isMobile ? 14 : 27}
              className="text-white md:mb-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
            <span className="hidden md:inline text-[12px] lg:text-[14px] font-medium tracking-wider text-center px-4 uppercase leading-tight font-inter">
              {(homepageContent as { testimonialSection: { galleryButtonLabel: string } }).testimonialSection.galleryButtonLabel}
            </span>
          </Flex>
        </Link>
      </Flex>
    </div>
  );
};

export default Header;
