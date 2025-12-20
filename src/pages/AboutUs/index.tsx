import React from "react";
import { Wrapper } from "@/based/components/Wrapper";
import { aboutUsData } from "./data";
import AboutUsSection from "./components/AboutUsSection";

const AboutUs: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen">
      <Wrapper className="relative pt-8 lg:pt-16 pb-12 lg:pb-20">
        <div className="flex justify-center mb-8 lg:mb-16">
          <img
            src={aboutUsData.titleImage}
            alt="About Us"
            className="w-full max-w-[600px] lg:max-w-[800px] h-auto"
          />
        </div>
        <div className="space-y-6 lg:space-y-8">
          {aboutUsData.sections.map((section) => (
            <AboutUsSection key={section.id} section={section} />
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default AboutUs;
