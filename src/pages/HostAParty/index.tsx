import React, { useRef } from "react";
import { useBaseOffset } from "@/hooks/useBaseOffset";
import ConfettiLottie from "./components/ConfettiLottie";
import HeroSection from "./components/HeroSection";
import OccasionsSection from "./components/OccasionsSection";
import FormSection from "./components/FormSection";

const HostAParty: React.FC = () => {
  const { mainTopSpacing } = useBaseOffset();
  const formSectionRef = useRef<HTMLElement>(null);

  const scrollToForm = () => {
    if (formSectionRef.current) {
      const topOffset =
        formSectionRef.current.getBoundingClientRect().top +
        window.scrollY -
        mainTopSpacing;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <main
      className="relative w-full min-h-screen overflow-x-hidden"
      style={{
        paddingTop: `${mainTopSpacing}px`,
        background: "#FEFBF9",
      }}
    >
      <ConfettiLottie />
      <HeroSection onScrollToForm={scrollToForm} />
      <OccasionsSection />
      <FormSection sectionRef={formSectionRef} />
    </main>
  );
};

export default HostAParty;
