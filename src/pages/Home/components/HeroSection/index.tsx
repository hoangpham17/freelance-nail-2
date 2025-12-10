import React, { useState, useEffect } from "react";
import Slider, { Settings } from "react-slick";
import { Button } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { BannerItem } from "../../types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

interface HeroSectionProps {
  items: BannerItem[];
  campaignText: string;
}

const settings: Settings = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  autoplay: true,
  autoplaySpeed: 5000,
  fade: true,
  cssEase: "linear",
};

const HeroSection: React.FC<HeroSectionProps> = ({ items, campaignText }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="hero-section relative w-full h-screen min-h-[700px] overflow-hidden">
      {/* Slider Background */}
      <div className="absolute inset-0 w-full h-full">
        <Slider {...settings}>
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

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center min-h-[700px]">
        {/* Main Title - Centered at top */}
        <div className="text-center mb-12 md:mb-16">
          <h1
            className="hero-main-title text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold"
          >
            THE VEIRA NAIL LOUNGE & SPA
          </h1>
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full flex-1 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-7xl mx-auto w-full">
            {/* Left Content Box */}
            <div className="hero-left-box bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl max-w-lg">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-serif"
              >
                Dip powder on Real Nails
              </h2>
              <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula.
              </p>

              <Button
                type="primary"
                size="large"
                className="mb-6 rounded-full px-8 py-6 h-auto text-base font-semibold"
                icon={<PhoneOutlined />}
              >
                Contact
              </Button>

              <p className="text-sm md:text-base text-gray-600 italic">
                {campaignText}
              </p>
            </div>

            {/* Right Content Box */}
            <div className="hero-right-box flex flex-col items-end lg:items-start space-y-4">
              <Button
                type="primary"
                size="large"
                className="rounded-full px-8 py-6 h-auto text-lg font-semibold"
              >
                Booking now
              </Button>
              <p
                className="text-xl md:text-2xl font-semibold"
              >
                (608) 000 000
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
