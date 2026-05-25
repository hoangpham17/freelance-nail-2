import React from "react";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { SectionTitle } from "@/components/SectionTitle";
import type { AboutUsSection } from "../../types";

type Props = {
  section: AboutUsSection;
  index: number;
};

export const AboutUsChapter: React.FC<Props> = ({ section, index }) => {
  const chapterNum = String(index + 1).padStart(2, "0");
  const reverse = section.position === "right";

  return (
    <article
      id={section.id}
      className={clsx("au-chapter", reverse && "au-chapter--reverse")}
    >
      <div className="au-shell">
        <div className="au-chapter__grid">
          <div className="au-chapter__media">
            {section.image ? (
              <img src={section.image} alt="" />
            ) : null}
          </div>

          <div className="au-chapter__copy">
            <p className="au-chapter__label">
              <span className="au-chapter__label-num">{chapterNum}</span>
              <span>Chapter</span>
            </p>
            <SectionTitle
              html={section.title}
              fontSize={[28, 44]}
              leading="1.12"
              className="au-chapter__title tracking-tight"
            />
            <p
              className={clsx(
                "au-chapter__body",
                responsiveFontSizeArray(15, 17),
              )}
            >
              {section.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
