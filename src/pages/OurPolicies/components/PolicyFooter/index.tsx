import React from "react";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import ourPoliciesContent from "@/content/ourPolicies.json";

export const PolicyFooter: React.FC = () => {
  const footer = (ourPoliciesContent as { footer: { thankYou: string; contactPrompt: string } }).footer;
  return (
    <footer className="text-center pt-6 lg:pt-10">
      <div
        className="inline-block h-px w-16 mb-6 bg-gradient-to-r from-transparent via-madison-gold/60 to-transparent"
        aria-hidden
      />
      <p
        className={clsx(
          "font-extralight text-madison-gold-dark italic",
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
