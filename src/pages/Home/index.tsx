import React, { useEffect, useMemo, useState } from "react";
import { useAirtable } from "../../hooks/useAirtable";
import { AIRTABLE_ENDPOINTS } from "../../services/airtable.service";
import BannerSlider from "./components/BannerSlider";
import ServicesHighlight from "./components/ServicesHighlight";
import WhyChooseUs from "./components/WhyChooseUs";
import HomeGallery from "./components/HomeGallery";
import GalleryPopup from "./components/GalleryPopup";
import {
  BannerItem,
  BannerRecord,
  GalleryRecord,
  HomeGalleryItem,
  WhyChooseItem,
} from "./types";

const WHY_CHOOSE_US: WhyChooseItem[] = [
  { value: 39, label: "Colors for choose" },
  { value: 600, label: "More booking Online" },
  { value: 1000, label: "More members visited here" },
  { value: 600, label: "Posted" },
];

const Home: React.FC = () => {
  const [isGalleryPopupOpen, setIsGalleryPopupOpen] = useState(false);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);
  useEffect(() => {
    document.body.classList.add("home-body");
    return () => {
      document.body.classList.remove("home-body");
    };
  }, []);

  const { data: bannerRecords } = useAirtable<BannerRecord>(
    AIRTABLE_ENDPOINTS.banner
  );
  const { data: galleryRecords } = useAirtable<GalleryRecord>(
    AIRTABLE_ENDPOINTS.home_gallery
  );

  const bannerItems: BannerItem[] = useMemo(() => {
    if (!bannerRecords || bannerRecords.length === 0) {
      return [
        {
          id: "fallback-1",
          desktop: "/assets/images/Background/home-1.jpg",
          mobile: "/assets/images/Background/home-mb-1.jpg",
        },
      ];
    }

    return bannerRecords
      .slice()
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map((record) => ({
        id: record.id,
        desktop: Array.isArray(record.desktop)
          ? record.desktop[0]?.url
          : record.desktop,
        mobile: Array.isArray(record.mobile)
          ? record.mobile[0]?.url
          : record.mobile,
      }));
  }, [bannerRecords]);

  const galleryItems: HomeGalleryItem[] = useMemo(() => {
    if (!galleryRecords || galleryRecords.length === 0) {
      return [
        { id: "gallery-1", url: "/assets/images/Slide/Photo.jpg" },
        { id: "gallery-2", url: "/assets/images/Slide/Photo-2.jpg" },
        { id: "gallery-3", url: "/assets/images/Slide/Photo-3.jpg" },
      ];
    }

    return galleryRecords.map((record) => ({
      id: record.id,
      url: Array.isArray(record.url) ? record.url[0]?.url : record.url,
      description: record.description,
    }));
  }, [galleryRecords]);

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
      <BannerSlider
        items={bannerItems}
        campaignText="GIFT CARDS ARE AVAILABLE FOR PURCHASE IN-STORE ONLY"
      />
      <ServicesHighlight />
      <WhyChooseUs items={WHY_CHOOSE_US} />
      <HomeGallery items={galleryItems} onOpen={openGalleryPopup} />
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
