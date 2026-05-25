import React from "react";
import { useSearchParams } from "react-router-dom";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { useBaseOffset } from "@/hooks/useBaseOffset";
import { PageHeroSection } from "@/components/PageHeroSection";
import ContactForm from "./components/ContactForm";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import contactUsContent from "@/content/contactUs.json";

const ContactUs: React.FC = () => {
  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get("signup") !== null;
  const { mainTopSpacing } = useBaseOffset();

  return (
    <main
      className="relative w-full min-h-screen"
      style={{
        paddingTop: `${mainTopSpacing}px`,
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #FAF7F5 70%, #FEF5F1 100%)",
      }}
    >
      <PageHeroSection
        title={
          isSignup
            ? (contactUsContent as { hero: { titleSignup: string } }).hero
                .titleSignup
            : (contactUsContent as { hero: { titleContact: string } }).hero
                .titleContact
        }
        flower={1}
      />
      <section className="relative w-full py-8 lg:py-12">
        <Wrapper>
          <div className="max-w-5xl mx-auto">
            {/* <h3
              className={clsx(
                "font-tangerine text-gold-gradient text-center mb-2",
                responsiveFontSizeArray(20, 24),
              )}
            >
              {isSignup
                ? (contactUsContent as { intro: { headingSignup: string } }).intro.headingSignup
                : (contactUsContent as { intro: { headingContact: string } }).intro.headingContact}
            </h3> */}
            <p
              className={clsx(
                "text-[#8A6A4F] font-extralight text-center mb-8 lg:mb-10",
                responsiveFontSizeArray(13, 14),
              )}
            >
              {isSignup
                ? (contactUsContent as { intro: { subtextSignup: string } })
                    .intro.subtextSignup
                : (contactUsContent as { intro: { subtextContact: string } })
                    .intro.subtextContact}
            </p>
            <div
              className="relative rounded-2xl bg-white p-4 sm:p-6 lg:p-8 shadow-[0_4px_24px_rgba(107,74,47,0.06),0_0_0_1px_rgba(237,230,224,0.6)]"
              style={{
                borderLeft: "4px solid #B2866D",
              }}
            >
              <ContactForm isSignup={isSignup} />
            </div>
          </div>
        </Wrapper>
      </section>
    </main>
  );
};

export default ContactUs;
