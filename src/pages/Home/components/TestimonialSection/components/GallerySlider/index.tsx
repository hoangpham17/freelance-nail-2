import React, { useRef, useState } from "react";
import Slider, { Settings } from "react-slick";
import CustomDots from "@/based/components/CustomDots";

interface GallerySliderProps {
  galleryImages: { id: string; url: string }[];
}

const GallerySlider: React.FC<GallerySliderProps> = ({ galleryImages }) => {
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const gallerySliderRef = useRef<Slider | null>(null);

  const gallerySettings: Settings = {
    infinite: true,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    beforeChange: (_current: number, next: number) =>
      setCurrentGalleryIndex(next),
  };

  return (
    <div className="relative order-1 md:order-2">
      <div className="relative overflow-visible">
        <div className="relative">
          <div className="relative z-20 rounded-2xl overflow-hidden">
            <Slider ref={gallerySliderRef} {...gallerySettings}>
              {galleryImages.map((image) => (
                <div key={image.id} className="relative">
                  <img
                    src={image.url}
                    alt="Gallery"
                    className="w-[315px] md:w-[437px] h-[300px] md:h-[428px] object-cover rounded-2xl"
                  />
                </div>
              ))}
            </Slider>
          </div>

          {galleryImages.length > 1 && (
            <div className="absolute right-0 top-0 w-[50%] h-full z-10 rounded-2xl overflow-hidden pointer-events-none scale-75">
              <img
                src={
                  galleryImages[
                    (currentGalleryIndex + 1) % galleryImages.length
                  ]?.url || galleryImages[0]?.url
                }
                alt="Next gallery"
                className="w-full h-96 md:h-[500px] object-cover rounded-2xl object-left"
              />
            </div>
          )}
        </div>

        <div className="mt-12 flex justify-center">
          <CustomDots
            position="bottom"
            totalSlides={galleryImages.length}
            currentIndex={currentGalleryIndex}
            onDotClick={(index) => {
              gallerySliderRef.current?.slickGoTo(index);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GallerySlider;
