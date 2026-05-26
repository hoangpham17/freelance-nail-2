import React from "react";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { parseAirtableRichtext } from "@/shared/utils/richtext";
import type { PolicyWithSectionId } from "./types";

type Props = {
  policy: PolicyWithSectionId;
  index: number;
};

export const PolicyCard: React.FC<Props> = ({ policy, index }) => {
  return (
    <article
      id={policy.sectionId}
      className={clsx(
        "scroll-mt-24 h-full rounded-2xl border border-madison-border/40 bg-madison-surface p-4 lg:p-6",
        "shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:border-madison-gold/40 hover:shadow-[0_14px_40px_rgba(0,0,0,0.45)] transition-all duration-300",
      )}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center shadow-md font-playfairDisplay font-bold text-sm tabular-nums text-black bg-madison-gold"
              aria-hidden
            >
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-[10px] tracking-[0.18em] uppercase font-medium text-madison-gold-dark">
              Policy
            </div>
            <div className="mt-1 flex items-start">
              <h2
                className={clsx(
                  "font-tangerine text-gold-gradient tracking-tight",
                  responsiveFontSizeArray(18, 22),
                )}
              >
                {policy.title}
              </h2>
            </div>

            <div
              className="mt-3 h-px w-24 mr-auto bg-gradient-to-r from-madison-gold/70 to-transparent"
              aria-hidden
            />
          </div>
        </div>

        <div
          className={clsx(
            "mt-2 lg:mt-4 font-light text-madison-text-muted leading-[1.8] [&_p]:my-2.5 [&_ul]:my-3 [&_ol]:my-3 [&_li]:my-1 [&_li]:pl-1 [&_a]:text-madison-gold [&_a]:underline",
            responsiveFontSizeArray(14, 16),
          )}
          dangerouslySetInnerHTML={{
            __html: parseAirtableRichtext(policy.description),
          }}
        />
      </div>
    </article>
  );
};
