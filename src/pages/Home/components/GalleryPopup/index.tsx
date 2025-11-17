import React from "react";
import Slider, { Settings } from "react-slick";
import { HomeGalleryItem } from "../../types";
import "./style.css";

interface GalleryPopupProps {
  isOpen: boolean;
  items: HomeGalleryItem[];
  selectedIndex: number;
  onClose: () => void;
}

const GalleryPopup: React.FC<GalleryPopupProps> = ({
  isOpen,
  items,
  selectedIndex,
  onClose,
}) => {
  if (!isOpen) return null;

  const settings: Settings = {
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: selectedIndex,
    nextArrow: (
      <button className="slick-next-btn slick-arrow" type="button">
        <i className="bi bi-chevron-right"></i>
      </button>
    ),
    prevArrow: (
      <button className="slick-prev-btn slick-arrow" type="button">
        <i className="bi bi-chevron-left"></i>
      </button>
    ),
  };

  return (
    <div className="popup-modal popup-gallery-home" data-slide-gallery-home>
      <div className="overlay" data-close-gallery-home onClick={onClose}></div>
      <div className="popup-inner gallery-popup-inner">
        <button
          className="popup-btn-close"
          data-close-gallery-home
          onClick={onClose}
        >
          <img
            src="/assets/images/Icons/icon-close.svg"
            alt="Close popup"
            className="icon"
          />
        </button>
        <div className="slide-wrapper">
          <div className="slide" id="popup-gallery">
            <Slider {...settings}>
              {items.map((item, index) => (
                <div key={item.id || index} className="slide-item">
                  <img
                    src={item.url || "/assets/images/Slide/Photo.jpg"}
                    alt={item.description || "Gallery"}
                    className="slide-item-img"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPopup;
