import React, { useMemo, useState, useEffect } from "react";
import { useInfiniteGallery } from "../../hooks/useInfiniteGallery";
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

  // Use infinite scroll hook with category filter
  const {
    data: galleryData,
    loading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteGallery<GalleryRecord>(
    activeFilter !== "All" ? activeFilter : undefined,
    21
  );

  const galleryItems: GalleryItem[] = useMemo(() => {
    if (!galleryData || galleryData.length === 0) {
      return [];
    }

    const items = galleryData.map((record, index) => {
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

      const item = {
        id: record.id || `gallery-${index}`,
        url: imageUrl,
        description: record.description,
        category: record.category?.toLowerCase(),
      };

      return item;
    });

    const itemsWithImages = items.filter((item) => item.url);

    // Return only items with images
    return itemsWithImages;
  }, [galleryData]);

  // Only filter by search query (category filtering is done via API)
  const filteredItems = useMemo(() => {
    let items = galleryItems;

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
  }, [searchQuery, galleryItems]);

  const openPopup = (index: number) => {
    setPopupItems(filteredItems);
    setSelectedIndex(index);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Scroll to top when filter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeFilter]);

  return (
    <main className="w-full relative">
      {loading && (!galleryData || galleryData.length === 0) && <LoadingPage />}

      {error && (
        <div className="p-4 bg-red-100 text-red-800 rounded m-4">
          <p>Error loading gallery: {error.message}</p>
          <p className="text-sm mt-2">Check console for more details</p>
        </div>
      )}

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
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
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
