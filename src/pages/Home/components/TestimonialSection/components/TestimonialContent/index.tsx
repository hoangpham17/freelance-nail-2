import React, { useEffect, useRef } from "react";
import Slider, { Settings } from "react-slick";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { Skeleton } from "antd";
import { Testimonial } from "../../types";

interface TestimonialContentProps {
  testimonials: Testimonial[];
  currentIndex: number;
  loading?: boolean;
}

const TestimonialContent: React.FC<TestimonialContentProps> = ({
  testimonials,
  currentIndex,
  loading = false,
}) => {
  const testimonialSliderRef = useRef<Slider | null>(null);

  // Sync testimonial slider with gallery slider
  useEffect(() => {
    if (testimonialSliderRef.current && currentIndex < testimonials.length) {
      testimonialSliderRef.current.slickGoTo(currentIndex);
    }
  }, [currentIndex, testimonials.length]);

  const testimonialSettings: Settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: false, // Disable autoplay, sync with gallery instead
    fade: true,
    speed: 500,
  };

  if (loading) {
    return (
      <div className="space-y-6 order-2 md:order-1">
        <Skeleton active paragraph={{ rows: 2 }} />
        <Skeleton active paragraph={{ rows: 4 }} />
      </div>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex] || testimonials[0];

  return (
    <div className="space-y-6 order-2 md:order-1">
      <div className="relative">
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
            responsiveFontSizeArray(24, 45)
          )}
        >
          {currentTestimonial?.name}
        </h4>
      </div>

      <div
        className=" bg-[#E1B1681A] rounded-2xl p-6 md:p-8 shadow-lg border border-[rgba(212,175,55,0.2)] relative"
        style={{}}
      >
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
