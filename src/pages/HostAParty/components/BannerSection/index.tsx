import React from "react";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

const BannerSection: React.FC = () => {
  return (
    <section className="relative pt-3 lg:pt-6 pb-3 lg:pb-5">
      <Wrapper>
        <div className="space-y-8 lg:space-y-12">
          {/* Title Section */}
          <div className="flex flex-col items-center justify-center text-center">
            <h1
              className={clsx(
                "font-prata font-bold text-[#C19A6B] leading-tight",
                responsiveFontSizeArray(28, 64)
              )}
            >
              <div>Host a party at The Veira</div>
              <div>Nail Lounge & Spa</div>
            </h1>
          </div>

          {/* Content Section - Left Image, Right Description */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Image */}
            <div className="w-full order-2 lg:order-1">
              <img
                src="/assets/images/Host-A-Party/bg-host-a-party.png"
                alt="Party decorative elements"
                className="w-full h-auto rounded-2xl"
                onError={(e) => {
                  e.currentTarget.src = "https://picsum.photos/800/600";
                }}
              />
            </div>

            {/* Right - Description */}
            <div className="w-full order-1 lg:order-2">
              <p
                className={clsx(
                  "text-black font-light lg:max-w-[600px]",
                  responsiveFontSizeArray(16, 20)
                )}
              >
                Our Nail Lounge is the perfect setting for bridal showers,
                birthdays, bachelorette parties, corporate events, and special
                gatherings.
                <br />
                <br />
                With a beautiful space and a dedicated team, we provide a
                seamless, memorable experience for you and your guests.
                <br />
                <br />
                Contact us to learn more or fill out our inquiry form. Your
                ideal destination for fun, relaxation, and flawless nail
                services awaits!
              </p>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default BannerSection;
