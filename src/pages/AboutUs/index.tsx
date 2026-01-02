import React from "react";
import { Wrapper } from "@/based/components/Wrapper";
import { aboutUsData } from "./data";
import AboutUsSection from "./components/AboutUsSection";
import { useBaseOffset } from "@/hooks/useBaseOffset";

const AboutUs: React.FC = () => {
  const { mainTopSpacing } = useBaseOffset();
  return (
    <main
      className="relative w-full"
      style={{ paddingTop: `${mainTopSpacing}px` }}
    >
      <Wrapper className="relative pt-8 lg:pt-16 pb-12 lg:pb-20">
        <article>
          <header className="flex justify-center mb-8 lg:mb-16">
            <img
              src={aboutUsData.titleImage}
              alt="About Us"
              className="w-full max-w-[600px] lg:max-w-[800px] h-auto"
            />
          </header>
          <div className="space-y-6 lg:space-y-8">
            {aboutUsData.sections.map((section) => (
              <section key={section.id}>
                <AboutUsSection section={section} />
              </section>
            ))}
          </div>
        </article>
      </Wrapper>
    </main>
  );
};

export default AboutUs;
