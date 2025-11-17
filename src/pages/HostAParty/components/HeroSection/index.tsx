import React from "react";
import "./style.css";

const HeroSection: React.FC = () => {
  return (
    <section className="party-hero">
      <div className="party-hero__decor decor-1" />
      <div className="party-hero__decor decor-2" />
      <div className="party-hero__decor decor-3" />
      <div className="party-hero__container">
        <div className="party-hero__content">
          <p className="party-hero__eyebrow">CELEBRATE IN STYLE</p>
          <h1 className="party-hero__title">
            Host a Party
            <span>at Madison Nail Lounge!</span>
          </h1>
          <div className="party-hero__copy">
            <p>
              Our Nail Lounge is the perfect setting for bridal showers, birthdays, bachelorette parties, corporate events, and special gatherings.
            </p>
            <p>
              With a beautiful space and a dedicated team, we provide a seamless, memorable experience for you and your guests.
            </p>
            <p>
              Contact us to learn more or fill out our inquiry form. Your ideal destination for fun, relaxation, and flawless nail services awaits!
            </p>
          </div>
          <div className="party-hero__cta">
            <a href="tel:+16087201011" className="party-hero__cta-primary">
              CALL US
            </a>
            <a
              href="mailto:contact@madisonnaillounge.com"
              className="party-hero__cta-secondary"
            >
              EMAIL US
            </a>
          </div>
        </div>
        <div className="party-hero__media">
          <div className="party-hero__image-frame">
            <img
              src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=1000&fit=crop"
              alt="Party celebration"
              onError={(e) => {
                e.currentTarget.src = "https://picsum.photos/800/1000";
              }}
            />
            <div className="party-hero__image-overlay" />
          </div>
          <div className="party-hero__accent accent-a" />
          <div className="party-hero__accent accent-b" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
