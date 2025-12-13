import React, { useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  comment: string;
  avatar?: string;
}

interface TestimonialContentProps {
  testimonials: Testimonial[];
}

const TestimonialContent: React.FC<TestimonialContentProps> = ({
  testimonials,
}) => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const testimonialSliderRef = useRef<Slider | null>(null);

  const testimonialSettings: Settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    beforeChange: (_current: number, next: number) =>
      setCurrentTestimonialIndex(next),
  };

  return (
    <div className="space-y-6 order-2 md:order-1">
      {/* Testimonial Author with Watermark */}
      <div className="relative">
        {/* Customer watermark */}
        <span
          className={clsx(
            "absolute -left-4 -top-8 font-prata text-[#E5E5E5] -z-10 select-none",
            responsiveFontSizeArray(80, 120)
          )}
          style={{ opacity: 0.3 }}
        >
          Customer
        </span>
        <h4
          className={clsx(
            "font-prata font-bold text-black relative z-10",
            responsiveFontSizeArray(24, 32)
          )}
        >
          {testimonials[currentTestimonialIndex]?.name || "Maria Chen"}
        </h4>
      </div>

      {/* Testimonial Quote Card */}
      <div className="bg-[#F5F5F0] rounded-2xl p-6 md:p-8 shadow-lg border border-[rgba(212,175,55,0.2)] relative">
        <Slider ref={testimonialSliderRef} {...testimonialSettings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id}>
              <p className="text-base md:text-lg leading-relaxed text-black italic">
                "{testimonial.comment}"
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TestimonialContent;
