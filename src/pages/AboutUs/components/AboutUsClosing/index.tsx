import React from "react";
import { Link } from "react-router-dom";
import aboutUsContent from "@/content/aboutUs.json";
import { PATHS } from "@/routes/Routes";

type Content = {
  closing: {
    quote: string;
  };
};

export const AboutUsClosing: React.FC = () => {
  const { closing } = aboutUsContent as Content;

  return (
    <footer className="au-closing">
      <div className="au-shell au-closing__inner">
        <div className="au-closing__ornament" aria-hidden>
          ◆
        </div>
        <p className="au-closing__quote">{closing.quote}</p>
        <Link to={PATHS.contactUs} className="au-closing__cta">
          Get in touch
        </Link>
      </div>
    </footer>
  );
};
