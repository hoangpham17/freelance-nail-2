import React from "react";
import GiftBoxButton from "./components/GiftBoxButton";
import BookingButton from "./components/BookingButton";
import PhoneButton from "./components/PhoneButton";

const FixedButtons: React.FC = () => {
  const phoneNumber = "(608) 720 1011";

  return (
    <div className="fixed bottom-4 left-4 right-4 lg:bottom-12 lg:left-auto lg:right-12 z-[100] flex flex-col gap-3 lg:items-end pointer-events-none">
      <div className="flex justify-end w-full pointer-events-auto">
        <GiftBoxButton />
      </div>
      <div className="flex flex-row w-full gap-2 lg:gap-3 lg:w-auto lg:flex-col lg:items-end justify-center pointer-events-auto">
        <BookingButton />
        <PhoneButton phoneNumber={phoneNumber} />
      </div>
    </div>
  );
};

export default FixedButtons;
