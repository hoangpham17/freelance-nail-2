import React from "react";
import MainContentSection from "./components/MainContentSection";
import { Wrapper } from "@/based/components/Wrapper";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full overflow-x-hidden bg-black pb-28 lg:pb-8">
      <MainContentSection />

      <div className="border-t border-madison-border">
        <Wrapper>
          <p className="py-5 text-center font-montserrat text-body-l text-madison-muted">
            Copyright {currentYear} Madison Nail Lounge — All rights reserved
          </p>
        </Wrapper>
      </div>
    </footer>
  );
};

export default Footer;
