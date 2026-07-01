import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useBaseOffset } from "@/hooks/useBaseOffset";
import LoadingPage from "@/components/LoadingPage";
import { PageDecoLines } from "@/components/PageDecoLines";
import { OrnamentalDivider } from "@/components/OrnamentalDivider";
import { SectionHeadingLine } from "@/components/SectionHeadingLine";
import { SectionTitle } from "@/components/SectionTitle";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { PATHS } from "@/routes/Routes";
import { useAboutUs } from "./useAboutUs";
import { useTimelineScrollGlow } from "./useTimelineScrollGlow";
import type { AboutUsSection } from "./types";
import { aboutUsContent, ABOUT_US_HERO_IMAGE } from "./content";
import "./about-us.css";

const Milestone: React.FC<{
  section: AboutUsSection;
  index: number;
}> = ({ section, index }) => {
  const isRight = section.position === "right" || index % 2 === 1;

  return (
    <article
      className={clsx(
        "au-milestone",
        isRight ? "au-milestone--right" : "au-milestone--left",
      )}
    >
      <span className="au-milestone__dot" aria-hidden />
      <div className="au-milestone__media min-w-0">
        {section.image ? (
          <img src={section.image} alt="" loading="lazy" />
        ) : null}
      </div>
      <div className="au-milestone__copy min-w-0">
        <span className="au-milestone__glow" aria-hidden />
        <p className="au-milestone__index">
          {String(index + 1).padStart(2, "0")}
        </p>
        <SectionTitle html={section.title} fontSize={[24, 36]} leading="1.15" />
        <p
          className={clsx(
            "au-milestone__body",
            responsiveFontSizeArray(14, 16),
          )}
        >
          {section.description}
        </p>
      </div>
    </article>
  );
};

const AboutUs: React.FC = () => {
  const { mainTopSpacing } = useBaseOffset();
  const { hero, intro, closing } = aboutUsContent;
  const { data: sections, loading } = useAboutUs();
  const { trackRef, lineRef, glowRef } = useTimelineScrollGlow(
    sections.length > 0,
  );

  return (
    <main
      className="au-page relative w-full min-h-screen"
      style={{ paddingTop: `${mainTopSpacing}px` }}
    >
      {loading && sections.length === 0 && <LoadingPage />}

      <header className="au-hero" data-au-section="hero">
        <div className="au-hero__bg" aria-hidden>
          <img src={ABOUT_US_HERO_IMAGE} alt="" />
          <div className="au-hero__veil" />
          <div className="au-hero__scrim" />
        </div>
        <div className="au-hero__content">
          <span className="au-hero__eyebrow">{hero.eyebrow}</span>
          <h1 className="font-tangerine leading-[0.95]">
            <span
              className={clsx(
                "block text-gold-gradient",
                responsiveFontSizeArray(38, 96),
              )}
            >
              {hero.title}
            </span>
          </h1>
          <SectionHeadingLine className="mx-auto mt-4" />
          <p className={clsx("au-hero__lead", responsiveFontSizeArray(16, 20))}>
            {hero.lead}
          </p>
        </div>
      </header>

      <div className="au-content relative">
        <PageDecoLines variant="about-us" intensity="strong" />

        <section className="au-intro" data-au-section="intro">
          <div className="au-intro__inner">
            <p className="au-intro__accent">{intro.accent}</p>
            <p
              className={clsx(
                "au-intro__text",
                responsiveFontSizeArray(14, 17),
              )}
            >
              {intro.description}
            </p>
          </div>
          {sections.length > 0 && (
            <div className="au-divider" aria-hidden>
              <OrnamentalDivider className="mx-auto" />
            </div>
          )}
        </section>

        {sections.length > 0 && (
          <section className="au-timeline" data-au-section="chapters">
            <div className="au-timeline__track" ref={trackRef}>
              <div className="au-timeline__line" ref={lineRef} aria-hidden>
                <span className="au-timeline__glow" ref={glowRef} aria-hidden>
                  <span className="au-timeline__glow-beam" aria-hidden />
                  <span className="au-timeline__glow-diamond" aria-hidden />
                </span>
              </div>
              {sections.map((section, index) => (
                <Milestone key={section.id} section={section} index={index} />
              ))}
            </div>
          </section>
        )}

        <footer className="au-closing" data-au-section="closing">
          <div className="au-closing__inner">
            <p className="au-closing__quote">{closing.quote}</p>
            <Link to={PATHS.contactUs} className="au-closing__cta">
              Get in touch
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default AboutUs;
