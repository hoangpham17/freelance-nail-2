import React from "react";
import { AboutUsCardData } from "../../types";
import AboutUsCard from "../AboutUsCard";
import "./style.css";

interface AboutUsSectionProps {
  items: AboutUsCardData[];
}

const AboutUsSection: React.FC<AboutUsSectionProps> = ({ items }) => {
  return (
    <section className="about-us-block">
      <div className="container">
        <div className="about-us-block__inner">
          {items.map((item) => (
            <AboutUsCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
