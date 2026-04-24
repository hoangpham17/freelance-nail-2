import React from "react";
import { usePolicies } from "@/pages/OurPolicies/usePolicies";
import { withSectionIds } from "@/pages/OurPolicies/utils";
import { useBaseOffset } from "@/hooks/useBaseOffset";
import LoadingPage from "@/components/LoadingPage";
import { PageHeroSection } from "@/components/PageHeroSection";
import { ContentBackground } from "./components/ContentBackground";
import { PolicyFooter } from "./components/PolicyFooter";
import { EmptyState } from "./components/EmptyState";
import { PolicyCard } from "./PolicyCard";
import ourPoliciesContent from "@/content/ourPolicies.json";

const OurPolicies: React.FC = () => {
  const { mainTopSpacing } = useBaseOffset();
  const { data: policies, loading } = usePolicies();
  const policiesWithId = React.useMemo(
    () => withSectionIds(policies ?? []),
    [policies],
  );

  return (
    <main
      className="relative w-full min-h-screen"
      style={{
        paddingTop: `${mainTopSpacing}px`,
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 60%, #FEF5F1 100%)",
      }}
    >
      {loading && (!policies || policies.length === 0) && <LoadingPage />}

      <PageHeroSection title={(ourPoliciesContent as { hero: { title: string } }).hero.title} flower={3} />

      <div className="relative overflow-hidden md:overflow-visible">
        <ContentBackground />
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 py-10 lg:py-16">
          {policiesWithId.length > 0 ? (
            <>
              <header className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
                <p className="text-xs tracking-[0.2em] uppercase font-medium text-[#8B6B4A]">
                  {(ourPoliciesContent as { header: { accent: string } }).header.accent}
                </p>
                <h2 className="mt-4 font-playfairDisplay font-bold text-[#2C2520] text-2xl sm:text-3xl lg:text-[2rem] tracking-tight">
                  {(ourPoliciesContent as { header: { title: string } }).header.title}
                </h2>
                <div
                  className="mx-auto mt-4 h-0.5 w-20 rounded-full opacity-90"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #B2866D, transparent)",
                  }}
                  aria-hidden
                />
                <p className="mt-4 text-[#5A4A42] font-light leading-relaxed text-sm sm:text-base max-w-xl mx-auto">
                  {(ourPoliciesContent as { header: { description: string } }).header.description}
                </p>
              </header>

              <section
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
                aria-label="Policies"
              >
                {policiesWithId.map((policy, index) => (
                  <PolicyCard
                    key={policy.id ?? policy.sectionId ?? index}
                    policy={policy}
                    index={index}
                  />
                ))}
              </section>
              <PolicyFooter />
            </>
          ) : (
            !loading && <EmptyState />
          )}
        </div>
      </div>
    </main>
  );
};

export default OurPolicies;
