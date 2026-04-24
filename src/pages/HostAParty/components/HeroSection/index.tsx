import React from "react";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { useScreen } from "@/hooks/useScreen";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { HERO_IMAGE } from "../../constants";
import hostAPartyContent from "@/content/hostAParty.json";

export interface HeroSectionProps {
  onScrollToForm: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToForm }) => {
  const { isDesktop } = useScreen();

  return (
    <section className="relative w-full bg-[#FEFBF9] overflow-hidden">
      <Wrapper className="xl:!px-36">
        <div
          className={clsx(
            "w-full grid",
            isDesktop
              ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-0"
              : "",
          )}
        >
          <div
            className={clsx(
              "flex flex-col justify-center py-5 lg:py-10",
              isDesktop ? "" : "order-2 text-center",
            )}
          >
            <h1
              className={clsx(
                "font-playfairDisplay font-bold text-[#6B4A2F] tracking-tight pt-0.5 pb-0.5",
                "leading-[1.2]",
                isDesktop
                  ? "text-[clamp(2.25rem,3.8vw,3.5rem)]"
                  : "text-3xl sm:text-4xl",
              )}
            >
              <span className="block">{(hostAPartyContent as { hero: { titleLine1: string } }).hero.titleLine1}</span>
              <span
                className="block mt-1 pt-0.5"
                style={{
                  color: "#C75B7A",
                  background:
                    "linear-gradient(135deg, #B84A65 0%, #C75B7A 50%, #D96B8A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {(hostAPartyContent as { hero: { titleLine2: string } }).hero.titleLine2}
              </span>
            </h1>
            <div
              className="mt-4 lg:mt-6 h-px w-24 lg:mr-auto max-lg:mx-auto"
              style={{
                background:
                  "linear-gradient(90deg, #B2866D 0%, transparent 100%)",
              }}
            />
            <p
              className={clsx(
                "text-[#8A6A4F] font-light leading-[1.7] mt-4 lg:mt-5 max-w-md",
                responsiveFontSizeArray(15, 16),
                !isDesktop && "mx-auto",
              )}
            >
              {(hostAPartyContent as { hero: { description: string } }).hero.description}
            </p>
            <div
              className={clsx(
                "flex flex-wrap gap-3 mt-6 lg:mt-8",
                !isDesktop && "justify-center",
              )}
            >
              <button
                type="button"
                onClick={onScrollToForm}
                className="px-6 py-3 rounded-full font-medium text-white text-sm lg:text-base transition-all hover:opacity-90 shadow-md"
                style={{
                  background:
                    "linear-gradient(135deg, #6B4A2F 0%, #805D3D 100%)",
                }}
              >
                {(hostAPartyContent as { hero: { ctaPlan: string } }).hero.ctaPlan}
              </button>
              <a
                href="/services"
                className="px-6 py-3 rounded-full font-medium text-[#6B4A2F] text-sm lg:text-base bg-white border-2 border-[#E8DED8] hover:border-[#B2866D] hover:bg-[#FEFBF9] transition-all"
              >
                {(hostAPartyContent as { hero: { ctaBrowse: string } }).hero.ctaBrowse}
              </a>
            </div>
          </div>

          <div
            className={clsx(
              "relative min-w-0 flex",
              isDesktop
                ? "py-6 pl-4 lg:pl-6 justify-end"
                : "order-1 py-5 justify-center",
            )}
          >
            <div className="overflow-hidden bg-[#F5EFE9] shadow-lg w-fit rounded-2xl">
              <img
                src={HERO_IMAGE}
                alt={(hostAPartyContent as { hero: { heroImageAlt: string } }).hero.heroImageAlt}
                className={clsx(
                  "block w-auto object-contain object-center",
                  isDesktop
                    ? "max-h-[420px] lg:max-h-[500px]"
                    : "max-h-[300px] sm:max-h-[340px]",
                )}
              />
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default HeroSection;
