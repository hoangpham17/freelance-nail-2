import React, { useState } from "react";
import { Wrapper } from "@/based/components/Wrapper";
import HeaderSection from "./components/HeaderSection";
import TestimonialContent from "./components/TestimonialContent";
import GallerySlider from "./components/GallerySlider";
import { useTestimonials } from "./useTestimonials";

const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { galleryImages, testimonials, loading } = useTestimonials();

  return (
    <section className="relative pt-[60px] lg:pt-11 lg:pb-0 overflow-hidden bg-gradient-to-br from-[#f9fafb] to-[#f3f4f6]">
      <div
        className="bg-cover bg-center absolute inset-0 opacity-60"
        style={{
          backgroundImage: `url(/assets/images/HomePage/bg-comment.png)`,
        }}
      />
      <Wrapper className="px-4 lg:px-6 relative z-10">
        <HeaderSection />
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-12 items-center lg:-translate-y-16 pb-14 lg:pb-0 mt-5 lg:mt-0">
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
