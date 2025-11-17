import React from "react";
import { PolicyItem } from "../../types";
import "./style.css";

const PolicyCard: React.FC<PolicyItem> = ({ title, content, icon }) => {
  return (
    <div className="policy-card">
      <div className="policy-card__icon">{icon}</div>
      <h3 className="policy-card__title">{title}</h3>
      <p className="policy-card__content">{content}</p>
    </div>
  );
};

export default PolicyCard;
