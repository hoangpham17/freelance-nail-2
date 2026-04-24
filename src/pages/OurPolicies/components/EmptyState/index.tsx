import React from "react";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import ourPoliciesContent from "@/content/ourPolicies.json";

export const EmptyState: React.FC = () => {
  const message = (ourPoliciesContent as { emptyState: { message: string } }).emptyState.message;
  return (
    <div className="text-center py-20">
      <p
        className={clsx(
          "text-[#8A6A4F] font-extralight",
          responsiveFontSizeArray(16, 18),
        )}
      >
        {message}
      </p>
    </div>
  );
};
