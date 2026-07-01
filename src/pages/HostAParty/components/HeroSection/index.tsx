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
      className="host-party-hero relative w-full bg-black"
      aria-label="Host a party introduction"
    >
      <div
        className="host-party-hero__media-wrap host-party-hero__media-wrap--desktop hidden lg:block absolute inset-y-0 right-0 w-[62%] pointer-events-none overflow-hidden"
        aria-hidden
      >
        <div className="host-party-hero__media absolute inset-0">
          <img src={HERO_IMAGE} alt="" className="absolute inset-0" />
          <div className="host-party-hero__scrim absolute inset-0" />
        </div>
      </div>

      <Wrapper className="host-party-hero__wrapper relative z-10 !py-0">
        <div className="host-party-shell host-party-hero__inner">
          <div className="host-party-hero__media-wrap host-party-hero__media-wrap--mobile lg:hidden">
            <div className="host-party-hero__media relative w-full">
              <img src={HERO_IMAGE} alt={hero.heroImageAlt} />
              <div className="host-party-hero__scrim absolute inset-0" />
            </div>
          </div>

          <div className="host-party-hero__copy text-center lg:text-left">
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
