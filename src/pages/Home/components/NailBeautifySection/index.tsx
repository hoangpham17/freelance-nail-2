import React from "react";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../routes/Routes";
import "./style.css";

const SERVICE_SHOWCASE = [
  {
    id: 1,
    title: "Wrinkle spa best selling",
    image: "/assets/images/Background/home-2.jpg",
    link: `${PATHS.services}#wrinkle-spa`,
  },
  {
    id: 2,
    title: "Nail beauty",
    image: "/assets/images/Background/home-3.jpg",
    link: `${PATHS.services}#nail-beauty`,
  },
  {
    id: 3,
    title: "Hand care",
    image: "/assets/images/Background/home-4.jpg",
    link: `${PATHS.services}#hand-care`,
  },
  {
    id: 4,
    title: "Nail beauty",
    image: "/assets/images/Background/home-5.jpg",
    link: `${PATHS.services}#nail-beauty`,
  },
];

const NailBeautifySection: React.FC = () => {
  return (
    <section className="nail-beautify-section py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Top Section - Heading, Description, Button, and Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Side - Text Content */}
          <div className="space-y-6">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight"
            >
              Your nail beautify Elevate your style!
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes.
            </p>
            <Link to={PATHS.services}>
              <Button
                type="primary"
                size="large"
                className="rounded-full px-8 py-6 h-auto text-base font-semibold"
                icon={<ArrowRightOutlined />}
              >
                View more
              </Button>
            </Link>
          </div>

          {/* Right Side - Nail Polish Splash Image */}
          <div className="relative">
            <div className="nail-polish-image relative overflow-hidden rounded-2xl">
              <img
                src="/assets/images/Background/home-1.jpg"
                alt="Nail polish splash"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Service Showcase Grid - 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICE_SHOWCASE.map((service) => (
            <div
              key={service.id}
              className="service-showcase-item relative group overflow-hidden rounded-xl cursor-pointer"
            >
              <div className="relative h-64 md:h-80">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 font-serif">
                    {service.title}
                  </h3>
                  <Link to={service.link}>
                    <Button
                      type="primary"
                      className="rounded-full px-6 py-4 h-auto"
                      icon={<ArrowRightOutlined />}
                    >
                      GET TICKETS &gt;&gt;
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NailBeautifySection;
