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
      <section className="relative w-full py-12 lg:py-16">
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
