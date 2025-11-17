import React from "react";
import HeroSection from "./components/HeroSection";
import InquiryForm from "./components/InquiryForm";

const HostAParty: React.FC = () => {
  return (
    <div className="w-full bg-white">
      <HeroSection />
      <InquiryForm />
    </div>
  );
};

export default HostAParty;
