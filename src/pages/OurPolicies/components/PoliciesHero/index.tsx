import React from "react";
import "./style.css";

const PoliciesHero: React.FC = () => {
  return (
    <section className="policies-hero">
      <div className="policies-hero__dots" />
      <div className="policies-hero__ring" />
      <div className="policies-hero__container">
        <div className="policies-hero__heading">
          <p className="policies-hero__eyebrow">Madison Nail Lounge</p>
          <h1 className="policies-hero__title">
            Policies of our
            <span>Nail Lounge</span>
          </h1>
          <p className="policies-hero__subtitle">
            A warm reminder of the experience we promise to protect for every guest.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PoliciesHero;
