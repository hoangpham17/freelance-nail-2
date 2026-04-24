import { Flex } from "antd";
import clsx from "clsx";
import { parseAirtableRichtext } from "@/shared/utils/richtext";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { SectionTitle } from "@/components/SectionTitle";
import SvgIcon from "@/based/SvgIcon";
import { Link } from "react-router-dom";
import { PATHS } from "@/routes/Routes";
import { useScreen } from "@/hooks/useScreen";

interface HeaderProps {
  title?: string;
  subTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subTitle }) => {
  const { isMobile } = useScreen();

  return (
    <Flex
      justify="space-between"
      align="start"
      className="md:mb-12 mb-6 gap-2 md:gap-8"
    >
      <Flex vertical>
        <SectionTitle html={title} />
        {subTitle && (
          <div
            dangerouslySetInnerHTML={{
              __html: parseAirtableRichtext(subTitle),
            }}
            className={clsx(
              "text-[#8A6A4F] font-extralight mt-2",
              responsiveFontSizeArray(16, 32),
            )}
          />
        )}
      </Flex>

      {/* Circular About Us Button */}
      <Link to={PATHS.aboutUs}>
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
            ABOUT US
          </span>
        </Flex>
      </Link>
    </Flex>
  );
};

export default Header;

