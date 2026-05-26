import React from "react";
import { useSearchParams } from "react-router-dom";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { useBaseOffset } from "@/hooks/useBaseOffset";
import { PageHeroSection } from "@/components/PageHeroSection";
import ContactForm from "./components/ContactForm";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import contactUsContent from "@/content/contactUs.json";
import { SectionHeadingLine } from "@/components/SectionHeadingLine";
import { ContactInfoSection } from "@/pages/ContactUs/components/ContactInfoSection";

const ContactUs: React.FC = () => {
  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get("signup") !== null;
  const { mainTopSpacing } = useBaseOffset();

  return (
    <main
      className="relative w-full min-h-screen madison-section-gradient"
      style={{
        paddingTop: `${mainTopSpacing}px`,
      }}
    >
      {!isSignup && (
        <PageHeroSection
          title={
            (contactUsContent as { hero: { titleContact: string } }).hero
              .titleContact
          }
          flower={1}
        />
      )}
      <section className="relative w-full py-10 lg:py-14">
        <Wrapper>
          <div className="max-w-6xl mx-auto">
            {isSignup ? (
              <div className="max-w-2xl mx-auto">
                <header className="text-center mb-8 lg:mb-10">
                  <p
                    className={clsx(
                      "font-extralight uppercase tracking-[0.28em] text-madison-gold-dark",
                      responsiveFontSizeArray(10, 11),
                    )}
                  >
                    {(contactUsContent as { intro: { headingSignup: string } })
                      .intro.headingSignup}
                  </p>
                  <h1
                    className={clsx(
                      "mt-4 font-tangerine text-gold-gradient leading-[1.02]",
                      responsiveFontSizeArray(40, 60),
                    )}
                  >
                    {(contactUsContent as { hero: { titleSignup: string } }).hero
                      .titleSignup}
                  </h1>
                  <SectionHeadingLine className="mx-auto" />
                  <p
                    className={clsx(
                      "mt-4 font-light leading-relaxed text-madison-text-muted",
                      responsiveFontSizeArray(13, 15),
                    )}
                  >
                    {(contactUsContent as { intro: { subtextSignup: string } })
                      .intro.subtextSignup}
                  </p>
                </header>

                <div className="relative rounded-2xl bg-madison-black-soft p-4 sm:p-6 lg:p-8 border border-madison-border/70 shadow-[0_14px_50px_rgba(0,0,0,0.35)]">
                  <ContactForm isSignup />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                <header className="lg:col-span-5 text-center lg:text-left">
                  <p
                    className={clsx(
                      "font-extralight uppercase tracking-[0.28em] text-madison-gold-dark",
                      responsiveFontSizeArray(10, 11),
                    )}
                  >
                    {
                      (
                        contactUsContent as {
                          intro: { headingContact: string };
                        }
                      ).intro.headingContact
                    }
                  </p>
                  <h2
                    className={clsx(
                      "mt-4 font-tangerine text-gold-gradient leading-[1.05]",
                      responsiveFontSizeArray(30, 44),
                    )}
                  >
                    {
                      (
                        contactUsContent as {
                          hero: { titleContact: string };
                        }
                      ).hero.titleContact
                    }
                  </h2>
                  <SectionHeadingLine className="mx-auto lg:mx-0" />
                  <p
                    className={clsx(
                      "mt-4 font-light leading-relaxed text-madison-text-muted",
                      responsiveFontSizeArray(13, 15),
                    )}
                  >
                    {
                      (
                        contactUsContent as {
                          intro: { subtextContact: string };
                        }
                      ).intro.subtextContact
                    }
                  </p>
                </header>

                <div className="lg:col-span-7">
                  <div className="relative rounded-2xl bg-madison-black-soft p-4 sm:p-6 lg:p-8 border border-madison-border/70 shadow-[0_14px_50px_rgba(0,0,0,0.35)]">
                    <ContactForm isSignup={false} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Wrapper>
      </section>

      <ContactInfoSection isSignup={isSignup} />
    </main>
  );
};

export default ContactUs;
