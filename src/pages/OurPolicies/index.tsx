import React, { useMemo } from "react";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { PolicyItem } from "./types";
import { useAirtable } from "@/hooks/useAirtable";
import { AIRTABLE_ENDPOINTS } from "@/services/airtable.service";

const OurPolicies: React.FC = () => {
  const { data: policiesData, loading } = useAirtable<PolicyItem>(
    AIRTABLE_ENDPOINTS.policies
  );

  // Sort policies by order field
  const policies = useMemo(() => {
    if (!policiesData) return [];
    return [...policiesData].sort((a, b) => {
      const orderA = a.order ?? 0;
      const orderB = b.order ?? 0;
      return orderA - orderB;
    });
  }, [policiesData]);
  return (
    <div className="relative w-full min-h-screen bg-[#F4F6F9]">
      <Wrapper className="relative pt-12 lg:pt-20 pb-16 lg:pb-24">
        {/* Background Image - positioned top left, follows wrapper */}
        <div
          className="absolute -top-12 md:top-0 -left-14 md:left-0 w-full max-w-[600px] lg:max-w-[800px] h-[400px] lg:h-[600px] pointer-events-none opacity-80 z-0"
          style={{
            backgroundImage: `url(/assets/images/Our-Policies/bg.png)`,
            backgroundSize: "contain",
            backgroundPosition: "top left",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Title Section */}
          <div className="text-center mb-12 lg:mb-16 max-w-[1074px] mx-auto ml-[120px] lg:ml-auto">
            <h1
              className={clsx(
                "font-prata text-[#C19A6B]",
                responsiveFontSizeArray(32, 90)
              )}
            >
              Policies of our The Veira Nail Lounge & Spa
            </h1>
          </div>

          {/* List Policy - Grid Layout */}
          {loading ? (
            <div className="text-center py-12">
              <p
                className={clsx(
                  "text-[#494747]",
                  responsiveFontSizeArray(14, 16)
                )}
              >
                Loading policies...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
              {policies.map((policy) => (
                <div key={policy.id} className="p-6 lg:p-8">
                  <h3
                    className={clsx(
                      "font-prata text-[#D1A054] mb-1 lg:mb-2 border-b border-[#D1A054] md:min-h-[96px] md:leading-[42px]",
                      responsiveFontSizeArray(24, 32)
                    )}
                  >
                    {policy.title}
                  </h3>
                  <p
                    className={clsx(
                      "font-light",
                      responsiveFontSizeArray(16, 20)
                    )}
                  >
                    {policy.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Thank You Text */}
          <div className="text-center">
            <p
              className={clsx(
                "text-[#494747] leading-relaxed",
                responsiveFontSizeArray(14, 18)
              )}
            >
              Thank you for your understanding and support of our business.
              <br />
              If you have any questions or concerns, please don't hesitate to
              contact us.
            </p>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default OurPolicies;
