import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useServiceCategories } from "../../hooks/useServiceCategories";
import ServiceCategorySection from "./components/ServiceCategorySection";
import CategoryTabs from "./components/CategoryTabs";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

const Services: React.FC = () => {
  const location = useLocation();
  const serviceCategories = useServiceCategories();

  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(hash);
        element?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, [location.hash]);

  return (
    <main className="w-full">
      <CategoryTabs categories={serviceCategories} />
      <section className="relative w-full py-16 md:py-24 lg:py-32">
        <Wrapper>
          <h1
            className={clsx(
              "text-center font-prata font-bold text-[#3a3a3a]",
              responsiveFontSizeArray(32, 120)
            )}
          >
            SERVICES NAIL LOUNGE!
          </h1>
        </Wrapper>
      </section>

      {/* Service Categories */}
      <section className="w-full">
        {serviceCategories
          .map((category, originalIndex) => ({
            category,
            originalIndex: originalIndex + 1,
          }))
          .filter(({ category }) => category.services.length > 0)
          .map(({ category, originalIndex }) => (
            <ServiceCategorySection
              key={category.id}
              category={category}
              index={originalIndex}
            />
          ))}
      </section>
    </main>
  );
};

export default Services;
