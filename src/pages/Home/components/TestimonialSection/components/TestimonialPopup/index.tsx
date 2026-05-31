import React, { useRef, useEffect } from "react";
import Slider, { Settings } from "react-slick";
import { Skeleton } from "antd";
import { NavigationArrows } from "@/components/NavigationArrows";
import {
  PopupCloseButton,
  POPUP_CLOSE_OVERLAY_CLASS,
} from "@/components/PopupCloseButton";
import { TestimonialItem } from "../../useTestimonials";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface TestimonialPopupProps {
  isOpen: boolean;
  items: TestimonialItem[];
  selectedIndex: number;
  onClose: () => void;
  onSlideChange?: (index: number) => void;
}

const TestimonialPopup: React.FC<TestimonialPopupProps> = ({
  isOpen,
  items,
  selectedIndex,
  onClose,
  onSlideChange,
}) => {
  const sliderRef = useRef<Slider | null>(null);

  // Filter items that have images
  const itemsWithImages = items.filter((item) => item.imageUrl);

  // Find the actual index in filtered array
  // Count how many items with images come before selectedIndex
  let count = 0;
  for (let i = 0; i < selectedIndex && i < items.length; i++) {
    if (items[i].imageUrl) {
      count++;
    }
  }
  const actualSelectedIndex = count;

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

  // Update slider when selectedIndex changes from outside
  useEffect(() => {
    if (sliderRef.current && isOpen) {
      let count = 0;
      for (let i = 0; i < selectedIndex && i < items.length; i++) {
        if (items[i].imageUrl) {
          count++;
        }
      }
      const targetIndex = count;
      if (targetIndex >= 0 && targetIndex < itemsWithImages.length) {
        sliderRef.current.slickGoTo(targetIndex);
      }
    }
  }, [selectedIndex, isOpen, items, itemsWithImages.length]);

  if (!isOpen || itemsWithImages.length === 0) return null;

  const settings: Settings = {
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: actualSelectedIndex >= 0 ? actualSelectedIndex : 0,
    afterChange: (currentSlide: number) => {
      // Find the original index in items array
      if (onSlideChange && itemsWithImages[currentSlide]) {
        const currentItem = itemsWithImages[currentSlide];
        const originalIndex = items.findIndex(
          (item) => item.id === currentItem.id,
        );
        if (originalIndex >= 0) {
          onSlideChange(originalIndex);
        }
      }
    },
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
        <PopupCloseButton
          onClick={onClose}
          className={POPUP_CLOSE_OVERLAY_CLASS}
        />
        {/* Slider Wrapper */}
        <div className="relative">
          <div className="[&_.slick-list]:m-0 [&_.slick-slide]:p-0">
            <Slider ref={sliderRef} {...settings}>
              {itemsWithImages.map((item, index) => (
                <div key={item.id || index} className="px-2">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name || "Testimonial"}
                      className="block mx-auto max-h-[75vh] w-auto rounded-lg"
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

          <NavigationArrows
            className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-10 px-4"
            onPrev={() => sliderRef.current?.slickPrev()}
            onNext={() => sliderRef.current?.slickNext()}
          />
        </div>
      </div>
    </div>
  );
};

export default TestimonialPopup;
