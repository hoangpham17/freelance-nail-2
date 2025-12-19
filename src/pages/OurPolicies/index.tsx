import React from "react";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { PolicyItem } from "./types";

const policies: PolicyItem[] = [
  {
    title: "Service Guarantee",
    content:
      "We guarantee our services, excluding regular nail polish, for a period of 7 days. Repairs must match the original service color, and customers could help provide the name of the staff member who performed the original service.",
    icon: null,
  },
  {
    title: "Appointment Policy",
    content:
      "If you arrive more than 10 minutes late, we reserve the right to serve the next customer. You may wait for the next available nail technician.",
    icon: null,
  },
  {
    title: "Customer Health and Special Needs",
    content:
      "Please inform our staff of any medical conditions, allergies, or special needs that may affect your service.",
    icon: null,
  },
  {
    title: "Safety and Responsibility",
    content:
      "We are NOT responsible for lost or stolen items. Please keep all belongings with you. For the safety of all customers, children must remain with their parents. We are not liable for any injuries that may occur.",
    icon: null,
  },
  {
    title: "Pricing and Accepted Payment Methods",
    content:
      "Prices are subject to change without prior notice. We do NOT accept checks for any transactions.",
    icon: null,
  },
  {
    title: "Refunds and Exchanges",
    content: "We do NOT offer refunds or exchanges for any services rendered.",
    icon: null,
  },
  {
    title: "Gift Card Policy",
    content:
      "Please note that gift cards must be purchased directly from Madison Nail Lounge. We do NOT accept gift cards from third-party vendors due to fraudulent credit cards and online activity. Gift cards should be treated like cash and presented at the time of service. They are NOT redeemable or refundable for cash or credit. We are NOT liable for lost, damaged, or stolen gift cards.",
    icon: null,
  },
  {
    title: "Toenail Cutting Policy",
    content:
      "We do NOT provide services for ingrown toenails and recommend consulting a healthcare professional for any related concerns. Please note that we are not liable for any issues arising from ingrown toenails. If you experience any discomfort during your service, kindly inform our staff.",
    icon: null,
  },
  {
    title: "Right to Refuse Service",
    content: "We reserve the right to refuse service to anyone.",
    icon: null,
  },
];

const OurPolicies: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-white">
      <Wrapper className="relative pt-12 lg:pt-20 pb-16 lg:pb-24">
        {/* Background Image - positioned top left, follows wrapper */}
        <div
          className="absolute top-0 left-0 w-full max-w-[600px] lg:max-w-[800px] h-[400px] lg:h-[600px] pointer-events-none opacity-30 lg:opacity-40 z-0"
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
          <div className="text-center mb-12 lg:mb-16">
            <h1
              className={clsx(
                "font-prata font-bold text-[#C19A6B] leading-tight",
                responsiveFontSizeArray(32, 56)
              )}
            >
              Policies of our The Veira Nail Lounge & Spa
            </h1>
          </div>

          {/* List Policy - Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
            {policies.map((policy, index) => (
              <div key={index} className="p-6 lg:p-8">
                <h3
                  className={clsx(
                    "font-prata font-bold text-[#C19A6B] mb-3 lg:mb-4 pb-2 border-b border-[#C19A6B]",
                    responsiveFontSizeArray(20, 24)
                  )}
                >
                  {policy.title}
                </h3>
                <p
                  className={clsx(
                    "text-[#494747] leading-relaxed",
                    responsiveFontSizeArray(14, 16)
                  )}
                >
                  {policy.content}
                </p>
              </div>
            ))}
          </div>

          {/* Thank You Text */}
          <div className="text-center">
            <p
              className={clsx(
                "text-[#494747] leading-relaxed",
                responsiveFontSizeArray(14, 18)
              )}
            >
              Thank you for your understanding and support of our business. If
              you have any questions or concerns, please don't hesitate to
              contact us.
            </p>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default OurPolicies;
