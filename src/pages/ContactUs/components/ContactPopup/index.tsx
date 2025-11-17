import React from "react";
import "./style.css";

interface ContactPopupProps {
  isVisible: boolean;
  isSuccess: boolean;
}

const ContactPopup: React.FC<ContactPopupProps> = ({ isVisible, isSuccess }) => {
  if (!isVisible) return null;

  return (
    <div className="contact-us__popup" data-popup-auto-open>
      <div className="contact-us__popup-body">
        <div className="contact-us__block_logo">
          <img
            src="/assets/images/Logo/logo-desktop.png"
            alt="Logo"
            className="contact-us__logo"
          />
        </div>
        <p className="contact-us__text">
          {isSuccess
            ? "Thank you for contacting us regarding our current products and prices"
            : "Sorry our system is experiencing some errors now, please try again later."}
        </p>
        <img
          src="/assets/images/ContactUs/image-popup.png"
          alt="Contact popup"
          className="contact-us__image"
        />
      </div>
    </div>
  );
};

export default ContactPopup;
