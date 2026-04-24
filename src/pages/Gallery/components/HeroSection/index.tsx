import React from "react";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#FEFBF9] overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #E8DED8 0%, transparent 50%)`,
        }}
      />
      <Wrapper className="relative z-[2] py-8 lg:py-12">
        <div className="max-w-[900px] mx-auto text-center">
          <h1 className="relative">
            <span
              className={clsx(
                "block font-playfairDisplay font-bold text-[#6B4A2F] tracking-tight leading-[0.92]",
                responsiveFontSizeArray(48, 96),
              )}
            >
              Gallery
            </span>
          </h1>
          <div
            className="mt-4 lg:mt-6 h-px w-24 mx-auto"
            style={{
              background: "linear-gradient(90deg, #B2866D 0%, transparent 100%)",
            }}
          />
          <p
            className={clsx(
              "text-[#8A6A4F] font-extralight uppercase tracking-[0.25em] mt-4 lg:mt-6",
              responsiveFontSizeArray(10, 11),
            )}
          >
            The Veira Nail Lounge & Spa
          </p>
        </div>
      </Wrapper>
    </section>
  );
};
