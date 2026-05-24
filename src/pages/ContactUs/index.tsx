import React from "react";
import { useSearchParams } from "react-router-dom";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { useBaseOffset } from "@/hooks/useBaseOffset";
import { useScreen } from "@/hooks/useScreen";
import { PageHeroSection } from "@/components/PageHeroSection";
import ContactForm from "./components/ContactForm";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import SvgIcon from "@/based/SvgIcon";
import { DecorItem } from "@/components/DecorItem";
import contactUsContent from "@/content/contactUs.json";

const ContactUs: React.FC = () => {
  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get("signup") !== null;
  const { mainTopSpacing } = useBaseOffset();
  const { isDesktop } = useScreen();

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
      <section className="relative w-full py-8 lg:py-12 overflow-hidden">
        <SvgIcon
          src="/assets/images/HomePage/shape-1.svg"
          ariaLabel=""
          width={isDesktop ? 260 : 160}
          height={isDesktop ? 170 : 100}
          className="absolute z-0 pointer-events-none text-[#E8D6C9] opacity-50 -right-[8%] lg:-right-[4%] top-8"
        />
        <DecorItem
          isMovingWhenScroll
          width={isDesktop ? 120 : 75}
          height={isDesktop ? 130 : 82}
          className="z-0 bottom-20 right-10"
        >
          <SvgIcon
            src="/assets/images/HomePage/flower-3.svg"
            ariaLabel=""
            width={isDesktop ? 200 : 130}
            height={isDesktop ? 200 : 130}
            className="shrink-0 text-[#805D3D35] opacity-60"
          />
        </DecorItem>
        <Wrapper className="relative z-10">
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
