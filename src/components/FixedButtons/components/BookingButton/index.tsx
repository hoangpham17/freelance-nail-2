import React from "react";
import clsx from "clsx";
import SvgIcon from "@/based/SvgIcon";
import {
  FIXED_ACTION_BTN_LAYOUT,
  FIXED_ACTION_ICON_SIZE,
} from "../../fixedButtonClasses";

const BookingButton: React.FC = () => {
  return (
    <a
      href="https://booking.spacepos.net/?id=jzOR8l!BpuM="
      target="_blank"
      rel="noreferrer"
      className={clsx(
        "madison-btn-primary border border-transparent",
        FIXED_ACTION_BTN_LAYOUT,
      )}
    >
      <SvgIcon
        src="/assets/svgs/calendar.svg"
        ariaLabel="Booking"
        width={FIXED_ACTION_ICON_SIZE}
        height={FIXED_ACTION_ICON_SIZE}
        className="shrink-0"
      />
      <span className="whitespace-nowrap">Book Online</span>
    </a>
  );
};

export default BookingButton;
