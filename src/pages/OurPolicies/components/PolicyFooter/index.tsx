import React from "react";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import ourPoliciesContent from "@/content/ourPolicies.json";
import { OrnamentalDivider } from "@/components/OrnamentalDivider";

export const PolicyFooter: React.FC = () => {
  const footer = (
    ourPoliciesContent as {
      footer: { thankYou: string; contactPrompt: string };
    }
  ).footer;
  return (
    <footer className="text-center pt-6 lg:pt-10">
      <OrnamentalDivider className="mx-auto mb-6 text-madison-gold" />
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
