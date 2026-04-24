import React, { useState } from "react";
import clsx from "clsx";
import { PhoneOutlined } from "@ant-design/icons";
import PhoneConfirmModal from "../PhoneConfirmModal";
import { responsiveFontSizeArray } from "@/shared/utils/helper";

interface PhoneButtonProps {
  phoneNumber: string;
}

const PhoneButton: React.FC<PhoneButtonProps> = ({ phoneNumber }) => {
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

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
      <a
        onClick={handlePhoneClick}
        className={clsx(
          "bg-[#FFF9F4] text-[#6B4A2F] font-bold py-2 lg:py-3 rounded-full shadow-lg transition-all duration-300 hover:bg-[#F9F0E8] hover:scale-105 active:scale-95 border-2 border-[#E3D6CB] text-center cursor-pointer",
          "flex items-center justify-center gap-1 lg:gap-2",
          "flex-1 lg:flex-none h-[50px] lg:h-auto lg:min-w-[180px] px-1 lg:px-4",
          responsiveFontSizeArray(13, 20),
        )}
        style={{
          boxShadow:
            "0px 4px 16px 0px #BA876BC2, 0px 4px 16px 0px #FFFFFF29 inset",
        }}
      >
        <PhoneOutlined className="shrink-0 text-[16px] lg:text-[20px]" />
        <span className="whitespace-nowrap">{phoneNumber}</span>
      </a>

      <PhoneConfirmModal
        open={isPhoneModalOpen}
        phoneNumber={phoneNumber}
        onConfirm={handleConfirmCall}
        onCancel={handleCancelCall}
      />
    </>
  );
};

export default PhoneButton;
