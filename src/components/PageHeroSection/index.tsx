import React from "react";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { SectionHeadingLine } from "@/components/SectionHeadingLine";

export interface PageHeroSectionProps {
  title: string;
  subtitle?: string;
  flower?: 1 | 2 | 3;
}

export const PageHeroSection: React.FC<PageHeroSectionProps> = ({ title }) => {
  return (
    <section className="relative w-full madison-section-gradient overflow-hidden">
      <Wrapper className="relative z-[2] py-10 lg:py-14">
        <div className="max-w-[900px] mx-auto text-center">
          <h1 className="relative">
            <span
              className={clsx(
                "block text-gold-gradient font-tangerine leading-[0.92]",
                responsiveFontSizeArray(40, 72),
              )}
            >
              {title}
            </span>
          </h1>
          <SectionHeadingLine className="mx-auto mt-3" />
        </div>
      </Wrapper>
    </section>
  );
};
