import React, { useMemo, useState } from "react";
import { useAirtable } from "../../hooks/useAirtable";
import { AIRTABLE_ENDPOINTS } from "../../services/airtable.service";
import { GalleryItem, GalleryRecord } from "./types";
import GalleryFilters from "./components/GalleryFilters";
import GalleryGrid from "./components/GalleryGrid";
import GallerySlider from "./components/GallerySlider";
import GalleryPopup from "./components/GalleryPopup";

const LEGACY_GALLERY: GalleryItem[] = [
  {
    id: "gallery-1",
    url: "/assets/images/Gallery/img-1.jpg",
    category: "nail_lounge",
  },
  {
    id: "gallery-2",
    url: "/assets/images/Gallery/img-2.jpg",
    category: "nail_lounge",
  },
  {
    id: "gallery-3",
    url: "/assets/images/Gallery/img-3.jpg",
    category: "nail_lounge",
  },
  {
    id: "gallery-4",
    url: "/assets/images/Gallery/img-4.jpg",
    category: "nail_art",
  },
  {
    id: "gallery-5",
    url: "/assets/images/Gallery/img-5.jpg",
    category: "nail_art",
  },
  {
    id: "gallery-6",
    url: "/assets/images/Gallery/img-6.jpg",
    category: "nail_art",
  },
  {
    id: "gallery-7",
    url: "/assets/images/Gallery/img-7.jpg",
    category: "nail_art",
  },
  {
    id: "gallery-8",
    url: "/assets/images/Gallery/img-8.jpg",
    category: "nail_lounge",
  },
  {
    id: "gallery-9",
    url: "/assets/images/Gallery/img-9.jpg",
    category: "nail_lounge",
  },
  {
    id: "gallery-10",
    url: "/assets/images/Gallery/img-10.jpg",
    category: "nail_lounge",
  },
  {
    id: "gallery-11",
    url: "/assets/images/Gallery/img-11.jpg",
    category: "nail_art",
  },
  {
    id: "gallery-12",
    url: "/assets/images/Gallery/img-12.jpg",
    category: "nail_art",
  },
  {
    id: "gallery-13",
    url: "/assets/images/Gallery/img-13.jpg",
    category: "nail_art",
  },
  {
    id: "gallery-14",
    url: "/assets/images/Gallery/img-14.jpg",
    category: "nail_art",
  },
];

const FILTERS = [
  { id: "All", label: "All" },
  { id: "nail_lounge", label: "Our Nail Lounge" },
  { id: "nail_art", label: "Our Nail Art" },
];

const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupItems, setPopupItems] = useState<GalleryItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data: galleryData, loading } = useAirtable<GalleryRecord>(
    AIRTABLE_ENDPOINTS.gallery
  );

  const galleryItems: GalleryItem[] = useMemo(() => {
    if (!galleryData || galleryData.length === 0) {
      return LEGACY_GALLERY;
    }

    return galleryData.map((record, index) => ({
      id: record.id || `gallery-${index}`,
      url: Array.isArray(record.url)
        ? record.url[0]?.url || ""
        : record.url || "",
      description: record.description,
      category: record.category?.toLowerCase(),
    }));
  }, [galleryData]);

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") {
      return galleryItems;
    }
    return galleryItems.filter(
      (item) => item.category?.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [activeFilter, galleryItems]);

  const openPopup = (index: number, items: GalleryItem[]) => {
    setPopupItems(items);
    setSelectedIndex(index);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <main className="gallery-page">
      <section className="gallery-wrapper">
        <div className="container">
          <div className="inner">
            <div className="tab-wrapper">
              <GalleryFilters
                filters={FILTERS}
                activeFilter={activeFilter}
                onChange={setActiveFilter}
              />
              <div className="tab-container">
                <GalleryGrid
                  items={filteredItems}
                  loading={loading}
                  onOpen={openPopup}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <GallerySlider items={galleryItems} onOpen={openPopup} />

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
