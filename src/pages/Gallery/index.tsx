import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { GalleryItem } from "./types";
import CategoryTabs from "./components/CategoryTabs";
import GalleryGrid from "./components/GalleryGrid";
import GalleryPopup from "./components/GalleryPopup";
import { useBaseOffset } from "@/hooks/useBaseOffset";
import { useScreen } from "@/hooks/useScreen";
import { useDebounce } from "@/hooks/useDebounce";
import { useGalleryItems } from "./useGalleryItems";
import { useGalleryCategories } from "./useGalleryCategories";
import { responsiveFontSizeArray } from "@/shared/utils/helper";
import galleryContent from "@/content/gallery.json";

const Gallery: React.FC = () => {
  const { isDesktop } = useScreen();
  const { mainTopSpacing } = useBaseOffset();
  const { filters, loading: categoriesLoading } = useGalleryCategories();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupItems, setPopupItems] = useState<GalleryItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Sync activeFilter when categories load: if current value not in list, reset to "All"
  useEffect(() => {
    if (categoriesLoading || filters.length <= 1) return;
    const ids = filters.map((f) => f.id);
    if (!ids.includes(activeFilter)) {
      setActiveFilter("All");
    }
  }, [filters, categoriesLoading, activeFilter]);

  // Debounce search query to avoid searching on every keystroke
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Use gallery items hook with category filter and search query
  const {
    galleryItems,
    loading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGalleryItems({
    activeFilter,
    debouncedSearchQuery,
  });

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
      {error && (
        <div className="p-4 bg-red-100 text-red-800 rounded m-4">
          <p>
            {(galleryContent as { error: { messagePrefix: string } }).error.messagePrefix}
            {error.message}
          </p>
          <p className="text-sm mt-2">
            {(galleryContent as { error: { hint: string } }).error.hint}
          </p>
        </div>
      )}

      {/* Banner Section */}
      <section className="relative w-full overflow-hidden px-4 md:px-6 lg:px-12 py-8 lg:py-12">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(/assets/images/Gallery/banner.png)`,
            backgroundSize: isDesktop ? "cover" : "cover",
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-0">
          <h1 className="relative">
<span
                className={clsx(
                  "block text-gold-gradient font-tangerine leading-[0.92]",
                  responsiveFontSizeArray(48, 96),
                )}
              >
                {(galleryContent as { banner: { title: string } }).banner.title}
              </span>
          </h1>
          {/* <div
            className="mt-4 lg:mt-6 h-px w-24 mx-auto"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.9) 0%, transparent 100%)",
            }}
          />
          <p
            className={clsx(
              "text-white/90 font-extralight uppercase tracking-[0.25em] mt-4 lg:mt-6",
              responsiveFontSizeArray(10, 11),
            )}
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.2)" }}
          >
            Madison Nail Lounge
          </p> */}
        </div>
      </section>

      <CategoryTabs
        filters={filters}
        activeFilter={activeFilter}
        onChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <article
        className="relative w-full"
        style={{
          background:
            "linear-gradient(180deg, #FEFCFA 0%, #FAF3EF 50%, #F5EDE8 100%)",
        }}
      >
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
