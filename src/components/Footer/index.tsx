import React from "react";
import MainContentSection from "./components/MainContentSection";
import { Wrapper } from "@/based/components/Wrapper";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full overflow-x-hidden border-t border-madison-border bg-black">
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
