import React from "react";
import clsx from "clsx";
import { usePolicies } from "@/pages/OurPolicies/usePolicies";
import { withSectionIds } from "@/pages/OurPolicies/utils";
import { useBaseOffset } from "@/hooks/useBaseOffset";
import LoadingPage from "@/components/LoadingPage";
import { PageHeroSection } from "@/components/PageHeroSection";
import { PageDecoLines } from "@/components/PageDecoLines";
import { SectionHeadingLine } from "@/components/SectionHeadingLine";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
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
      className="relative w-full min-h-screen bg-black text-madison-text"
      style={{
        paddingTop: `${mainTopSpacing}px`,
      }}
    >
      {loading && (!policies || policies.length === 0) && <LoadingPage />}

      <PageHeroSection title={(ourPoliciesContent as { hero: { title: string } }).hero.title} flower={3} />

      <div className="relative overflow-hidden bg-black">
        <PageDecoLines variant="our-policies" intensity="strong" />

        <div className="relative z-[2] max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 py-10 lg:py-16">
          {policiesWithId.length > 0 ? (
            <>
              <header className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
                <p
                  className={clsx(
                    "font-extralight uppercase tracking-[0.28em] text-madison-gold-dark",
                    responsiveFontSizeArray(10, 11),
                  )}
                >
                  {(ourPoliciesContent as { header: { accent: string } }).header.accent}
                </p>
                <h2
                  className={clsx(
                    "mt-4 font-tangerine text-gold-gradient tracking-tight",
                    responsiveFontSizeArray(28, 36),
                  )}
                >
                  {(ourPoliciesContent as { header: { title: string } }).header.title}
                </h2>
                <SectionHeadingLine className="mx-auto mt-4" />
                <p
                  className={clsx(
                    "mt-4 font-light leading-relaxed text-madison-text-muted max-w-xl mx-auto",
                    responsiveFontSizeArray(14, 16),
                  )}
                >
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
