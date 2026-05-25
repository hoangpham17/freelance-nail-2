import React from "react";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { SectionHeadingLine } from "@/components/SectionHeadingLine";
import aboutUsContent from "@/content/aboutUs.json";

const HERO_IMAGE = "/assets/images/AboutUs/banner.png";

type Content = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    lead: string;
  };
};

export const AboutUsHero: React.FC = () => {
  const { hero } = aboutUsContent as Content;

  return (
    <header className="au-hero" aria-label="About us">
      <div className="au-hero__bg" aria-hidden>
        <img src={HERO_IMAGE} alt="" />
        <div className="au-hero__veil" />
      </div>

      <div className="au-hero__content">
        <span className="au-hero__eyebrow">{hero.eyebrow}</span>
        <h1 className="font-tangerine leading-[0.95]">
          <span
            className={clsx(
              "block text-gold-gradient",
              responsiveFontSizeArray(52, 96),
            )}
          >
            {hero.title}
          </span>
        </h1>
        <SectionHeadingLine className="mx-auto lg:mx-0 mt-4" />
        <p
          className={clsx(
            "au-hero__subtitle",
            responsiveFontSizeArray(10, 11),
          )}
        >
          {hero.subtitle}
        </p>
        <p
          className={clsx("au-hero__lead", responsiveFontSizeArray(14, 17))}
        >
          {hero.lead}
        </p>
        <div className="au-hero__scroll" aria-hidden>
          <span className="au-hero__scroll-line" />
        </div>
      </div>
    </header>
  );
};
