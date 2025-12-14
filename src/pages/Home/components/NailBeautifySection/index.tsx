import React, { useMemo, useRef, useEffect } from "react";
import Slider from "react-slick";
import { useAirtable } from "../../../../hooks/useAirtable";
import { AIRTABLE_ENDPOINTS } from "../../../../services/airtable.service";
import { GalleryRecord } from "../../types";
import HeaderSection from "./components/HeaderSection";
import NavigationArrows from "./components/NavigationArrows";
import GallerySlider from "./components/GallerySlider";
import { GalleryItem } from "./types";
import { Wrapper } from "@/based/components/Wrapper";
import { Flex } from "antd";

interface NailBeautifySectionProps {
  onItemClick?: (index: number) => void;
  onGalleryItemsChange?: (items: GalleryItem[]) => void;
}

const NailBeautifySection: React.FC<NailBeautifySectionProps> = ({
  onItemClick,
  onGalleryItemsChange,
}) => {
  const sliderRef = useRef<Slider | null>(null);

  const { data: galleryRecords } = useAirtable<GalleryRecord>(
    AIRTABLE_ENDPOINTS.home_gallery
  );

  const galleryItems: GalleryItem[] = useMemo(() => {
    if (!galleryRecords || galleryRecords.length === 0) {
      return [];
    }

    return galleryRecords
      .filter((record) => {
        // Filter out records without valid URLs
        if (Array.isArray(record.url) && record.url.length > 0) {
          const firstUrl = record.url[0];
          return (
            firstUrl &&
            (typeof firstUrl === "string" ||
              (typeof firstUrl === "object" && firstUrl.thumbnails?.full?.url))
          );
        }
        return false;
      })
      .map((record) => {
        let imageUrl: string | undefined = undefined;
        if (Array.isArray(record.url) && record.url.length > 0) {
          const firstUrl = record.url[0];
          if (typeof firstUrl === "object" && firstUrl.thumbnails?.full?.url) {
            imageUrl = firstUrl.thumbnails.full.url;
          } else if (typeof firstUrl === "string") {
            imageUrl = firstUrl;
          } else if (typeof firstUrl === "object" && firstUrl.url) {
            imageUrl = firstUrl.url;
          }
        }

        return {
          id: record.id || `gallery-${Math.random()}`,
          url: imageUrl,
          description: record.description,
          textColor: record.text_color,
          textPosition: record.text_position,
        };
      })
      .sort((a, b) => {
        const recordA = galleryRecords.find((r) => r.id === a.id);
        const recordB = galleryRecords.find((r) => r.id === b.id);
        const indexA = recordA?.index ?? 999;
        const indexB = recordB?.index ?? 999;
        return indexA - indexB;
      });
  }, [galleryRecords]);

  // Notify parent component about gallery items change
  useEffect(() => {
    if (onGalleryItemsChange) {
      onGalleryItemsChange(galleryItems);
    }
  }, [galleryItems, onGalleryItemsChange]);

  // Group items into slides of 5
  const slides = useMemo(() => {
    const result: GalleryItem[][] = [];
    for (let i = 0; i < galleryItems.length; i += 5) {
      result.push(galleryItems.slice(i, i + 5));
    }
    return result;
  }, [galleryItems]);

  return (
    <section className="relative pt-10 pb-4 lg:py-[50px] bg-white">
      <Wrapper className="px-4 lg:px-6 lg:px-8">
        {/* Top Section - Heading, Description, Button, and Image */}
        <HeaderSection />

        {/* Image Gallery Slider - 5 items per slide in 2x3 grid */}
        {galleryItems.length > 0 && (
          <Flex vertical className="gap-4 lg:gap-0">
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
