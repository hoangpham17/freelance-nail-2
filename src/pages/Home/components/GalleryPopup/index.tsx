import React, { useRef, useEffect } from "react";
import Slider, { Settings } from "react-slick";
import { Skeleton } from "antd";
import { HomeGalleryItem } from "../../types";
import SvgIcon from "@/based/SvgIcon";

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
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: selectedIndex,
    nextArrow: (
      <button
        className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/90 hover:bg-white border border-gray-200 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95"
        type="button"
        aria-label="Next"
      ></button>
    ),
    prevArrow: (
      <button
        className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/90 hover:bg-white border border-gray-200 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95"
        type="button"
        aria-label="Previous"
      ></button>
    ),
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[101]">
      {/* Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-black/80"
        onClick={onClose}
      ></div>
      {/* Popup Inner */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-full w-[90%] lg:w-[60%] max-h-[90vh] z-[102]">
        {/* Close Button */}
        <button
          className="absolute -top-2.5 -right-2.5 lg:-top-2.5 lg:-right-2.5 w-8 h-8 lg:w-10 lg:h-10 bg-white border border-white rounded-full cursor-pointer transition-all duration-300 z-[2] hover:scale-110 active:scale-95 flex items-center justify-center"
          onClick={onClose}
          aria-label="Close popup"
        >
          <SvgIcon
            src={"assets/svgs/x-close.svg"}
            ariaLabel="text"
            width={24}
            height={24}
            className="size-[24px] shrink-0"
          />
        </button>
        {/* Slider Wrapper */}
        <div className="relative">
          <div className="[&_.slick-list]:m-0 [&_.slick-slide]:p-0">
            <Slider ref={sliderRef} {...settings}>
              {items.map((item, index) => (
                <div key={item.id || index} className="px-2">
                  {item.url ? (
                    <img
                      src={item.url}
                      alt={item.description || "Gallery"}
                      className="block mx-auto max-h-[75vh] w-auto"
                    />
                  ) : (
                    <div className="flex items-center justify-center min-h-[400px]">
                      <Skeleton.Image
                        active
                        style={{
                          width: "100%",
                          maxWidth: "800px",
                          height: "400px",
                        }}
                      />
                    </div>
                  )}
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
