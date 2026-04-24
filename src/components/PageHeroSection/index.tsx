import React from "react";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import SvgIcon from "@/based/SvgIcon";
import { DecorItem } from "@/components/DecorItem";
import { useScreen } from "@/hooks/useScreen";

const FLOWER_SRC = {
  1: "/assets/images/HomePage/flower-1.svg",
  2: "/assets/images/HomePage/flower-2.svg",
  3: "/assets/images/HomePage/flower-3.svg",
} as const;

/** Background decor — shapes + flower, dùng chung cho hero các page */
const HeroBackground: React.FC<{ flower: 1 | 2 | 3 }> = ({ flower }) => {
  const { isDesktop } = useScreen();
  return (
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-full h-full z-[1] max-w-[1920px] pointer-events-none">
      <SvgIcon
        src="/assets/images/HomePage/shape-1.svg"
        ariaLabel=""
        width={isDesktop ? 420 : 280}
        height={isDesktop ? 280 : 180}
        className="shrink-0 text-[#E8D6C9] absolute lg:top-[5%] top-2 lg:-left-[8%] -left-[20%] opacity-70"
      />
      <DecorItem
        isMovingWhenScroll
        width={isDesktop ? 200 : 120}
        height={isDesktop ? 220 : 140}
        className="top-1 lg:right-[15%] right-0"
      >
        <SvgIcon
          src={FLOWER_SRC[flower]}
          ariaLabel=""
          width={isDesktop ? 200 : 120}
          height={isDesktop ? 220 : 140}
          className="shrink-0 text-[#805D3D40] max-md:opacity-50"
        />
      </DecorItem>
    </div>
  );
};

export interface PageHeroSectionProps {
  title: string;
  subtitle?: string;
  /** Flower decor: 1 | 2 | 3 (default 3) */
  flower?: 1 | 2 | 3;
}

export const PageHeroSection: React.FC<PageHeroSectionProps> = ({
  title,
  flower = 3,
}) => {
  return (
    <section className="relative w-full bg-[#FEFBF9] overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #E8DED8 0%, transparent 70%)`,
        }}
      />
      <HeroBackground flower={flower} />
      <Wrapper className="relative z-[2] py-8 lg:py-12">
        <div className="max-w-[900px] mx-auto text-center">
          <h1 className="relative">
            <span
              className={clsx(
                "block font-playfairDisplay font-bold text-[#6B4A2F] leading-[0.92]",
                responsiveFontSizeArray(48, 96),
              )}
            >
              {title}
            </span>
          </h1>
          {/* <div
            className="mt-4 lg:mt-6 h-px w-24 mx-auto"
            style={{
              background:
                "linear-gradient(90deg, #B2866D 0%, transparent 100%)",
            }}
          /> */}
          {/* <p
            className={clsx(
              "text-[#8A6A4F] font-extralight uppercase tracking-[0.25em] mt-4 lg:mt-6",
              responsiveFontSizeArray(10, 11),
            )}
          >
            {subtitle}
          </p> */}
        </div>
      </Wrapper>
    </section>
  );
};
