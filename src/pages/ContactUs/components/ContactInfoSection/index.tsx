import React from "react";
import { Wrapper } from "@/based/components/Wrapper";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import SvgIcon from "@/based/SvgIcon";
import contactUsContent from "@/content/contactUs.json";

const CARD_ICONS = [
  (
    <svg
      key="address"
      className="w-6 h-6 lg:w-7 lg:h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  (
    <SvgIcon
      key="phone"
      src="/assets/svgs/phone.svg"
      ariaLabel=""
      width={28}
      height={28}
      className="shrink-0 text-white"
    />
  ),
  (
    <svg
      key="hours"
      className="w-6 h-6 lg:w-7 lg:h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
];

export interface ContactInfoSectionProps {
  isSignup?: boolean;
}

export const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({
  isSignup = false,
}) => {
  const contactInfo = (contactUsContent as { contactInfo: { introContact: string; introSignup: string; cards: Array<{ title: string; lines: string[] }> } }).contactInfo;
  const cards = contactInfo.cards.map((card, i) => ({ ...card, icon: CARD_ICONS[i] }));
  return (
    <section className="relative w-full pt-8 lg:pt-12">
      <Wrapper>
        <p
          className={clsx(
            "text-[#8A6A4F] font-extralight text-center max-w-xl mx-auto mb-10 lg:mb-14",
            responsiveFontSizeArray(14, 16),
          )}
        >
          {isSignup ? contactInfo.introSignup : contactInfo.introContact}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex gap-4 p-5 lg:p-6 bg-white rounded-2xl shadow-sm border border-[#EDE6E0]"
            >
              <div
                className="flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #805D3D 0%, #6B4A2F 100%)",
                }}
              >
                {(card as { icon: React.ReactNode }).icon}
              </div>
              <div className="min-w-0">
                <h3
                  className={clsx(
                    "font-playfairDisplay font-bold text-[#6B4A2F] mb-2",
                    responsiveFontSizeArray(18, 20),
                  )}
                >
                  {card.title}
                </h3>
                <div
                  className={clsx(
                    "font-light text-[#5C4D42] leading-relaxed space-y-0.5",
                    responsiveFontSizeArray(14, 15),
                  )}
                >
                  {card.lines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};
