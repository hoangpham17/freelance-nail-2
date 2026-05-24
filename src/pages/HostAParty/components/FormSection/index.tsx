import React from "react";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import PartyForm from "../PartyForm";
import hostAPartyContent from "@/content/hostAParty.json";

export interface FormSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

const FormSection: React.FC<FormSectionProps> = ({ sectionRef }) => {
  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-14 lg:py-20 pb-20"
      style={{
        background:
          "linear-gradient(180deg, #FAF7F5 0%, #FAF7F5 50%, #FEF5F1 100%)",
      }}
    >
      <Wrapper className="relative">
        <div className="max-w-5xl mx-auto">
          <div
            className="relative rounded-2xl bg-white p-6 sm:p-8 lg:p-10 shadow-[0_25px_50px_-12px_rgba(107,74,47,0.12),0_0_0_1px_rgba(237,230,224,0.5)]"
            style={{ borderLeft: "5px solid #B2866D" }}
          >
            <p
              className={clsx(
                "text-[#8A6A4F] font-extralight uppercase tracking-[0.2em] text-center mb-2",
                responsiveFontSizeArray(10, 11),
              )}
            >
              {(hostAPartyContent as { formSection: { accent: string } }).formSection.accent}
            </p>
            <h2
              className={clsx(
                "font-tangerine text-gold-gradient text-center mb-3",
                responsiveFontSizeArray(24, 28),
              )}
            >
              {(hostAPartyContent as { formSection: { title: string } }).formSection.title}
            </h2>
            <p
              className={clsx(
                "text-[#8A6A4F] font-light text-center mb-8",
                responsiveFontSizeArray(13, 14),
              )}
            >
              {(hostAPartyContent as { formSection: { subtext: string } }).formSection.subtext}
            </p>
            <PartyForm />
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default FormSection;
