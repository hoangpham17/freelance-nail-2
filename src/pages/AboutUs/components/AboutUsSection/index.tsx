import React from "react";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { AboutUsSection } from "../../data";

interface AboutUsSectionProps {
  section: AboutUsSection;
}

const AboutUsSectionComponent: React.FC<AboutUsSectionProps> = ({
  section,
}) => {
  const isImageLeft = section.position === "left";

  return (
    <article className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
      <div
        className={clsx(
          "w-full",
          isImageLeft ? "order-1 lg:order-1" : "order-1 lg:order-2"
        )}
      >
        <img
          src={section.image}
          alt={section.imageAlt}
          className="w-full h-auto rounded-lg"
        />
      </div>

      <div
        className={clsx(
          "w-full lg:p-12",
          isImageLeft ? "order-2 lg:order-2" : "order-2 lg:order-1"
        )}
      >
        <h2
          className={clsx(
            "font-prata text-[#D1A054] mb-2 lg:mb-4 border-b border-[#D1A054] pb-2",
            responsiveFontSizeArray(50, 70)
          )}
        >
          {section.title}
        </h2>
        <p className={clsx("font-light", responsiveFontSizeArray(16, 20))}>
          {section.description}
        </p>
      </div>
    </article>
  );
};

export default AboutUsSectionComponent;
