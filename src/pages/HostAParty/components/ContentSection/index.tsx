import React from "react";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

const ContentSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white py-8 lg:py-12">
      <Wrapper>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 lg:space-y-6">
            <p
              className={clsx(
                "text-[#494747] leading-relaxed",
                responsiveFontSizeArray(14, 18)
              )}
            >
              Our Nail Lounge is the perfect setting for bridal showers,
              birthdays, bachelorette parties, corporate events, and special
              gatherings.
            </p>
            <p
              className={clsx(
                "text-[#494747] leading-relaxed",
                responsiveFontSizeArray(14, 18)
              )}
            >
              With a beautiful space and a dedicated team, we provide a
              seamless, memorable experience for you and your guests.
            </p>
            <p
              className={clsx(
                "text-[#494747] leading-relaxed",
                responsiveFontSizeArray(14, 18)
              )}
            >
              Contact us to learn more or fill out our inquiry form. Your ideal
              destination for fun, relaxation, and flawless nail services
              awaits!
            </p>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default ContentSection;

