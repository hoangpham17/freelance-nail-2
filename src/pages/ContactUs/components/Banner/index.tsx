import React from "react";
import "./style.css";

interface BannerProps {
  title: string;
  backgroundImage: string;
  children?: React.ReactNode;
}

const Banner: React.FC<BannerProps> = ({ title, backgroundImage, children }) => {
  return (
    <section
      className="banner-contact-us"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="container">
        <div className="inner">
          <div className="heading">
            <h1 className="title">{title}</h1>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Banner;
