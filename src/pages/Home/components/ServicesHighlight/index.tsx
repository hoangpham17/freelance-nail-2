import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../routes/Routes";
import "./style.css";

const SERVICES_MENU = [
  {
    title: "Manicure",
    href: `${PATHS.services}#manicure`,
    icon: "/assets/images/Services/Manicure-gold.png",
    iconActive: "/assets/images/Services/Manicure-black.png",
  },
  {
    title: "Pedicure",
    href: `${PATHS.services}#pedicure`,
    icon: "/assets/images/Services/Pedicure-gold.svg",
    iconActive: "/assets/images/Services/Pedicure-black.svg",
  },
  {
    title: "Nail Enhancements",
    href: `${PATHS.services}#nails-enhancements`,
    icon: "/assets/images/Services/Nail-Enhancements-gold.svg",
    iconActive: "/assets/images/Services/Nail-Enhancements-black.svg",
  },
  {
    title: "Additional Services",
    href: `${PATHS.services}#additional-services`,
    icon: "/assets/images/Services/Additional-Services-gold.svg",
    iconActive: "/assets/images/Services/Additional-Services-black.svg",
  },
  {
    title: "Waxing",
    href: `${PATHS.services}#waxing`,
    icon: "/assets/images/Services/Waxing-gold.svg",
    iconActive: "/assets/images/Services/Waxing-black.svg",
  },
  {
    title: "Kid's Services",
    href: `${PATHS.services}#kid-services`,
    icon: "/assets/images/Services/Kid-Services-gold.svg",
    iconActive: "/assets/images/Services/Kid-Services-black.svg",
  },
];

const ServicesHighlight: React.FC = () => {
  return (
    <section className="our-services-block" data-scroll-to>
      <div className="container">
        <div className="inner">
          <div className="our-services-block__content">
            <div className="our-services-block__info">
              <h1 className="our-services-block__title blend-text">
                Welcome to <span>Madison Nail Lounge</span>
              </h1>
              <p className="our-services-block__desc white">
                Where luxurious nail care services and exceptional customer services are our top priorities. We are more than just a nail salon. We are an exceptional oasis of beauty, relaxation, and top-notch service. Our mission is to provide our valued clients with an outstanding service that leaves them feeling pampered, rejuvenated, and confident.
              </p>
            </div>
            <div className="our-services-block__services-list">
              {SERVICES_MENU.map((service) => (
                <Link
                  key={service.title}
                  to={service.href}
                  className="our-services-block__service-item"
                >
                  <div className="our-services-block__service-content">
                    <div className="our-services-block__block-img">
                      <img
                        src={service.icon}
                        alt={service.title}
                        className="our-services-block__service-img"
                      />
                      <img
                        src={service.iconActive}
                        alt={`${service.title} active`}
                        className="our-services-block__service-img active"
                      />
                    </div>
                    <p className="our-services-block__service-desc gold">
                      {service.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHighlight;
