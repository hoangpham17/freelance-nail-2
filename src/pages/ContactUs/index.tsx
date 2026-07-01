import React from "react";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { useBaseOffset } from "@/hooks/useBaseOffset";
import ContactForm from "./components/ContactForm";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import contactUsContent from "@/content/contactUs.json";
import { SectionHeadingLine } from "@/components/SectionHeadingLine";
import { PageDecoLines } from "@/components/PageDecoLines";

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
      className="relative w-full min-h-screen text-madison-text"
      style={{
        paddingTop: `${mainTopSpacing}px`,
        background: `linear-gradient(180deg, transparent 0, transparent max(0%, calc(100% - 22rem)), rgba(0, 0, 0, 0.4) max(0%, calc(100% - 14rem)), rgba(0, 0, 0, 0.78) max(0%, calc(100% - 7rem)), #000000 100%), var(--madison-section-gradient)`,
      }}
    >
      <PageDecoLines variant="contact" />

      <section className="relative z-[2] w-full py-12 lg:py-16">
        <div className="max-w-[1440px] 2xl:max-w-[1680px] mx-auto px-4 md:px-8 lg:px-12 xl:px-[90px]">
          <div className="mx-auto w-full max-w-[960px]">
            <header className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
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
                  responsiveFontSizeArray(32, 60, {
                    sm: 43,
                    md: 45,
                    lg: 48,
                    xl: 52,
                  }),
                )}
              >
                {title}
              </h1>
              <SectionHeadingLine className="mx-auto mt-4" />
              <p
                className={clsx(
                  "mt-3 font-light leading-relaxed text-madison-muted max-w-xl mx-auto",
                  responsiveFontSizeArray(13, 16, {
                    sm: 14,
                    md: 15,
                    lg: 15,
                    xl: 15,
                  }),
                )}
              >
                {subtext}
              </p>
            </header>

            <div className="relative rounded-[20px] bg-black/90 border border-gray-700/45 p-6 lg:p-8">
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-madison-gold via-madison-gold-dark to-transparent"></div>
              <ContactForm isSignup={isSignup} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;
