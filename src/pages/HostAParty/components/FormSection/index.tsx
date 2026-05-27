import React from "react";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import PartyForm from "../PartyForm";
import hostAPartyContent from "@/content/hostAParty.json";
import HostPartySection from "../HostPartySection";

export interface FormSectionProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

const FormSection: React.FC<FormSectionProps> = ({ sectionRef }) => {
  const formSection = (
    hostAPartyContent as {
      formSection: { accent: string; title: string; subtext: string };
    }
  ).formSection;

  return (
    <HostPartySection
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="party-inquiry"
      className="host-party-form"
      aria-label="Party inquiry form"
    >
      <div className="host-party-divider" aria-hidden />

      <div className="host-party-form__grid">
        <header className="host-party-form__intro">
          <p
            className={clsx(
              "font-extralight uppercase tracking-[0.28em] text-madison-gold-dark",
              responsiveFontSizeArray(10, 11),
            )}
          >
            {formSection.accent}
          </p>
          <h2
            className={clsx(
              "font-tangerine text-gold-gradient leading-[1.05]",
              responsiveFontSizeArray(30, 44),
            )}
          >
            {formSection.title}
          </h2>
          <p
            className={clsx(
              "font-light leading-relaxed text-madison-muted",
              responsiveFontSizeArray(13, 15),
            )}
          >
            {formSection.subtext}
          </p>
        </header>

        <div className="host-party-form__panel">
          <PartyForm />
        </div>
      </div>
    </HostPartySection>
  );
};

export default FormSection;
