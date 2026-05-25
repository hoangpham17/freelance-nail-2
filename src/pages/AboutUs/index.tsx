import React from "react";
import { useBaseOffset } from "@/hooks/useBaseOffset";
import LoadingPage from "@/components/LoadingPage";
import { useAboutUs } from "./useAboutUs";
import { AboutUsHero } from "./components/AboutUsHero";
import { AboutUsManifesto } from "./components/AboutUsManifesto";
import { AboutUsChapters } from "./components/AboutUsChapters";
import { AboutUsClosing } from "./components/AboutUsClosing";
import "./about-us.css";

const AboutUs: React.FC = () => {
  const { mainTopSpacing } = useBaseOffset();
  const { data: sections, loading } = useAboutUs();

  return (
    <main
      className="au-page relative w-full min-h-screen overflow-x-hidden"
      style={{ paddingTop: `${mainTopSpacing}px` }}
    >
      {loading && sections.length === 0 && <LoadingPage />}

      <AboutUsHero />
      <AboutUsManifesto />

      {sections.length > 0 && <AboutUsChapters sections={sections} />}

      <AboutUsClosing />
    </main>
  );
};

export default AboutUs;
