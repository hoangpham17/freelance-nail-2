import React from "react";
import Slider, { Settings } from "react-slick";
import GalleryItem, { GalleryItemProps } from "../GalleryItem";

interface GallerySliderProps {
  slides: GalleryItemProps[][];
  galleryItems: GalleryItemProps[];
  sliderRef: React.RefObject<Slider>;
  onItemClick?: (index: number) => void;
}

const GallerySlider: React.FC<GallerySliderProps> = ({
  slides,
  galleryItems,
  sliderRef,
  onItemClick,
}) => {
  const sliderSettings: Settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
  };

  return (
    <div className="relative order-1 lg:order-2">
      <div className="[&_.slick-list]:m-0 [&_.slick-slide]:p-0">
        <Slider ref={sliderRef} {...sliderSettings}>
          {slides.map((slide, slideIndex) => (
            <div key={`slide-${slideIndex}`}>
              {/* Mobile: 1 column, Desktop: 2x3 grid */}
              <div className="flex flex-col lg:flex-col gap-4">
                {/* Row 1: 2 large images - hidden on mobile */}
                <div className="hidden lg:grid lg:grid-cols-2 gap-4">
                  {slide.slice(0, 2).map((item) => {
                    const itemIndex = galleryItems.findIndex(
                      (g) => g.id === item.id
                    );
                    return (
                      <GalleryItem
                        key={item.id}
                        {...item}
                        size="large"
                        onClick={() => {
                          if (onItemClick && itemIndex !== -1) {
                            onItemClick(itemIndex);
                          }
                        }}
                      />
                    );
                  })}
                </div>
                {/* Row 2: 3 smaller images - hidden on mobile */}
                <div className="hidden lg:grid lg:grid-cols-2 lg:grid-cols-3 gap-4">
                  {slide.slice(2, 5).map((item) => {
                    const itemIndex = galleryItems.findIndex(
                      (g) => g.id === item.id
                    );
                    return (
                      <GalleryItem
                        key={item.id}
                        {...item}
                        size="small"
                        onClick={() => {
                          if (onItemClick && itemIndex !== -1) {
                            onItemClick(itemIndex);
                          }
                        }}
                      />
                    );
                  })}
                </div>
                {/* Mobile: Show all items in 1 column */}
                <div className="flex flex-col gap-4 lg:hidden">
                  {slide.map((item) => {
                    const itemIndex = galleryItems.findIndex(
                      (g) => g.id === item.id
                    );
                    return (
                      <GalleryItem
                        key={item.id}
                        {...item}
                        size="large"
                        onClick={() => {
                          if (onItemClick && itemIndex !== -1) {
                            onItemClick(itemIndex);
                          }
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default GallerySlider;
