import React from "react";
import type { AboutUsSection } from "../../types";
import { AboutSection } from "../AboutSection";
import { AboutFooter } from "../AboutFooter";

type Props = {
  sections: AboutUsSection[];
};

export const SectionList: React.FC<Props> = ({ sections }) => {
  return (
    <article className="flex-1 min-w-0 max-w-[1000px] mx-auto lg:pt-0">
      <div className="space-y-0" aria-label="About us sections">
        {sections.map((section, index) => (
          <AboutSection
            key={section.id}
            section={section}
            index={index}
            totalCount={sections.length}
          />
        ))}
      </div>
      <AboutFooter />
    </article>
  );
};
