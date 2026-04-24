import { Flex } from "antd";
import { useHomeTitleBlock } from "../../useHomeTitleBlock";
import { useAboutUsItems } from "./useAboutUsItems";
import { Background } from "./Background";
import { Wrapper } from "@/based/components/Wrapper";
import Header from "./components/Header";
import ImageCard from "./components/ImageCard";
import MiddleImage from "./components/MiddleImage";
import MobileSlide from "./components/MobileSlide";

const AboutUs: React.FC = () => {
  const { getBlockBySection } = useHomeTitleBlock();
  const block = getBlockBySection("about-us");
  const { items, loading: isLoadingItems } = useAboutUsItems();

  const leftItem = items[0];
  const middleItem = items[1];
  const rightItem = items[2];

  return (
    <Wrapper className="py-8 md:py-16 bg-white relative overflow-hidden">
      <Background />
      <div className="max-w-[1600px] mx-auto px-4 relative z-[1]">
        <Header title={block?.title} subTitle={block?.sub_title} />

        {/* Mobile Slide */}
        <div className="lg:hidden">
          <MobileSlide items={items} isLoading={isLoadingItems} />
        </div>

        {/* Desktop Layout */}
        <Flex className="hidden lg:flex relative flex-col lg:flex-row items-stretch gap-6 md:gap-10">
          {/* Left Side: Image + Caption */}
          <ImageCard
            imageUrl={leftItem?.imageUrl}
            note={leftItem?.note}
            isLoading={isLoadingItems}
            notePosition="bottom"
            align="start"
          />

          {/* Middle Side: Arched Image */}
          <MiddleImage imageUrl={middleItem?.imageUrl} isLoading={isLoadingItems} />

          {/* Right Side: Description + Image */}
          <ImageCard
            imageUrl={rightItem?.imageUrl}
            note={rightItem?.note}
            isLoading={isLoadingItems}
            notePosition="top"
            align="end"
          />
        </Flex>
      </div>
    </Wrapper>
  );
};

export default AboutUs;
