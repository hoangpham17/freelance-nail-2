import React from "react";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import { SectionHeadingLine } from "@/components/SectionHeadingLine";
import hostAPartyContent from "@/content/hostAParty.json";
import HostPartySection from "../HostPartySection";

const OccasionsSection: React.FC = () => {
  const occasions = (
    hostAPartyContent as {
      occasions: {
        heading: string;
        subtext: string;
        items: Array<{ label: string; color: string; colorDark: string }>;
      };
    }
  ).occasions;

  return (
    <HostPartySection
      className="host-party-occasions bg-black"
      aria-label="Party occasions"
    >
      <div className="host-party-divider" aria-hidden />

      <header className="host-party-occasions__header">
        <h2
          className={clsx(
            "font-tangerine text-gold-gradient leading-[1.05]",
            responsiveFontSizeArray(28, 40),
          )}
        >
          {occasions.heading}
        </h2>
        <SectionHeadingLine className="mx-auto" />
        <p
          className={clsx(
            "font-light leading-relaxed text-madison-muted",
            responsiveFontSizeArray(13, 15),
          )}
        >
          {occasions.subtext}
        </p>
      </header>

      <div className="host-party-occasions-showcase">
        <ul
          className={clsx(
            "host-party-occasions-menu list-none p-0 m-0",
            "flex flex-col items-stretch sm:flex-row sm:flex-wrap sm:items-center sm:justify-center",
          )}
        >
          {occasions.items.map((occasion, index) => (
            <React.Fragment key={occasion.label}>
              {index > 0 && (
                <li
                  className="host-party-occasions-menu__ornament hidden sm:flex shrink-0 items-center justify-center px-2 lg:px-3"
                  aria-hidden
                >
                  <span className="host-party-occasions-menu__diamond" />
                </li>
              )}
              <li className="host-party-occasions-menu__item group min-w-0 flex-1 sm:flex-none">
                {index > 0 && (
                  <span
                    className="host-party-occasions-menu__rule sm:hidden"
                    aria-hidden
                  />
                )}
                <div className="host-party-occasions-menu__cell">
                  <span
                    className="host-party-occasions-menu__accent mb-3 block h-px w-9 transition-[width] duration-500 ease-out group-hover:w-14"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${occasion.colorDark} 35%, ${occasion.color} 65%, transparent)`,
                    }}
                    aria-hidden
                  />
                  <span
                    className={clsx(
                      "font-playfairDisplay font-medium text-madison-text leading-snug tracking-tight",
                      "transition-colors duration-300 group-hover:text-madison-gold",
                      responsiveFontSizeArray(15, 18),
                    )}
                  >
                    {occasion.label}
                  </span>
                </div>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </HostPartySection>
  );
};

export default OccasionsSection;
