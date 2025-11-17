import React, { useState } from "react";
import Banner from "./components/Banner";
import ContactForm from "./components/ContactForm";
import ContactPopup from "./components/ContactPopup";

const ContactUs: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFormComplete = (success: boolean) => {
    setIsSuccess(success);
    setShowPopup(true);
    window.setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <main className="contact-page">
      <Banner
        title="We'll be in touch shortly"
        backgroundImage="/assets/images/Background/banner-contact.jpg"
      >
        <ContactForm onSubmitComplete={handleFormComplete} />
        <ContactPopup isVisible={showPopup} isSuccess={isSuccess} />
      </Banner>
    </main>
  );
};

export default ContactUs;
