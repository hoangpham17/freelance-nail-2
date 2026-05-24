import React from "react";
import clsx from "clsx";
import { parseAirtableRichtext } from "@/shared/utils/richtext";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { SectionHeadingLine } from "@/components/SectionHeadingLine";

export type HomeHeadingVariant = "default" | "about" | "gallery";

const HEADING_TYPO: Record<
  HomeHeadingVariant,
  { title: [number, number]; subtitle: [number, number] }
> = {
  /** Services, testimonials — single line ~48px */
  default: { title: [36, 48], subtitle: [32, 60] },
  /** Figma About — 40px + 64px */
  about: { title: [32, 40], subtitle: [36, 64] },
  /** Figma Gallery — 40px + 60px */
  gallery: { title: [32, 40], subtitle: [36, 60] },
};

export type HomeSectionHeadingProps = {
  titleHtml?: string;
  subtitleHtml?: string;
  descriptionHtml?: string;
  align?: "center" | "start";
  titleClassName?: string;
  className?: string;
  showUnderline?: boolean;
  /** Typography preset for two-line gold titles */
  variant?: HomeHeadingVariant;
};

export const HomeSectionHeading: React.FC<HomeSectionHeadingProps> = ({
  titleHtml,
  subtitleHtml,
  descriptionHtml,
  align = "center",
  titleClassName,
  className,
  showUnderline = true,
  variant = "default",
}) => {
  const title = parseAirtableRichtext(titleHtml);
  const subtitle = parseAirtableRichtext(subtitleHtml);
  const description = parseAirtableRichtext(descriptionHtml);
  const typo = HEADING_TYPO[variant];
  const isDualLine = variant === "about" || variant === "gallery";

  if (!title && !subtitle && !description) return null;

  const titleEl = title ? (
    <div
      className={clsx(
        "text-gold-gradient font-tangerine font-normal [&_strong]:font-tangerine [&_p]:m-0",
        responsiveFontSizeArray(typo.title[0], typo.title[1]),
        isDualLine
          ? "leading-[1.15] [&_p+p]:mt-0"
          : "leading-[1.15]",
        !subtitle &&
          isDualLine &&
          variant === "about" && [
            "[&>p:first-child]:!text-[32px] md:[&>p:first-child]:!text-[40px]",
            "[&>p:last-child]:!text-[36px] md:[&>p:last-child]:!text-[64px]",
          ],
        !subtitle &&
          isDualLine &&
          variant === "gallery" && [
            "[&>p:first-child]:!text-[32px] md:[&>p:first-child]:!text-[40px]",
            "[&>p:last-child]:!text-[36px] md:[&>p:last-child]:!text-[60px]",
          ],
        titleClassName,
      )}
      dangerouslySetInnerHTML={{ __html: title }}
    />
  ) : null;

  const subtitleEl = subtitle ? (
    <div
      className={clsx(
        "text-gold-gradient font-tangerine [&_p]:m-0",
        responsiveFontSizeArray(typo.subtitle[0], typo.subtitle[1]),
        isDualLine ? "leading-[1.15]" : "leading-[1.2]",
      )}
      dangerouslySetInnerHTML={{ __html: subtitle }}
    />
  ) : null;

  const headingBlock =
    titleEl || subtitleEl ? (
      isDualLine ? (
        <div
          className={clsx(
            "flex flex-col gap-0",
            align === "center" ? "items-center text-center" : "items-start text-left",
          )}
        >
          {titleEl}
          {subtitleEl}
        </div>
      ) : (
        <>
          {titleEl ? (
            <div
              className={clsx(
                "flex flex-col gap-3",
                align === "center" ? "items-center" : "items-start",
              )}
            >
              {titleEl}
              {showUnderline && align === "center" ? <SectionHeadingLine /> : null}
            </div>
          ) : null}
          {subtitleEl}
        </>
      )
    ) : null;

  return (
    <div
      className={clsx(
        "flex flex-col gap-4 md:gap-6",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {headingBlock}
      {isDualLine && showUnderline && align === "center" ? <SectionHeadingLine /> : null}

      {description ? (
        <div
          className={clsx(
            "max-w-[993px] font-light text-[#d1d5db] [&_p]:m-0",
            responsiveFontSizeArray(14, 16),
          )}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ) : null}
    </div>
  );
};
