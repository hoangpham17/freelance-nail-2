import React from "react";
import { useSearchParams } from "react-router-dom";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { useBaseOffset } from "@/hooks/useBaseOffset";
import ContactForm from "./components/ContactForm";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import contactUsContent from "@/content/contactUs.json";
import { SectionHeadingLine } from "@/components/SectionHeadingLine";
import { ContactInfoSection } from "@/pages/ContactUs/components/ContactInfoSection";

const ContactUs: React.FC = () => {
  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get("signup") !== null;
  const { mainTopSpacing } = useBaseOffset();

  const heading = isSignup
    ? (contactUsContent as { intro: { headingSignup: string } }).intro
        .headingSignup
    : (contactUsContent as { intro: { headingContact: string } }).intro
        .headingContact;
  const title = isSignup
    ? (contactUsContent as { hero: { titleSignup: string } }).hero.titleSignup
    : (contactUsContent as { hero: { titleContact: string } }).hero.titleContact;
  const subtext = isSignup
    ? (contactUsContent as { intro: { subtextSignup: string } }).intro
        .subtextSignup
    : (contactUsContent as { intro: { subtextContact: string } }).intro
        .subtextContact;

  return (
    <main
      className="relative w-full min-h-screen madison-section-gradient"
      style={{
        paddingTop: `${mainTopSpacing}px`,
      }}
    >
      {/* Decorative wavy lines — full-page SVG, coords in % so all lines stay in viewport */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] overflow-visible"
        aria-hidden
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient
              id="contact-deco-gold"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#F9BE5C" stopOpacity="0" />
              <stop offset="45%" stopColor="#F9BE5C" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#F9BE5C" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* top-left */}
          <path
            d="M2 18 C18 8, 28 26, 42 14 S70 6, 88 16"
            stroke="url(#contact-deco-gold)"
            strokeWidth="1"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0 24 C16 14, 30 32, 48 20 S76 12, 92 22"
            stroke="url(#contact-deco-gold)"
            strokeWidth="0.65"
            strokeLinecap="round"
            opacity="0.55"
            vectorEffect="non-scaling-stroke"
          />
          {/* mid-right */}
          <path
            d="M58 32 C72 44, 84 24, 96 36 S108 48, 98 58"
            stroke="url(#contact-deco-gold)"
            strokeWidth="0.9"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* bottom-left */}
          <path
            d="M4 78 C20 66, 34 88, 52 74 S78 64, 90 76"
            stroke="url(#contact-deco-gold)"
            strokeWidth="0.9"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* bottom-right */}
          <path
            d="M54 70 C68 62, 82 78, 90 66"
            stroke="url(#contact-deco-gold)"
            strokeWidth="0.75"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <section className="relative z-[2] w-full py-12 lg:py-16">
        <Wrapper>
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mx-auto">
              <header className="text-center mb-8 lg:mb-10">
                <p
                  className={clsx(
                    "font-extralight uppercase tracking-[0.28em] text-madison-gold-dark",
                    responsiveFontSizeArray(10, 11),
                  )}
                >
                  {heading}
                </p>
                <h1
                  className={clsx(
                    "mt-4 font-tangerine text-gold-gradient leading-[1.02]",
                    responsiveFontSizeArray(40, 60),
                  )}
                >
                  {title}
                </h1>
                <SectionHeadingLine className="mx-auto" />
                <p
                  className={clsx(
                    "mt-4 font-light leading-relaxed text-madison-text-muted",
                    responsiveFontSizeArray(13, 15),
                  )}
                >
                  {subtext}
                </p>
              </header>

              <div className="relative rounded-2xl bg-madison-black-soft p-4 sm:p-6 lg:p-8 border border-madison-border/70 shadow-[0_14px_50px_rgba(0,0,0,0.35)]">
                <ContactForm isSignup={isSignup} />
              </div>
            </div>
          </div>
        </Wrapper>
      </section>

      <ContactInfoSection isSignup={isSignup} />
    </main>
  );
};

export default ContactUs;
