import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "@/routes/Routes";
import clsx from "clsx";

const BottomNav: React.FC = () => {
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
    { path: `${PATHS.services}#kid-services`, label: "Kid Services" },
    { path: `${PATHS.services}#headspa`, label: "Headspa" },
    { path: `${PATHS.services}#facial-relax`, label: "Facial Relax" },
    { path: `${PATHS.services}#eyelash`, label: "Eye lash" },
  ];

  const checkIsActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="hidden lg:block bg-white/20">
      <nav className="flex max-w-[1920px] mx-auto justify-center">
        {serviceNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={clsx(
              "text-xs md:text-sm uppercase tracking-wide transition-colors hover:opacity-80 font-normal py-3 px-6",
              checkIsActive(item.path) ? "text-black" : "text-[#8B4B20]"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default BottomNav;
