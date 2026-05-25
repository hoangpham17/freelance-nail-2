import React, { useRef } from "react";
import { useBaseOffset } from "@/hooks/useBaseOffset";
import HeroSection from "./components/HeroSection";
import OccasionsSection from "./components/OccasionsSection";
import FormSection from "./components/FormSection";
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
      <HeroSection onScrollToForm={scrollToForm} />
      <OccasionsSection />
      <FormSection sectionRef={formSectionRef} />
    </main>
  );
};

export default HostAParty;
