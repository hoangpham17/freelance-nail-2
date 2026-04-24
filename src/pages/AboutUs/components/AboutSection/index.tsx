import React from "react";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { SectionTitle } from "@/components/SectionTitle";
import type { AboutUsSection } from "../../types";

type Props = {
  section: AboutUsSection;
  index: number;
  totalCount: number;
};

export const AboutSection: React.FC<Props> = ({
  section,
  index,
  totalCount,
}) => {
  const isImageLeft = section.position === "left";

  return (
    <section
      id={section.id}
      className={clsx(
        "scroll-mt-24 lg:scroll-mt-28",
        index > 0 && "pt-8 lg:pt-12 border-t border-[#EDE6E0]",
        index < totalCount - 1 && "pb-8 lg:pb-12",
      )}
    >
      <div
        className={clsx(
          "flex flex-col gap-6 lg:gap-10",
          isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse",
        )}
      >
        <div className="w-full lg:w-[48%] flex-shrink-0">
          {section.image ? (
            <img
              src={section.image}
              alt="About Us"
              className="w-full h-auto rounded-2xl object-cover aspect-[3/2] lg:aspect-[16/10] shadow-[0_12px_40px_rgba(107,74,47,0.06)]"
            />
          ) : (
            <div
              className="w-full rounded-2xl aspect-[3/2] lg:aspect-[16/10] bg-[#EDE6E0]"
              aria-hidden
            />
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center lg:py-1">
          <SectionTitle
            html={section.title}
            fontSize={[32, 48]}
            leading="1.1"
            className="mb-3 tracking-tight"
          />
          <div
            className="w-12 h-px mb-3 lg:mb-4 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #B2866D 0%, transparent 100%)",
            }}
          />
          <p
            className={clsx(
              "font-extralight text-[#5C4D42] leading-[1.9]",
              responsiveFontSizeArray(15, 18),
            )}
          >
            {section.description}
          </p>
        </div>
      </div>
    </section>
  );
};
