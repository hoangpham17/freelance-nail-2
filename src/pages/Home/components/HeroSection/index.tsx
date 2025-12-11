import React, { useState, useEffect, useRef } from "react";
import Slider, { Settings } from "react-slick";
import { BannerItem } from "../../types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface HeroSectionProps {
  items: BannerItem[];
  campaignText?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ items }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const settings: Settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: "linear",
    beforeChange: (_current: number, next: number) => setCurrentSlide(next),
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden">
      {/* Slider Background */}
      <div className="absolute inset-0 w-full h-full">
        <Slider ref={sliderRef} {...settings}>
          {items.map((item, index) => {
            const desktop =
              item.desktop || "/assets/images/Background/home-1.jpg";
            const mobile = item.mobile || desktop;
            const imageUrl = isMobile ? mobile : desktop;

            return (
              <div
                key={item.id || index}
                className="relative w-full h-screen min-h-[700px]"
              >
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('${imageUrl}')`,
                  }}
                >
                  {/* Subtle warm gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      {/* Custom Dots */}
      <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 z-20">
        <ul className="flex items-center justify-center gap-[6px] list-none m-0 p-0">
          {items.map((_, index) => {
            const isActive = index === currentSlide;
            return (
              <li key={index} className="m-0 p-0">
                <button
                  onClick={() => {
                    sliderRef.current?.slickGoTo(index);
                  }}
                  className={`block cursor-pointer transition-all duration-300 ease-in-out ${
                    isActive
                      ? "w-[30px] h-[5px] rounded-[2.5px] bg-[#D4AF37]"
                      : "w-[5px] h-[5px] rounded-full bg-[#D3D3D3]"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default HeroSection;
