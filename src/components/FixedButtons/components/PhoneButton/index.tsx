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

  return (
    <>
      <a
        onClick={handlePhoneClick}
        className={clsx(
          "madison-btn-outline !rounded-full font-montserrat font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer",
          "flex items-center justify-center gap-2 bg-madison-surface/90 backdrop-blur-sm",
          "flex-1 lg:flex-none h-[50px] lg:h-auto lg:min-w-[180px] px-3 lg:px-4",
          responsiveFontSizeArray(13, 16),
        )}
      >
        <PhoneOutlined className="shrink-0 text-[16px] lg:text-[18px]" />
        <span className="whitespace-nowrap">{phoneNumber}</span>
      </a>

      <PhoneConfirmModal
        open={isPhoneModalOpen}
        phoneNumber={phoneNumber}
        onConfirm={handleConfirmCall}
        onCancel={() => setIsPhoneModalOpen(false)}
      />
    </>
  );
};

export default PhoneButton;
