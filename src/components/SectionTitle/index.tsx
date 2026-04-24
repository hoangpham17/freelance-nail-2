import React from "react";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { parseAirtableRichtext } from "@/shared/utils/richtext";

export type SectionTitleProps = {
  /** Airtable richtext string (will be parsed) */
  html: string | undefined;
  className?: string;
  /** [mobile, desktop] px — default [40, 72] */
  fontSize?: [number, number];
  /** CSS line-height, e.g. "90%" | "1.1" — default "90%" */
  leading?: string;
};

const DEFAULT_FONT_SIZE: [number, number] = [40, 72];

export const SectionTitle: React.FC<SectionTitleProps> = ({
  html,
  className,
  fontSize = DEFAULT_FONT_SIZE,
  leading = "90%",
}) => {
  const [minSize, maxSize] = fontSize;
  const parsed = parseAirtableRichtext(html);
  if (!parsed.trim()) return null;

  return (
    <div
      className={clsx(
        "font-playfairDisplay [&_strong]:font-corinthiaBold text-[#6B4A2F] font-bold whitespace-break-spaces",
        responsiveFontSizeArray(minSize, maxSize),
        className,
      )}
      style={{ lineHeight: leading }}
      dangerouslySetInnerHTML={{ __html: parsed }}
    />
  );
};
