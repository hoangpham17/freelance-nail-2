import React, { useMemo } from "react";
import { Wrapper } from "@/based/components/Wrapper";
import HeaderSection from "./components/HeaderSection";
import TestimonialContent from "./components/TestimonialContent";
import GallerySlider from "./components/GallerySlider";
import { Testimonial, GalleryImage } from "./types";

interface TestimonialSectionProps {
  testimonials?: Testimonial[];
  galleryImages?: GalleryImage[];
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Maria Chen",
    rating: 4.9,
    reviewCount: 1944,
    comment:
      "Perfect service, this place is the right place if you want to indulge yourself one in a while",
    avatar: "/assets/images/Background/home-2.jpg",
  },
];

const DEFAULT_GALLERY_IMAGES: GalleryImage[] = [
  { id: "1", url: "/assets/images/Slide/Photo.jpg" },
  { id: "2", url: "/assets/images/Slide/Photo-2.jpg" },
  { id: "3", url: "/assets/images/Slide/Photo-3.jpg" },
];

const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  testimonials = DEFAULT_TESTIMONIALS,
  galleryImages = DEFAULT_GALLERY_IMAGES,
}) => {
  // Water droplet pattern background
  const waterDropletPattern = useMemo(
    () =>
      `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='2' fill='%23D4AF37' opacity='0.1'/%3E%3C/svg%3E")`,
    []
  );

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-[#f9fafb] to-[#f3f4f6]">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.05) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(212, 175, 55, 0.05) 0%, transparent 50%), ${waterDropletPattern}`,
          backgroundRepeat: "repeat",
        }}
      />
      <Wrapper className="px-4 md:px-6 lg:px-8 relative z-10">
        <HeaderSection />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <TestimonialContent testimonials={testimonials} />
          <GallerySlider galleryImages={galleryImages} />
        </div>
      </Wrapper>
    </section>
  );
};

export default TestimonialSection;
