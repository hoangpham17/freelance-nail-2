import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../routes/Routes";
import "./style.css";

const SERVICES_MENU = [
  {
    title: "Manicure",
    href: `${PATHS.services}#manicure`,
    icon: "/assets/images/Services/Manicure-gold.png",
  },
  {
    title: "Pedicure",
    href: `${PATHS.services}#pedicure`,
    icon: "/assets/images/Services/Pedicure-gold.svg",
  },
  {
    title: "Nail Enhancements",
    href: `${PATHS.services}#nails-enhancements`,
    icon: "/assets/images/Services/Nail-Enhancements-gold.svg",
  },
  {
    title: "Additional Services",
    href: `${PATHS.services}#additional-services`,
    icon: "/assets/images/Services/Additional-Services-gold.svg",
  },
  {
    title: "Waxing",
    href: `${PATHS.services}#waxing`,
    icon: "/assets/images/Services/Waxing-gold.svg",
  },
  {
    title: "Kid Service",
    href: `${PATHS.services}#kid-services`,
    icon: "/assets/images/Services/Kid-Services-gold.svg",
  },
  {
    title: "Facial Relax",
    href: `${PATHS.services}#facial-relax`,
    icon: "/assets/images/Services/Additional-Services-gold.svg",
  },
  {
    title: "HeadSpa",
    href: `${PATHS.services}#headspa`,
    icon: "/assets/images/Services/Additional-Services-gold.svg",
  },
  {
    title: "Eyelash",
    href: `${PATHS.services}#eyelash`,
    icon: "/assets/images/Services/Additional-Services-gold.svg",
  },
];

const WelcomeSection: React.FC = () => {
  return (
    <section className="welcome-section relative py-20 md:py-28 overflow-hidden">
      {/* Wavy Background Texture */}
      <div className="welcome-bg absolute inset-0"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Title with decorative nail polish bottles */}
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-8 md:mb-12">
            <img
              src="/assets/images/Services/Manicure-gold.png"
              alt="nail polish"
              className="w-10 h-10 md:w-16 md:h-16 object-contain"
            />
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-center max-w-4xl">
              Welcome to The Veira Nail Lounge Spa and Who we are?
            </h2>
            <img
              src="/assets/images/Services/Manicure-gold.png"
              alt="nail polish"
              className="w-10 h-10 md:w-16 md:h-16 object-contain"
            />
          </div>

          {/* Description */}
          <p className="text-base md:text-lg lg:text-xl text-center text-gray-700 max-w-4xl mx-auto leading-relaxed mb-12 md:mb-16">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
          </p>

          {/* Service Icons Grid - Horizontal array */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10">
            {SERVICES_MENU.map((service) => (
              <Link
                key={service.title}
                to={service.href}
                className="service-icon-item flex flex-col items-center group"
              >
                <div className="service-icon-circle w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-lg flex items-center justify-center mb-3 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-12 h-12 md:w-14 md:h-14 object-contain"
                  />
                </div>
                <p className="text-xs md:text-sm font-medium text-center max-w-[100px] group-hover:text-primary transition-colors">
                  {service.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
