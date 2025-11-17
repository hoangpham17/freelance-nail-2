import React from "react";
import { PolicyItem } from "../../types";
import PolicyCard from "../PolicyCard";
import "./style.css";

interface PoliciesGridProps {
  policies: PolicyItem[];
}

const PoliciesGrid: React.FC<PoliciesGridProps> = ({ policies }) => {
  return (
    <section className="policies-grid">
      <div className="policies-grid__container">
        <div className="policies-grid__layout">
          {policies.map((policy) => (
            <PolicyCard key={policy.title} {...policy} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PoliciesGrid;
