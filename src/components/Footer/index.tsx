import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../routes/Routes";
import "./style.css";

const Footer: React.FC = () => {
  const serviceNavItems = [
    { path: `${PATHS.services}#manicure`, label: "Manicure" },
    { path: `${PATHS.services}#pedicure`, label: "Pedicure" },
    {
      path: `${PATHS.services}#nails-enhancements`,
      label: "Nail Enhancements",
    },
    {
      path: `${PATHS.services}#additional-services`,
      label: "Additional Services",
    },
    { path: `${PATHS.services}#waxing`, label: "Waxing" },
    { path: `${PATHS.services}#kid-services`, label: "Kid's Services" },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Location */}
          <div>
            <h3 className="text-primary text-xl font-serif mb-6 tracking-wider">
              Location
            </h3>
            <address className="text-gray-300 mb-4 leading-relaxed not-italic">
              795 University Ave, Madison, WI 53715
            </address>
            <a
              href="https://www.google.com/maps/place/795+University+Ave,+Madison,+WI+53715,+USA/@43.0730841,-89.4012631,17z/data=!3m1!4b1!4m6!3m5!1s0x88065334cd27e4bf:0x1ab8575f0542d4b6!8m2!3d43.0730802!4d-89.3986882!16s%2Fg%2F11c5mj0zcb?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark underline transition-colors duration-300"
            >
              Show direction
            </a>
            <div className="mt-6">
              <a
                href="https://www.google.com/maps/place/795+University+Ave,+Madison,+WI+53715,+USA/@43.0730841,-89.4012631,17z/data=!3m1!4b1!4m6!3m5!1s0x88065334cd27e4bf:0x1ab8575f0542d4b6!8m2!3d43.0730802!4d-89.3986882!16s%2Fg%2F11c5mj0zcb?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/assets/images/Background/map.jpg"
                  alt="Location Map"
                  className="rounded-lg w-full"
                  onError={(e) => {
                    e.currentTarget.src = "https://picsum.photos/400/200";
                  }}
                />
              </a>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-primary text-xl font-serif mb-6 tracking-wider">
              Business hours
            </h3>
            <div className="space-y-3">
              <p className="flex justify-between">
                <span className="text-primary">Monday – Friday</span>
                <span className="text-white">9:30am – 7:30pm</span>
              </p>
              <p className="flex justify-between">
                <span className="text-primary">Saturday</span>
                <span className="text-white">9:30am – 5:00pm</span>
              </p>
              <p className="flex justify-between">
                <span className="text-primary">Sunday</span>
                <span className="text-white">11:00am – 4:00pm</span>
              </p>
            </div>
          </div>

          {/* Keep in Touch */}
          <div>
            <h3 className="text-primary text-xl font-serif mb-6 tracking-wider">
              keep in touch
            </h3>
            <div className="space-y-4">
              <a
                href="tel:6087201011"
                className="block text-white hover:text-primary transition-colors duration-300"
              >
                (608) 720 1011
              </a>
              <a
                href="mailto:contact@madisonnaillounge.com"
                className="block text-white hover:text-primary transition-colors duration-300 break-words"
              >
                contact@madisonnaillounge.com
              </a>
              <ul className="flex gap-4 mt-6">
                <li>
                  <a
                    href="https://www.instagram.com/madisonnaillounge/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity"
                    aria-label="Instagram"
                  >
                    <i className="bi bi-instagram text-2xl"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/madisonnailloungewi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity"
                    aria-label="Facebook"
                  >
                    <i className="bi bi-facebook text-2xl"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Navigation - Services Menu */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-7xl mx-auto">
            <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
              {serviceNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-400 hover:text-primary transition-colors duration-300 text-sm md:text-base"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-500">
          <p>Copyright ⓒ {new Date().getFullYear()} MadisonNailLounge</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
