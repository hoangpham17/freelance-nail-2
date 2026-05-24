import React from "react";
import clsx from "clsx";
import { useBaseOffset } from "@/hooks/useBaseOffset";
import LoadingPage from "@/components/LoadingPage";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { useScreen } from "@/hooks/useScreen";
import { useAboutUs } from "./useAboutUs";
import { ContentBackground } from "./components/ContentBackground";
import { SectionList } from "./components/SectionList";
import aboutUsContent from "@/content/aboutUs.json";

const AboutUs: React.FC = () => {
  const { mainTopSpacing } = useBaseOffset();
  const { data: sections, loading } = useAboutUs();
  const { isDesktop } = useScreen();

  return (
    <main
      className="relative w-full min-h-screen"
      style={{
        paddingTop: `${mainTopSpacing}px`,
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 60%, #FEF5F1 100%)",
      }}
    >
      {loading && sections.length === 0 && <LoadingPage />}

      {/* Banner Section (match Services style) */}
      <section className="relative w-full overflow-hidden px-4 md:px-6 lg:px-12 py-8 lg:py-12">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(/assets/images/AboutUs/banner.png)`,
            backgroundSize: isDesktop ? "cover" : "cover",
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-0">
          <h1 className="relative">
            <span
              className={clsx(
                "block text-gold-gradient font-tangerine leading-[0.92]",
                responsiveFontSizeArray(48, 96),
              )}
            >
              {(aboutUsContent as { banner: { title: string } }).banner.title}
            </span>
          </h1>
          {/* <div
            className="mt-4 lg:mt-6 h-px w-24 mx-auto"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.9) 0%, transparent 100%)",
            }}
          />
          <p
            className={clsx(
              "text-white/90 font-extralight uppercase tracking-[0.25em] mt-4 lg:mt-6",
              responsiveFontSizeArray(10, 11),
            )}
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.2)" }}
          >
            Madison Nail Lounge
          </p> */}
        </div>
      </section>

      <div className="relative overflow-hidden md:overflow-visible">
        <ContentBackground />
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 py-6 lg:py-10">
          {sections.length > 0 && <SectionList sections={sections} />}
        </div>
      </div>
    </main>
  );
};

export default AboutUs;
