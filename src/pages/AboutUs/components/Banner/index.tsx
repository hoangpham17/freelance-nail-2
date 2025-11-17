import React from "react";
import "./style.css";

interface BannerProps {
  title: string;
  description: string;
  backgroundImage?: string;
}

const Banner: React.FC<BannerProps> = ({
  title,
  description,
  backgroundImage = "/assets/images/Background/banner-about-us.jpg",
}) => {
  return (
    <section
      className="banner-about-us"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container">
        <div className="banner-about-us__heading">
          <h1 className="banner-about-us__heading-title">{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
