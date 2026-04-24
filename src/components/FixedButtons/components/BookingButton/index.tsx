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
        "bg-[#B2866D] text-[#FFF8F3] font-playfairDisplay font-bold py-2 lg:py-3 rounded-full shadow-lg transition-all duration-300 hover:bg-[#9D755D] hover:scale-105 active:scale-95 text-center cursor-pointer",
        "flex items-center justify-center gap-1.5 lg:gap-2",
        "flex-1 lg:flex-none h-[50px] lg:h-auto lg:min-w-[180px] px-2 lg:px-4",
        responsiveFontSizeArray(14, 20),
      )}
      style={{
        boxShadow:
          "0px 4px 16px 0px #BA876BC2, 0px 4px 16px 0px #FFFFFF29 inset",
      }}
    >
      <SvgIcon
        src="/assets/svgs/calendar.svg"
        ariaLabel="Booking"
        width={18}
        height={18}
        className="shrink-0 lg:w-[20px] lg:h-[20px]"
      />
      <span className="whitespace-nowrap">BOOK ONLINE</span>
    </a>
  );
};

export default BookingButton;
