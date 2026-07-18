import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { PATHS } from "@/routes/Routes";
import { SectionHeadingLine } from "@/components/SectionHeadingLine";
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
import { PageDecoLines } from "@/components/PageDecoLines";
import "./gallery.css";

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
      className="gallery-page relative w-full min-h-screen bg-black text-madison-text"
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

      {/* Banner Section — cinematic hero (About Us style) */}
      <section className="relative w-full overflow-hidden flex items-center justify-center px-4 md:px-6 lg:px-12 py-14 lg:py-20 min-h-[20rem] lg:min-h-[calc(clamp(18rem,42vw,28rem)_+_4rem)]">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(/assets/images/Gallery/banner.jpeg)`,
            backgroundSize: isDesktop ? "cover" : "cover",
          }}
        />
        {/* Base veil — keeps photo visible */}
        <div className="absolute inset-0 bg-black/15" />
        {/* Cinematic scrim — darkens toward the copy */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.78) 100%)",
          }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-0">
          <h1 className="relative">
            <span
              className={clsx(
                "block text-gold-gradient font-tangerine leading-[0.92]",
                responsiveFontSizeArray(36, 96),
              )}
            >
              {(galleryContent as { banner: { title: string } }).banner.title}
            </span>
          </h1>

          <SectionHeadingLine className="mx-auto mt-4" />

          <p
            className={clsx(
              "mt-4 lg:mt-5 max-w-[640px] text-center font-light leading-relaxed text-white/85",
              responsiveFontSizeArray(14, 18),
            )}
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.45)" }}
          >
            {
              (galleryContent as { banner: { tagline: string } }).banner
                .tagline
            }
          </p>

          <div className="mt-6 lg:mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <Link to={PATHS.services} className="madison-btn-primary">
              {
                (galleryContent as { banner: { ctaServices: string } }).banner
                  .ctaServices
              }
            </Link>
            <Link to={PATHS.contactUs} className="madison-btn-outline">
              {
                (galleryContent as { banner: { ctaContact: string } }).banner
                  .ctaContact
              }
            </Link>
          </div>
        </div>
      </section>

      <div className="gallery-body relative w-full">
        <PageDecoLines variant="gallery" intensity="strong" />

        <CategoryTabs
          filters={filters}
          activeFilter={activeFilter}
          onChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <section
          className="gallery-body__grid"
          aria-label="Gallery images"
        >
          <GalleryGrid
            items={filteredItems}
            loading={loading}
            onItemClick={openPopup}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </section>
      </div>

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
