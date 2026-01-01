import React, { useMemo, useRef, useEffect } from "react";
import Slider from "react-slick";
import HeaderSection from "./components/HeaderSection";
import NavigationArrows from "./components/NavigationArrows";
import GallerySlider from "./components/GallerySlider";
import { GalleryItem } from "./types";
import { Wrapper } from "@/based/components/Wrapper";
import { Flex } from "antd";
import { useGalleryItems } from "./useGalleryItems";

interface NailBeautifySectionProps {
  onItemClick?: (index: number) => void;
  onGalleryItemsChange?: (items: GalleryItem[]) => void;
}

const NailBeautifySection: React.FC<NailBeautifySectionProps> = ({
  onItemClick,
  onGalleryItemsChange,
}) => {
  const sliderRef = useRef<Slider | null>(null);

  const galleryItems = useGalleryItems();

  useEffect(() => {
    if (onGalleryItemsChange) {
      onGalleryItemsChange(galleryItems);
    }
  }, [galleryItems, onGalleryItemsChange]);

  const slides = useMemo(() => {
    const result: GalleryItem[][] = [];
    for (let i = 0; i < galleryItems.length; i += 5) {
      result.push(galleryItems.slice(i, i + 5));
    }
    return result;
  }, [galleryItems]);

  return (
    <section className="relative pt-8 md:pt-10 pb-2 lg:pb-4 md:py-[50px] bg-white">
      <Wrapper>
        <HeaderSection />
        {galleryItems.length > 0 && (
          <Flex vertical className="gap-2 md:gap-0">
            <NavigationArrows sliderRef={sliderRef} />
            <GallerySlider
              slides={slides}
              galleryItems={galleryItems}
              sliderRef={sliderRef}
              onItemClick={onItemClick}
            />
          </Flex>
        )}
      </Wrapper>
    </section>
  );
};

export default NailBeautifySection;
