import React from "react";
import WelcomeSection from "./components/WelcomeSection";
import MainContentSection from "./components/MainContentSection";
import { Background } from "./components/Background";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#FEF5F1] relative z-10 overflow-hidden max-lg:pt-8">
      <Background />
      {/* Top Section - Welcome & Hours */}
      <WelcomeSection />

      {/* Main Bar Section */}
      <MainContentSection />

      {/* Copyright Bar */}
      <div className="bg-[#E8D6C9] text-[#4A3A2F] text-center py-2 md:py-3 text-[11px] md:text-[13px] tracking-[0.05em]">
        Copyright © {currentYear} The Veira Nail Lounge & Spa
      </div>
    </footer>
  );
};

export default Footer;
