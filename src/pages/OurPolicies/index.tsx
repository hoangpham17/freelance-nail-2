import React from "react";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { usePolicies } from "@/pages/OurPolicies/usePolicies";
import LoadingPage from "../../components/LoadingPage";
import { useBaseOffset } from "@/hooks/useBaseOffset";
import { parseAirtableRichtext } from "@/shared/utils/richtext";

const OurPolicies: React.FC = () => {
  const { mainTopSpacing } = useBaseOffset();
  const { data: policies, loading } = usePolicies();

  return (
    <main
      className="relative w-full min-h-screen bg-[#F4F6F9]"
      style={{ paddingTop: `${mainTopSpacing}px` }}
    >
      {loading && (!policies || policies.length === 0) && <LoadingPage />}

      <Wrapper className="relative pt-12 lg:pt-20 pb-16 lg:pb-24">
        {/* Background Image - positioned top left, follows wrapper */}
        <div
          className="absolute -top-12 md:-top-[220px] -left-14 md:left-0 w-full max-w-[600px] lg:max-w-[800px] h-[400px] md:h-[600px] lg:h-[800px] pointer-events-none opacity-80 z-0"
          style={{
            backgroundImage: `url(/assets/images/Our-Policies/bg.png)`,
            backgroundSize: "contain",
            backgroundPosition: "top left",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Content */}
        <article className="relative z-10">
          {/* Title Section */}
          <header className="text-center mb-12 lg:mb-16 max-w-[1074px] mx-auto ml-[120px] lg:ml-auto md:translate-x-14">
            <h1
              className={clsx(
                "font-prata text-[#C19A6B]",
                responsiveFontSizeArray(32, 90)
              )}
            >
              Policies of our The Veira Nail Lounge & Spa
            </h1>
          </header>

          {/* List Policy - Grid Layout */}
          <section
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-8 mb-12 lg:mb-16"
            aria-label="Policies list"
          >
            {policies.map((policy) => (
              <article key={policy.id} className="p-6 lg:p-8">
                <h2
                  className={clsx(
                    "font-prata text-[#D1A054] mb-1 lg:mb-2 border-b border-[#D1A054] md:min-h-[96px] md:leading-[42px]",
                    responsiveFontSizeArray(24, 32)
                  )}
                >
                  {policy.title}
                </h2>
                <div
                  className={clsx(
                    "font-light",
                    responsiveFontSizeArray(16, 20)
                  )}
                  dangerouslySetInnerHTML={{
                    __html: parseAirtableRichtext(policy.description),
                  }}
                />
              </article>
            ))}
          </section>

          {/* Thank You Text */}
          <footer className="text-center">
            <p
              className={clsx(
                "italic font-light",
                responsiveFontSizeArray(16, 20)
              )}
            >
              Thank you for your understanding and support of our business.
              <br />
              If you have any questions or concerns, please don't hesitate to
              contact us.
            </p>
          </footer>
        </article>
      </Wrapper>
    </main>
  );
};

export default OurPolicies;
