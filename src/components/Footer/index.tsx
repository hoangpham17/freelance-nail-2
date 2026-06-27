import React from "react";
import MainContentSection from "./components/MainContentSection";
import { Wrapper } from "@/based/components/Wrapper";

const Footer: React.FC = () => {
  const currentYear = 2023;

  return (
    <footer className="relative z-10 w-full overflow-x-hidden bg-black">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-madison-gold/25 to-transparent"
        aria-hidden
      />
      <MainContentSection />

      <div className="border-t border-white/10">
        <Wrapper>
          <p className="py-4 text-center font-montserrat text-body-l text-white/40 lg:py-5">
            Copyright {currentYear} Madison Nail Lounge — All rights reserved
          </p>
        </Wrapper>
      </div>
    </footer>
  );
};

export default Footer;
