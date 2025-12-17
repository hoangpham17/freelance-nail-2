import React, { useMemo, useState } from "react";
import { Wrapper } from "@/based/components/Wrapper";
import HeaderSection from "./components/HeaderSection";
import TestimonialContent from "./components/TestimonialContent";
import GallerySlider from "./components/GallerySlider";
import { useAirtable } from "@/hooks/useAirtable";
import { AIRTABLE_ENDPOINTS } from "@/services/airtable.service";
import { HomeCommentRecord } from "@/pages/Home/types";
import { Testimonial } from "./types";

const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch data from Airtable
  const { data: commentRecords, loading } = useAirtable<HomeCommentRecord>(
    AIRTABLE_ENDPOINTS.home_comments
  );

  // Process Airtable data to gallery images and testimonials format
  const { galleryImages, testimonials } = useMemo(() => {
    if (!commentRecords || commentRecords.length === 0) {
      return { galleryImages: [], testimonials: [] };
    }

    const images: { id: string; url: string }[] = [];
    const testimonialData: Testimonial[] = [];

    commentRecords
      .filter((record) => {
        // Filter out records without valid image URLs
        if (Array.isArray(record.image) && record.image.length > 0) {
          const firstImage = record.image[0];
          return (
            firstImage &&
            (typeof firstImage === "string" ||
              (typeof firstImage === "object" &&
                firstImage.thumbnails?.full?.url))
          );
        }
        return false;
      })
      .forEach((record) => {
        let imageUrl: string | undefined = undefined;
        if (Array.isArray(record.image) && record.image.length > 0) {
          const firstImage = record.image[0];
          if (
            typeof firstImage === "object" &&
            firstImage.thumbnails?.full?.url
          ) {
            imageUrl = firstImage.thumbnails.full.url;
          } else if (typeof firstImage === "string") {
            imageUrl = firstImage;
          } else if (typeof firstImage === "object" && firstImage.url) {
            imageUrl = firstImage.url;
          }
        }

        if (imageUrl) {
          const id = record.id || `gallery-${Math.random()}`;
          images.push({
            id,
            url: imageUrl,
          });

          testimonialData.push({
            id,
            name: record.guest_name || "Guest",
            comment: record.comment || "",
            rating: 0,
            reviewCount: 0,
          });
        }
      });

    return {
      galleryImages: images,
      testimonials: testimonialData,
    };
  }, [commentRecords]);

  return (
    <section className="relative pt-10 lg:pt-16 lg:pb-0 overflow-hidden bg-gradient-to-br from-[#f9fafb] to-[#f3f4f6]">
      <div
        className="bg-cover bg-center absolute inset-0 opacity-60"
        style={{
          backgroundImage: `url(/assets/images/HomePage/bg-comment.png)`,
        }}
      />
      <Wrapper className="px-4 lg:px-6 relative z-10">
        <HeaderSection />
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-12 items-center lg:-translate-y-20 pb-14 lg:pb-0">
          <TestimonialContent
            testimonials={testimonials}
            currentIndex={currentIndex}
            loading={loading}
          />
          <GallerySlider
            galleryImages={galleryImages}
            onSlideChange={setCurrentIndex}
            loading={loading}
          />
        </div>
      </Wrapper>
    </section>
  );
};

export default TestimonialSection;
