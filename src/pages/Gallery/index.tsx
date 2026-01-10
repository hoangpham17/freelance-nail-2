import React, { useMemo, useState, useEffect } from "react";
import { useInfiniteGallery } from "../../hooks/useInfiniteGallery";
import { GalleryItem, GalleryRecord } from "./types";
import CategoryTabs from "./components/CategoryTabs";
import BannerSection from "./components/BannerSection";
import GalleryGrid from "./components/GalleryGrid";
import GalleryPopup from "./components/GalleryPopup";
import LoadingPage from "../../components/LoadingPage";
import { useBaseOffset } from "@/hooks/useBaseOffset";
import { useScreen } from "@/hooks/useScreen";
import { useDebounce } from "@/hooks/useDebounce";

const FILTERS = [
  { id: "All", label: "All" },
  { id: "nail_lounge", label: "Our Nail Lounge" },
  { id: "nail_art", label: "Our Nail Art" },
  { id: "face_relax", label: "Face Relax" },
];

const Gallery: React.FC = () => {
  const { isDesktop } = useScreen();
  const { mainTopSpacing, campaignBarHeight } = useBaseOffset();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupItems, setPopupItems] = useState<GalleryItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Debounce search query to avoid searching on every keystroke
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Use infinite scroll hook with category filter and search query
  const {
    data: galleryData,
    loading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteGallery<GalleryRecord>(
    activeFilter !== "All" ? activeFilter : undefined,
    21,
    debouncedSearchQuery.trim() || undefined
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

  // Search and category filtering are now done via API
  // No need for client-side filtering anymore
  const filteredItems = galleryItems;

  const openPopup = (index: number) => {
    setPopupItems(filteredItems);
    setSelectedIndex(index);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Scroll to top when filter or debounced search query changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeFilter, debouncedSearchQuery]);

  return (
    <main
      className="w-full relative"
      style={{ paddingTop: `${mainTopSpacing}px` }}
    >
      {loading && (!galleryData || galleryData.length === 0) && <LoadingPage />}

      {error && (
        <div className="p-4 bg-red-100 text-red-800 rounded m-4">
          <p>Error loading gallery: {error.message}</p>
          <p className="text-sm mt-2">Check console for more details</p>
        </div>
      )}

      <div
        className="absolute lg:left-1/2 lg:-translate-x-1/2 h-[328px] lg:h-[657px] w-full"
        style={{
          backgroundImage: `url(/assets/images/Gallery/banner.png)`,
          backgroundSize: "auto 100%",
          backgroundPosition: isDesktop ? "center" : "80% center",
          backgroundRepeat: "no-repeat",
          top: campaignBarHeight,
        }}
      />

      <article>
        <BannerSection />

        <section aria-label="Gallery filters">
          <CategoryTabs
            filters={FILTERS}
            activeFilter={activeFilter}
            onChange={setActiveFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </section>

        <section aria-label="Gallery images">
          <GalleryGrid
            items={filteredItems}
            loading={loading}
            onItemClick={openPopup}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </section>
      </article>

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
