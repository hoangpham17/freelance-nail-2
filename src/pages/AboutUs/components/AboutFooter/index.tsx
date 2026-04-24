import React from "react";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

export const AboutFooter: React.FC = () => {
  return (
    <footer className="text-center pt-8 lg:pt-10 pb-4">
      <div
        className="inline-block h-px w-16 mb-4"
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
        We look forward to welcoming you to our oasis of beauty and
        relaxation.
      </p>
    </footer>
  );
};
