import { Flex } from "antd";
import { Link } from "react-router-dom";
import { useHomeTitleBlock } from "../../useHomeTitleBlock";
import { useAboutUsItems } from "./useAboutUsItems";
import { Wrapper } from "@/based/components/Wrapper";
import { HomeSectionHeading } from "../HomeSectionHeading";
import MobileSlide from "./components/MobileSlide";
import AboutUsImageCollage from "./components/AboutUsImageCollage";
import { PATHS } from "@/routes/Routes";
import { parseAirtableRichtext } from "@/shared/utils/richtext";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import SvgIcon from "@/based/SvgIcon";
import { Skeleton } from "antd";

const AboutUs: React.FC = () => {
  const { getBlockBySection } = useHomeTitleBlock();
  const block = getBlockBySection("about-us");
  const { items, loading: isLoadingItems } = useAboutUsItems();

  const primaryImage = items[0];
  const secondaryImage = items[1];
  const descriptionHtml =
    block?.description ?? block?.sub_title ?? items[2]?.note;

  return (
    <section
      className="home-section-gradient relative overflow-hidden py-16 md:py-20 lg:py-24"
      data-home-grad="about"
    >
      <Wrapper className="home-about-wrap">
        <div className="md:hidden">
          <HomeSectionHeading
            variant="about"
            titleHtml={block?.title}
            subtitleHtml={block?.sub_title}
            align="center"
            showUnderline={false}
            className="mb-8"
          />
          <MobileSlide items={items} isLoading={isLoadingItems} />
          <div className="mt-8 flex justify-center">
            <Link to={PATHS.aboutUs} className="home-btn-outline">
              More Detail
              <SvgIcon
                src="/assets/svgs/arrow-right-circle.svg"
                ariaLabel="arrow"
                width={16}
                height={16}
                className="text-[#f9be5c]"
              />
            </Link>
          </div>
        </div>

        <div className="home-about-desktop hidden md:grid md:grid-cols-[1fr_1fr] w-full max-w-[1320px] mx-auto items-center gap-10 lg:gap-16 xl:gap-24">
          <div className="min-w-0 flex items-center justify-center">
            <AboutUsImageCollage
              primaryImageUrl={primaryImage?.imageUrl}
              secondaryImageUrl={secondaryImage?.imageUrl}
              isLoading={isLoadingItems}
              className="w-full"
            />
          </div>

          <Flex vertical className="min-w-0 gap-6 lg:gap-8">
            <HomeSectionHeading
              variant="about"
              titleHtml={block?.title}
              subtitleHtml={block?.sub_title}
              align="start"
              showUnderline={false}
            />
            {descriptionHtml ? (
              <div
                className={clsx(
                  "font-light text-[#d1d5db] leading-relaxed [&_p]:m-0",
                  responsiveFontSizeArray(16, 18),
                )}
                dangerouslySetInnerHTML={{
                  __html: parseAirtableRichtext(descriptionHtml),
                }}
              />
            ) : isLoadingItems ? (
              <Skeleton active paragraph={{ rows: 4 }} title={false} />
            ) : null}
            <Link to={PATHS.aboutUs} className="home-btn-outline w-fit">
              More Detail
              <SvgIcon
                src="/assets/svgs/arrow-right-circle.svg"
                ariaLabel="arrow"
                width={16}
                height={16}
                className="text-[#f9be5c]"
              />
            </Link>
          </Flex>
        </div>
      </Wrapper>
    </section>
  );
};

export default AboutUs;
