import React from "react";
import { GalleryItem } from "../../types";
import "./style.css";

interface GalleryGridProps {
  items: GalleryItem[];
  loading: boolean;
  onOpen: (index: number, items: GalleryItem[]) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ items, loading, onOpen }) => (
  <div className="tab-inner gallery-group group-3-img" id="all">
    {loading ? (
      <div className="gallery-loading">
        <div className="spinner" />
      </div>
    ) : (
      <div className="row" data-row-gallery>
        {items.map((item, index) => (
          <div
            key={item.id}
            className="col-md-4 col-lg-4 item gallery-item-active"
            data-tab-content-gallery={item.category || "All"}
          >
            <div
              className="thumbail-wrapper medium-style"
              data-popup-gallery-open
              onClick={() => onOpen(index, items)}
            >
              <img className="img" src={item.url} alt={item.description || "Gallery"} />
              <div className="decs">
                <img
                  src="/assets/images/Icons/gallery-icon.svg"
                  alt="Gallery icon"
                  className="icon-thumb"
                />
                <span>{item.description || "Gallery image"}</span>
                <img
                  src="/assets/images/Icons/gallery-arrow.svg"
                  alt="Gallery arrow"
                  className="icon-arrow"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default GalleryGrid;
