import React from "react";
import { AboutUsCardData } from "../../types";
import "./style.css";

const AboutUsCard: React.FC<AboutUsCardData> = ({
  icon,
  logo,
  description,
  backgroundColor,
}) => {
  return (
    <div
      className="about-us-item"
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div className="about-us-item__icon">
        <img src={icon} alt="About us icon" className="about-us-item__icon-img" />
      </div>
      <div className="about-us-item__decs">
        <img src={logo} alt="About us logo" className="about-us-item__decs-img" />
        <p className="about-us-item__decs-text">{description}</p>
      </div>
    </div>
  );
};

export default AboutUsCard;
