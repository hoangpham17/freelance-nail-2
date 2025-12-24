import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PATHS } from "@/routes/Routes";
import clsx from "clsx";
import { Wrapper } from "@/based/components/Wrapper";
import { useServiceCategories } from "@/hooks/useServiceCategories";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

const BottomNav: React.FC = () => {
  const location = useLocation();
  const { categories: serviceCategories } = useServiceCategories();

  const serviceNavItems = serviceCategories.map((category) => ({
    path: `${PATHS.services}#${category.slug}`,
    label: category.title,
    slug: category.slug,
  }));

  const checkIsActive = (slug: string) => {
    const isServicesPage = location.pathname === PATHS.services;
    const currentHash = location.hash.replace("#", "");
    return isServicesPage && currentHash === slug;
  };

  return (
    <div className="hidden lg:block bg-white/20">
      <Wrapper>
        <nav className="flex justify-center">
          {serviceNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                " flex items-center justify-center transition-colors hover:bg-white hover:text-black py-3 px-6",
                responsiveFontSizeArray(16, 18),
                checkIsActive(item.slug) ? "bg-white" : "text-[#8B4B20]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Wrapper>
    </div>
  );
};

export default BottomNav;
