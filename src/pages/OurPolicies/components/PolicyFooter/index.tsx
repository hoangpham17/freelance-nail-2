import React from "react";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import ourPoliciesContent from "@/content/ourPolicies.json";

export const PolicyFooter: React.FC = () => {
  const footer = (ourPoliciesContent as { footer: { thankYou: string; contactPrompt: string } }).footer;
  return (
    <footer className="text-center pt-6 lg:pt-10">
      <div
        className="inline-block h-px w-16 mb-6"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #B2866D 50%, transparent 100%)",
        }}
      />
      <p
        className={clsx(
          "font-extralight text-[#8A6A4F] italic",
          responsiveFontSizeArray(13, 15),
        )}
      >
        {footer.thankYou}
        <br />
        {footer.contactPrompt}
      </p>
    </footer>
  );
};
