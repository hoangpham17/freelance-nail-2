import React from "react";
import clsx from "clsx";
import { parseAirtableRichtext } from "@/shared/utils/richtext";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { SectionHeadingLine } from "@/components/SectionHeadingLine";

export type HomeHeadingVariant =
  | "default"
  | "service"
  | "about"
  | "gallery"
  | "testimonial";

const HEADING_TYPO: Record<
  HomeHeadingVariant,
  {
    title: [number, number];
    subtitle: [number, number];
    description?: [number, number];
  }
> = {
  default: { title: [30, 48], subtitle: [38, 60] },
  /** Services — title matches the "Premium Services" subtitle scale [44, 72] */
  service: { title: [34, 72], subtitle: [38, 60], description: [14, 24] },
  /** About — nail-ver2 SectionTitle [40, 72] dual-line */
  about: { title: [30, 48], subtitle: [38, 72] },
  /** Gallery — title matches About "Beautiful Nails" [36, 48], line 2 matches About */
  gallery: { title: [30, 48], subtitle: [38, 72] },
  /** Testimonial — title matches the "Premium Services" subtitle scale [44, 72] */
  testimonial: { title: [34, 72], subtitle: [38, 60] },
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
        "text-gold-gradient font-tangerine font-normal [&_strong]:font-tangerine [&_p]:m-0 [&_p]:!text-[1em] [&_*]:!text-[1em]",
        responsiveFontSizeArray(typo.title[0], typo.title[1]),
        isDualLine ? "leading-[1.15] [&_p+p]:mt-0" : "leading-[1.15]",
        !subtitle &&
          isDualLine &&
          variant === "about" && [
            "[&>p:first-child]:!text-[30px] md:[&>p:first-child]:!text-[48px]",
            "[&>p:last-child]:!text-[34px] md:[&>p:last-child]:!text-[72px]",
          ],
        !subtitle &&
          isDualLine &&
          variant === "gallery" && [
            "[&>p:first-child]:!text-[30px] md:[&>p:first-child]:!text-[48px]",
            "[&>p:last-child]:!text-[34px] md:[&>p:last-child]:!text-[72px]",
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
            align === "center"
              ? "items-center text-center"
              : "items-start text-left",
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
              {showUnderline && align === "center" ? (
                <SectionHeadingLine />
              ) : null}
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
        align === "center"
          ? "items-center text-center"
          : "items-start text-left",
        className,
      )}
    >
      {headingBlock}
      {isDualLine && showUnderline && align === "center" ? (
        <SectionHeadingLine />
      ) : null}

      {description ? (
        <div
          className={clsx(
            "max-w-[1100px] font-light text-[#d1d5db] [&_p]:m-0",
            variant === "service"
              ? "home-service-section__description"
              : responsiveFontSizeArray(...(typo.description ?? [14, 16])),
          )}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ) : null}
    </div>
  );
};
