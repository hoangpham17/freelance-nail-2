import React, { useRef } from "react";
import { useBaseOffset } from "@/hooks/useBaseOffset";
import { HostPartyDecoLines } from "@/pages/HostAParty/components/HostPartyDecoLines";
import { HostPartyEntryLottie } from "@/components/SubmitSuccessLottie";
import HeroSection from "@/pages/HostAParty/components/HeroSection";
import OccasionsSection from "@/pages/HostAParty/components/OccasionsSection";
import FormSection from "@/pages/HostAParty/components/FormSection";
import "./host-a-party.css";

const HostAParty: React.FC = () => {
  const { mainTopSpacing } = useBaseOffset();
  const formSectionRef = useRef<HTMLElement>(null);

  const scrollToForm = () => {
    if (!formSectionRef.current) return;
    const topOffset =
      formSectionRef.current.getBoundingClientRect().top +
      window.scrollY -
      mainTopSpacing;
    window.scrollTo({ top: topOffset, behavior: "smooth" });
  };

  return (
    <main
      className="host-party-page relative w-full min-h-screen overflow-x-hidden text-madison-text"
      style={{ paddingTop: `${mainTopSpacing}px` }}
      aria-label="Host a party"
    >
      <HostPartyEntryLottie />
      <HeroSection onScrollToForm={scrollToForm} />
      <div className="host-party-content relative">
        <HostPartyDecoLines />
        <OccasionsSection />
        <FormSection sectionRef={formSectionRef} />
      </div>
    </main>
  );
};

export default HostAParty;
