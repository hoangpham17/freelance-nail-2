import React from "react";
import "./style.css";

const FixedButtons: React.FC = () => {
  return (
    <div className="fixed-button">
      <a
        className="book-online-desktop"
        title="BOOKING"
        href="https://booking.spacepos.net/?id=jzOR8l!BpuM="
        target="_blank"
        rel="noreferrer"
      >
        BOOKING
      </a>
      <a className="call-us-desktop" href="tel:6087201011">
        (608) 720 1011
      </a>
    </div>
  );
};

export default FixedButtons;
