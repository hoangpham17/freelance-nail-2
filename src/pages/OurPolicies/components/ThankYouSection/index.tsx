import React from "react";
import "./style.css";

const ThankYouSection: React.FC = () => {
  return (
    <section className="policies-thanks">
      <div className="policies-thanks__container">
        <p className="policies-thanks__quote">
          “Thank you for your understanding and support of our business.”
        </p>
        <p className="policies-thanks__copy">
          If you have any questions or concerns, please don't hesitate to contact us.
        </p>
        <a className="policies-thanks__cta" href="tel:6087201011">
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default ThankYouSection;
