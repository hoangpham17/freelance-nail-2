import React from "react";
import BannerSection from "./components/BannerSection";
import PartyForm from "./components/PartyForm";
import { useBaseOffset } from "@/hooks/useBaseOffset";

const HostAParty: React.FC = () => {
  const { mainTopSpacing } = useBaseOffset();
  return (
    <main
      className="w-full bg-white"
      style={{ paddingTop: `${mainTopSpacing}px` }}
    >
      <article>
        <BannerSection />
        <section aria-label="Party booking form">
          <PartyForm />
        </section>
      </article>
    </main>
  );
};

export default HostAParty;
