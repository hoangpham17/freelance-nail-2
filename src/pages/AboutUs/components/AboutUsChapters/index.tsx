import React from "react";
import type { AboutUsSection } from "../../types";
import { AboutUsChapter } from "../AboutUsChapter";

type Props = {
  sections: AboutUsSection[];
};

export const AboutUsChapters: React.FC<Props> = ({ sections }) => {
  return (
    <div className="au-chapters" aria-label="Our story">
      {sections.map((section, index) => (
        <AboutUsChapter key={section.id} section={section} index={index} />
      ))}
    </div>
  );
};
