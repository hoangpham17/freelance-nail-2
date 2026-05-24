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
    items[2]?.note ?? block?.description ?? block?.sub_title;

  return (
    <section className="bg-black py-10 md:py-16">
      <Wrapper>
        <div className="lg:hidden">
          <HomeSectionHeading
            variant="about"
            titleHtml={block?.title}
            subtitleHtml={block?.sub_title}
            align="start"
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

        <Flex
          className="hidden lg:flex items-center gap-10 xl:gap-[60px]"
          align="center"
        >
          <AboutUsImageCollage
            primaryImageUrl={primaryImage?.imageUrl}
            secondaryImageUrl={secondaryImage?.imageUrl}
            isLoading={isLoadingItems}
          />

          <Flex vertical className="flex-1 gap-8">
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
        </Flex>
      </Wrapper>
    </section>
  );
};

export default AboutUs;
