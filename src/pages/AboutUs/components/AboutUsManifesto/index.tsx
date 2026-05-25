import React from "react";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import aboutUsContent from "@/content/aboutUs.json";

type Content = {
  intro: {
    accent: string;
    description: string;
  };
};

export const AboutUsManifesto: React.FC = () => {
  const { intro } = aboutUsContent as Content;

  return (
    <section className="au-manifesto" aria-labelledby="au-manifesto-heading">
      <div className="au-shell">
        <div className="au-manifesto__inner">
          <span className="au-manifesto__mark" aria-hidden>
            M
          </span>
          <div className="au-manifesto__body">
            <p id="au-manifesto-heading" className="au-manifesto__accent">
              {intro.accent}
            </p>
            <p
              className={clsx(
                "au-manifesto__text",
                responsiveFontSizeArray(15, 18),
              )}
            >
              {intro.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
