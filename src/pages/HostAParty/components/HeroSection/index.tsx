import React from "react";
import { Link } from "react-router-dom";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { SectionHeadingLine } from "@/components/SectionHeadingLine";
import { PATHS } from "@/routes/Routes";
import { HERO_IMAGE } from "../../constants";
import hostAPartyContent from "@/content/hostAParty.json";

export interface HeroSectionProps {
  onScrollToForm: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToForm }) => {
  const hero = (hostAPartyContent as {
    hero: {
      titleLine1: string;
      titleLine2: string;
      description: string;
      ctaPlan: string;
      ctaBrowse: string;
      heroImageAlt: string;
    };
  }).hero;

  return (
    <section
      className="host-party-hero relative w-full bg-black lg:bg-transparent overflow-hidden"
      aria-label="Host a party introduction"
    >
      {/* Desktop Image */}
      <div
        className="host-party-hero__media-wrap host-party-hero__media-wrap--desktop hidden lg:block absolute inset-y-0 right-0 w-[62%] pointer-events-none overflow-hidden"
        aria-hidden
      >
        <div className="host-party-hero__media absolute inset-0">
          <img src={HERO_IMAGE} alt="" className="absolute inset-0 object-cover w-full h-full" />
          <div className="host-party-hero__scrim absolute inset-0" />
        </div>
      </div>

      {/* Mobile Background Image (Gallery style) */}
      <div className="absolute inset-0 block lg:hidden pointer-events-none">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-black/15" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.85) 100%)",
          }}
        />
      </div>

      <Wrapper className="host-party-hero__wrapper relative z-10 !py-14 lg:!py-0 min-h-[24rem] lg:min-h-0 flex flex-col justify-center">
        <div className="host-party-shell host-party-hero__inner">

          <div className="host-party-hero__copy text-center lg:text-left relative z-20">
            <div className="host-party-hero__heading">
              <h1 className="host-party-hero__title font-tangerine">
                <span
                  className={clsx(
                    "host-party-hero__title-line host-party-hero__title-line--lead block whitespace-nowrap text-gold-gradient",
                    responsiveFontSizeArray(28, 46, { sm: 32, md: 36, lg: 40, xl: 44 }),
                  )}
                >
                  {hero.titleLine1}
                </span>
                <span
                  className={clsx(
                    "host-party-hero__title-line host-party-hero__title-line--accent block text-gold-gradient",
                    responsiveFontSizeArray(34, 72, { lg: 68, xl: 72, "2xl": 76 }),
                  )}
                >
                  {hero.titleLine2}
                </span>
              </h1>
              <SectionHeadingLine className="host-party-hero__divider mx-auto lg:mx-0" />
            </div>
            <p
              className={clsx(
                "host-party-hero__description font-light leading-[1.65] text-madison-muted",
                responsiveFontSizeArray(14, 16),
              )}
            >
              {hero.description}
            </p>
            <div className="host-party-hero__actions">
              <button
                type="button"
                onClick={onScrollToForm}
                className="madison-btn-primary"
              >
                {hero.ctaPlan}
              </button>
              <Link to={PATHS.services} className="madison-btn-outline">
                {hero.ctaBrowse}
              </Link>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default HeroSection;
