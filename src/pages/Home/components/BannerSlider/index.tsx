import React from "react";
import Slider, { Settings } from "react-slick";
import { BannerItem } from "../../types";
import "./style.css";

interface BannerSliderProps {
  items: BannerItem[];
  campaignText: string;
}

const settings: Settings = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  autoplay: true,
  autoplaySpeed: 3500,
  fade: true,
  cssEase: "linear",
};

const BannerSlider: React.FC<BannerSliderProps> = ({ items, campaignText }) => {
  return (
    <section className="banner-block" data-banner-block>
      <div className="banner-swiper" id="banner-swiper" data-change-background>
        <Slider {...settings}>
          {items.map((item, index) => {
            const desktop =
              item.desktop || "/assets/images/Background/home-1.jpg";
            const mobile = item.mobile || desktop;
            return (
              <div className="swiper-slide" key={item.id || index}>
                <div
                  className="banner-img"
                  data-item-background
                  data-img-desktop={desktop}
                  data-img-mobile={mobile}
                  style={{ backgroundImage: `url('${desktop}')` }}
                ></div>
              </div>
            );
          })}
        </Slider>
      </div>
      <h3 className="campain-info">{campaignText}</h3>
    </section>
  );
};

export default BannerSlider;
