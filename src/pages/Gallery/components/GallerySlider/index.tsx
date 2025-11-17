import React from "react";
import Slider, { Settings } from "react-slick";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../routes/Routes";
import { GalleryItem } from "../../types";
import "./style.css";

interface GallerySliderProps {
  items: GalleryItem[];
  onOpen: (index: number, items: GalleryItem[]) => void;
}

const sliderSettings: Settings = {
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
  dots: false,
  arrows: false,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

const GallerySlider: React.FC<GallerySliderProps> = ({ items, onOpen }) => (
  <section className="home-gallery" id="home-gallery">
    <div className="container">
      <h2 className="gallery-title">
        <img src="/assets/images/Slide/title-slide.png" alt="Gallery" className="img" />
      </h2>
      <div className="gallery__wrapper">
        <div className="slide-wrapper">
          <div className="slide" id="gallery">
            <Slider {...sliderSettings}>
              {items.map((item, index) => (
                <div
                  key={`${item.id}-slide`}
                  className="slide-item"
                  data-popup-gallery-open
                  onClick={() => onOpen(index, items)}
                >
                  <img
                    src={item.url}
                    alt={item.description || "Gallery"}
                    className="slide-item-img"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="see-more-gallery">
            <Link to={PATHS.gallery}>View more</Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default GallerySlider;
