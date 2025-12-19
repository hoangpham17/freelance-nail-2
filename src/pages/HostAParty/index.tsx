import React from "react";
import BannerSection from "./components/BannerSection";
import PartyForm from "./components/PartyForm";

const HostAParty: React.FC = () => {
  return (
    <div className="w-full bg-white">
      <BannerSection />
      <PartyForm />
    </div>
  );
};

export default HostAParty;
