import React, { useMemo, useState } from "react";
import { useAirtable } from "../../hooks/useAirtable";
import { AIRTABLE_ENDPOINTS } from "../../services/airtable.service";
import { GalleryItem, GalleryRecord } from "./types";
import CategoryTabs from "./components/CategoryTabs";
import BannerSection from "./components/BannerSection";
import GalleryGrid from "./components/GalleryGrid";
import GalleryPopup from "./components/GalleryPopup";
import LoadingPage from "../../components/LoadingPage";

const FILTERS = [
  { id: "All", label: "All" },
  { id: "nail_lounge", label: "Our Nail Lounge" },
  { id: "nail_art", label: "Our Nail Art" },
  { id: "face_relax", label: "Face Relax" },
];

const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupItems, setPopupItems] = useState<GalleryItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data: galleryData, loading } = useAirtable<GalleryRecord>(
    AIRTABLE_ENDPOINTS.gallery
  );

  const galleryItems: GalleryItem[] = useMemo(() => {
    if (!galleryData || galleryData.length === 0) {
      return [];
    }

    return galleryData.map((record, index) => {
      // Get image URL from new image field structure
      let imageUrl = "";
      if (
        record.image &&
        Array.isArray(record.image) &&
        record.image.length > 0
      ) {
        // Use the first image's URL
        imageUrl = record.image[0].url || "";
      } else if (record.url) {
        // Fallback to legacy url field for backward compatibility
        imageUrl = Array.isArray(record.url)
          ? record.url[0]?.url || ""
          : record.url || "";
      }

      return {
        id: record.id || `gallery-${index}`,
        url: imageUrl,
        description: record.description,
        category: record.category?.toLowerCase(),
      };
    });
  }, [galleryData]);

  const filteredItems = useMemo(() => {
    let items = galleryItems;

    // Filter by category
    if (activeFilter !== "All") {
      items = items.filter(
        (item) => item.category?.toLowerCase() === activeFilter.toLowerCase()
      );
    }

    // Filter by search query (description or category)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      items = items.filter((item) => {
        const descriptionMatch = item.description
          ?.toLowerCase()
          .includes(query);
        const categoryMatch = item.category?.toLowerCase().includes(query);
        return descriptionMatch || categoryMatch;
      });
    }

    return items;
  }, [activeFilter, searchQuery, galleryItems]);

  const openPopup = (index: number) => {
    setPopupItems(filteredItems);
    setSelectedIndex(index);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <main className="w-full relative">
      {loading && (!galleryData || galleryData.length === 0) && <LoadingPage />}

      <BannerSection />

      <CategoryTabs
        filters={FILTERS}
        activeFilter={activeFilter}
        onChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <GalleryGrid
        items={filteredItems}
        loading={loading}
        onItemClick={openPopup}
      />

      <GalleryPopup
        isOpen={isPopupOpen && popupItems.length > 0}
        items={popupItems}
        selectedIndex={selectedIndex}
        onClose={closePopup}
      />
    </main>
  );
};

export default Gallery;
