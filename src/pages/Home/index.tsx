import React, { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import GalleryPopup from "./components/GalleryPopup";
import { HomeGalleryItem } from "./types";
import ServiceSection from "./components/ServiceSection";
import AboutUs from "./components/AboutUs";
import GallerySection from "./components/GallerySection";
import TestimonialSection from "./components/TestimonialSection";

const Home: React.FC = () => {
  const [isGalleryPopupOpen, setIsGalleryPopupOpen] = useState(false);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);
  const [galleryItems, setGalleryItems] = useState<HomeGalleryItem[]>([]);

  useEffect(() => {
    document.body.classList.add("home-body");
    return () => {
      document.body.classList.remove("home-body");
    };
  }, []);

  const openGalleryPopup = (index: number) => {
    setSelectedGalleryIndex(index);
    setIsGalleryPopupOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeGalleryPopup = () => {
    setIsGalleryPopupOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <main className="home-page bg-black">
      <HeroSection />
      <ServiceSection />
      <AboutUs />
      <GallerySection
        onItemClick={openGalleryPopup}
        onGalleryItemsChange={setGalleryItems}
      />
      <TestimonialSection />
      <GalleryPopup
        isOpen={isGalleryPopupOpen}
        items={galleryItems}
        selectedIndex={selectedGalleryIndex}
        onClose={closeGalleryPopup}
      />
    </main>
  );
};

export default Home;
