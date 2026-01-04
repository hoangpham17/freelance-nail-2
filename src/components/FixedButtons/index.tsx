import React, { useState } from "react";
import { Flex } from "antd";
import clsx from "clsx";
import PhoneConfirmModal from "./components/PhoneConfirmModal";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

const FixedButtons: React.FC = () => {
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const phoneNumber = "(608) 720 1011";

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsPhoneModalOpen(true);
  };

  const handleConfirmCall = () => {
    window.location.href = `tel:${phoneNumber.replace(/\D/g, "")}`;
    setIsPhoneModalOpen(false);
  };

  const handleCancelCall = () => {
    setIsPhoneModalOpen(false);
  };

  return (
    <>
      <Flex
        className="fixed p-3 lg:p-0 bottom-0 lg:bottom-8 xl:bottom-16 right-0 lg:right-[1%] xl:right-[8%] lg:flex-col gap-2 w-full lg:w-auto z-[99] justify-center"
        align="center"
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-white/40 lg:hidden block"
          style={{ backdropFilter: "blur(10px)" }}
        ></div>
        <a
          className={clsx(
            "z-[1] lg:px-7 lg:py-1 p-2 bg-gradient-to-b from-[#FFFFFF] to-[#F6E7EE] !text-[#D5AF34] rounded-2xl text-center font-prata lg:rotate-[-2deg] border border-[#9E7B6A]",
            responsiveFontSizeArray(24, 47)
          )}
          title="BOOKING"
          href="https://booking.spacepos.net/?id=jzOR8l!BpuM="
          target="_blank"
          rel="noreferrer"
        >
          <span
            style={{
              textShadow:
                "0px 1px 0px #FFFFFF, 0px -1px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            Booking now
          </span>
        </a>
        <a
          className={clsx(
            "text-[#9E7B6A] z-[1] hover:text-[#9E7B6A]/80 cursor-pointer",
            responsiveFontSizeArray(24, 60)
          )}
          onClick={handlePhoneClick}
          style={{
            textShadow: `
              -2px -2px 0 #FFFFFF,
              2px -2px 0 #FFFFFF,
              -2px 2px 0 #FFFFFF,
              2px 2px 0 #FFFFFF,
              0px -2px 0 #FFFFFF,
              0px 2px 0 #FFFFFF,
              -2px 0px 0 #FFFFFF,
              2px 0px 0 #FFFFFF,
              0px 4px 4px rgba(119, 30, 66, 0.3)
            `,
          }}
        >
          {phoneNumber}
        </a>
      </Flex>

      <PhoneConfirmModal
        open={isPhoneModalOpen}
        phoneNumber={phoneNumber}
        onConfirm={handleConfirmCall}
        onCancel={handleCancelCall}
      />
    </>
  );
};

export default FixedButtons;
