import React from "react";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import hostAPartyContent from "@/content/hostAParty.json";
import HostPartySection from "../HostPartySection";

type OccasionItem = {
  label: string;
  icon: string;
  color: string;
  colorDark: string;
};

/** Elegant line icons (24×24, stroke = currentColor) keyed by occasion. */
const OCCASION_ICONS: Record<string, React.ReactNode> = {
  birthday: (
    <>
      <path d="M4 21h16" />
      <path d="M6 21v-8h12v8" />
      <path d="M6 13c0-1.7 1.3-3 3-3h6c1.7 0 3 1.3 3 3" />
      <path d="M12 10V6" />
      <path d="M12 3.5c.7.7.7 1.5 0 2.2-.7-.7-.7-1.5 0-2.2Z" />
    </>
  ),
  bridal: (
    <>
      <path d="M12 2.5 14.7 5 12 7.5 9.3 5 12 2.5Z" />
      <path d="M9.5 5h5" />
      <circle cx="12" cy="15.5" r="5" />
    </>
  ),
  bachelorette: (
    <>
      <path d="M5 4h14l-7 8-7-8Z" />
      <path d="M12 12v7" />
      <path d="M8 21h8" />
      <path d="M15.5 4 18 2.5" />
    </>
  ),
  corporate: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </>
  ),
  gathering: (
    <>
      <path d="M11 3 12.6 7.4 17 9l-4.4 1.6L11 15l-1.6-4.4L5 9l4.4-1.6L11 3Z" />
      <path d="M18 13.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z" />
    </>
  ),
};

/** "#E8A0B0" → "232 160 176" (space-separated for rgb(... / a)). */
const hexToRgbTriplet = (hex: string): string => {
  const v = hex.replace("#", "");
  const r = parseInt(v.slice(0, 2), 16);
  const g = parseInt(v.slice(2, 4), 16);
  const b = parseInt(v.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
};

const OccasionsSection: React.FC = () => {
  const occasions = (
    hostAPartyContent as {
      occasions: {
        heading: string;
        subtext: string;
        items: OccasionItem[];
      };
    }
  ).occasions;

  return (
    <HostPartySection
      className="host-party-occasions"
      aria-label="Party occasions"
    >
      <header className="host-party-occasions__header">
        <h2
          className={clsx(
            "font-tangerine text-gold-gradient leading-[1.05]",
            responsiveFontSizeArray(28, 40),
          )}
        >
          {occasions.heading}
        </h2>
        <p
          className={clsx(
            "font-light leading-relaxed text-madison-muted",
            responsiveFontSizeArray(13, 15),
          )}
        >
          {occasions.subtext}
        </p>
      </header>

      <ul className="host-party-occasions-chips list-none p-0 m-0">
        {occasions.items.map((occasion) => (
          <li
            key={occasion.label}
            className="host-party-occasions-chip group"
            style={
              { "--occ": hexToRgbTriplet(occasion.colorDark) } as React.CSSProperties
            }
          >
            <span className="host-party-occasions-chip__icon" aria-hidden>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                width={24}
                height={24}
              >
                {OCCASION_ICONS[occasion.icon]}
              </svg>
            </span>
            <span
              className={clsx(
                "host-party-occasions-chip__label font-playfairDisplay font-medium text-madison-text leading-none tracking-tight whitespace-nowrap",
                responsiveFontSizeArray(16, 20, { xl: 17, "2xl": 18 }),
              )}
            >
              {occasion.label}
            </span>
          </li>
        ))}
      </ul>
    </HostPartySection>
  );
};

export default OccasionsSection;
