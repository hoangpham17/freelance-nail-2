import React from "react";
import clsx from "clsx";
import SvgIcon from "@/based/SvgIcon";
import {
  FIXED_ACTION_BTN_LAYOUT,
  FIXED_ACTION_ICON_SIZE,
} from "../../fixedButtonClasses";

interface PhoneButtonProps {
  phoneNumber: string;
}

const PhoneButton: React.FC<PhoneButtonProps> = ({ phoneNumber }) => {
  const telHref = `tel:${phoneNumber.replace(/\D/g, "")}`;

  return (
    <a
      href={telHref}
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
  );
};

export default PhoneButton;
