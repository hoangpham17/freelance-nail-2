import React from "react";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { parseAirtableRichtext } from "@/shared/utils/richtext";

export type SectionTitleProps = {
  html: string | undefined;
  className?: string;
  fontSize?: [number, number];
  leading?: string;
  variant?: "gold" | "light";
};

const DEFAULT_FONT_SIZE: [number, number] = [36, 48];

export const SectionTitle: React.FC<SectionTitleProps> = ({
  html,
  className,
  fontSize = DEFAULT_FONT_SIZE,
  leading = "1.15",
  variant = "gold",
}) => {
  const [minSize, maxSize] = fontSize;
  const parsed = parseAirtableRichtext(html);
  if (!parsed.trim()) return null;

  return (
    <div
      className={clsx(
        variant === "gold"
          ? "text-gold-gradient font-tangerine font-normal [&_strong]:font-tangerine"
          : "text-madison-text font-montserrat font-semibold",
        "whitespace-break-spaces [&_p]:m-0",
        responsiveFontSizeArray(minSize, maxSize),
        className,
      )}
      style={{ lineHeight: leading }}
      dangerouslySetInnerHTML={{ __html: parsed }}
    />
  );
};
