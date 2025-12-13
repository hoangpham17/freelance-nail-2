import React, { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import WelcomeSection from "./components/WelcomeSection";
import NailBeautifySection from "./components/NailBeautifySection";
import TestimonialSection from "./components/TestimonialSection";
import GalleryPopup from "./components/GalleryPopup";
import { HomeGalleryItem } from "./types";

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
    <main className="home-page">
      <HeroSection />
      <WelcomeSection />
      <NailBeautifySection
        onItemClick={openGalleryPopup}
        onGalleryItemsChange={setGalleryItems}
      />
      <TestimonialSection
        galleryImages={galleryItems.map((item) => ({
          id: item.id || `gallery-${Math.random()}`,
          url: item.url || "/assets/images/Slide/Photo.jpg",
        }))}
      />
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
