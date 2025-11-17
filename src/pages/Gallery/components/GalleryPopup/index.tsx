import React, { useEffect, useRef } from "react";
import Slider, { Settings } from "react-slick";
import { GalleryItem } from "../../types";
import "./style.css";

interface GalleryPopupProps {
  isOpen: boolean;
  items: GalleryItem[];
  selectedIndex: number;
  onClose: () => void;
}

const GalleryPopup: React.FC<GalleryPopupProps> = ({
  isOpen,
  items,
  selectedIndex,
  onClose,
}) => {
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") sliderRef.current?.slickPrev();
      if (event.key === "ArrowRight") sliderRef.current?.slickNext();
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const settings: Settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    initialSlide: selectedIndex,
  };

  return (
    <div className="popup-modal popup-gallery" data-popup data-popup-gallery>
      <div className="overlay" data-popup-close onClick={onClose}></div>
      <div className="popup-inner">
        <button className="popup-btn-close" data-popup-close onClick={onClose}>
          <img src="/assets/images/Icons/icon-close.svg" alt="Close" className="icon" />
        </button>
        <div className="slide-wrapper">
          <div className="thumbail-wrapper inner-img">
            <Slider ref={sliderRef} {...settings}>
              {items.map((item) => (
                <div key={`${item.id}-popup`}>
                  <img src={item.url} alt={item.description || "Gallery"} className="img" />
                  <div className="decs">
                    <img
                      src="/assets/images/Icons/gallery-icon.svg"
                      alt="Gallery icon"
                      className="icon-thumb"
                    />
                    <span>{item.description || "Gallery Image"}</span>
                    <img
                      src="/assets/images/Icons/gallery-arrow-down.svg"
                      alt="Close gallery"
                      className="icon-arrow"
                      onClick={onClose}
                    />
                  </div>
                </div>
              ))}
            </Slider>
            <button
              className="slick-prev-btn slick-arrow"
              data-prev-item
              onClick={() => sliderRef.current?.slickPrev()}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              className="slick-next-btn slick-arrow"
              data-next-item
              onClick={() => sliderRef.current?.slickNext()}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPopup;
