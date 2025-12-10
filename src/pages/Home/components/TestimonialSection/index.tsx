import React from "react";
import Slider, { Settings } from "react-slick";
import { Rate } from "antd";
import { StarFilled } from "@ant-design/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  comment: string;
  avatar?: string;
}

interface TestimonialSectionProps {
  testimonials?: Testimonial[];
  galleryImages?: { id: string; url: string }[];
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

const DEFAULT_GALLERY_IMAGES = [
  { id: "1", url: "/assets/images/Slide/Photo.jpg" },
  { id: "2", url: "/assets/images/Slide/Photo-2.jpg" },
  { id: "3", url: "/assets/images/Slide/Photo-3.jpg" },
];

const testimonialSettings: Settings = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  dots: false,
  autoplay: true,
  autoplaySpeed: 4000,
  fade: true,
};

const gallerySettings: Settings = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  autoplay: true,
  autoplaySpeed: 3000,
  fade: true,
};

const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  testimonials = DEFAULT_TESTIMONIALS,
  galleryImages = DEFAULT_GALLERY_IMAGES,
}) => {
  return (
    <section className="testimonial-section py-20 md:py-28 relative overflow-hidden">
      {/* Background with water droplet patterns */}
      <div className="testimonial-bg absolute inset-0"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Testimonial */}
          <div className="space-y-6">
            {/* Heading */}
            <div className="space-y-2">
              <h3
                className="text-2xl md:text-3xl font-bold"
              >
                10K COMMENT
              </h3>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight"
              >
                Your nail has never felt better Brighter and Healthier with
                Veira
              </h2>
            </div>

            {/* Testimonial Card */}
            <div className="testimonial-card bg-white rounded-2xl p-6 md:p-8 shadow-xl">
              <Slider {...testimonialSettings}>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      {testimonial.avatar && (
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover border-2"
                        />
                      )}
                      <div>
                        <h4
                          className="text-lg font-semibold"
                        >
                          {testimonial.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          <Rate
                            disabled
                            value={testimonial.rating}
                            allowHalf
                            character={<StarFilled />}
                          />
                          <span
                            className="text-sm"
                          >
                            {testimonial.rating} (
                            {testimonial.reviewCount.toLocaleString()})
                          </span>
                        </div>
                      </div>
                    </div>
                    <p
                      className="text-base md:text-lg italic leading-relaxed"
                    >
                      "{testimonial.comment}"
                    </p>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Right Side - Gallery Carousel */}
          <div className="relative">
            <div className="gallery-carousel rounded-2xl overflow-hidden shadow-xl">
              <Slider {...gallerySettings}>
                {galleryImages.map((image) => (
                  <div key={image.id} className="relative">
                    <img
                      src={image.url}
                      alt="Gallery"
                      className="w-full h-96 md:h-[500px] object-cover"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
