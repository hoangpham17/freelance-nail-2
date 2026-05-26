import clsx from "clsx";

/** Shared layout for Book Online + phone fixed CTAs */
export const FIXED_ACTION_BTN_LAYOUT = clsx(
  "font-montserrat font-semibold !rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95",
  "box-border flex items-center justify-center gap-2",
  "flex-1 lg:flex-none",
  "h-[44px] lg:h-[46px] w-full lg:w-[240px] lg:min-w-[240px] lg:max-w-[240px]",
  "!px-3 !py-0 !text-[15px] lg:!text-[17px] !leading-none uppercase",
);

export const FIXED_ACTION_ICON_SIZE = 18;
