import React from "react";
import "./style.css";

interface GalleryFiltersProps {
  filters: { id: string; label: string }[];
  activeFilter: string;
  onChange: (id: string) => void;
}

const GalleryFilters: React.FC<GalleryFiltersProps> = ({
  filters,
  activeFilter,
  onChange,
}) => (
  <div className="tab-heading">
    {filters.map((filter) => (
      <button
        key={filter.id}
        className={`tab-btn ${activeFilter === filter.id ? "active" : ""}`}
        data-tab-gallery={filter.id}
        onClick={() => onChange(filter.id)}
      >
        {filter.label}
      </button>
    ))}
  </div>
);

export default GalleryFilters;
