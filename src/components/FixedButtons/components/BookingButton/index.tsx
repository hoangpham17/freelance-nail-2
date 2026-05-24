import React from "react";
import clsx from "clsx";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import SvgIcon from "@/based/SvgIcon";

const BookingButton: React.FC = () => {
  return (
    <a
      href="https://booking.spacepos.net/?id=jzOR8l!BpuM="
      target="_blank"
      rel="noreferrer"
      className={clsx(
        "madison-btn-primary font-montserrat !rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95",
        "flex items-center justify-center gap-2",
        "flex-1 lg:flex-none h-[50px] lg:h-auto lg:min-w-[180px] px-4",
        responsiveFontSizeArray(14, 16),
      )}
    >
      <SvgIcon
        src="/assets/svgs/calendar.svg"
        ariaLabel="Booking"
        width={18}
        height={18}
        className="shrink-0"
      />
      <span className="whitespace-nowrap">Book Online</span>
    </a>
  );
};

export default BookingButton;
