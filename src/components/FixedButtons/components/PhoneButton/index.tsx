import React, { useState } from "react";
import clsx from "clsx";
import SvgIcon from "@/based/SvgIcon";
import PhoneConfirmModal from "../PhoneConfirmModal";
import {
  FIXED_ACTION_BTN_LAYOUT,
  FIXED_ACTION_ICON_SIZE,
} from "../../fixedButtonClasses";

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
          "madison-btn-outline cursor-pointer bg-madison-surface/90 backdrop-blur-sm",
          FIXED_ACTION_BTN_LAYOUT,
        )}
      >
        <SvgIcon
          src="/assets/svgs/phone.svg"
          ariaLabel="Phone"
          width={FIXED_ACTION_ICON_SIZE}
          height={FIXED_ACTION_ICON_SIZE}
          className="shrink-0"
        />
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
