import React from "react";
import BannerSection from "./components/BannerSection";
import PartyForm from "./components/PartyForm";

const HostAParty: React.FC = () => {
  return (
    <main className="w-full bg-white">
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
