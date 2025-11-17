import React from "react";
import Slider, { Settings } from "react-slick";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../routes/Routes";
import { HomeGalleryItem } from "../../types";
import "./style.css";

interface HomeGalleryProps {
  items: HomeGalleryItem[];
  onOpen: (index: number) => void;
}

const settings: Settings = {
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  autoplay: true,
  autoplaySpeed: 2500,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 699,
      settings: {
        slidesToShow: 1,
        centerMode: true,
      },
    },
  ],
};

const HomeGallery: React.FC<HomeGalleryProps> = ({ items, onOpen }) => {
  return (
    <section id="home-gallery" className="home-gallery">
      <div className="container">
        <h2 className="gallery-title">
          <img
          src="/assets/images/Slide/title-slide.png"
          alt="Gallery"
          className="img"
        />
        </h2>
        <div className="gallery__wrapper">
          <div className="slide-wrapper">
            <div className="slide" id="gallery">
              <Slider {...settings}>
                {items.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="slide-item"
                    data-popup-gallery-open
                    onClick={() => onOpen(index)}
                  >
                    <img
                      src={item.url || "/assets/images/Slide/Photo.jpg"}
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
};

export default HomeGallery;
