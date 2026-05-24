export const GALLERY_ITEMS_PER_SLIDE = 6;

export function chunkGallerySlides<T>(
  items: T[],
  perSlide = GALLERY_ITEMS_PER_SLIDE,
): T[][] {
  if (items.length === 0) return [];
  const slides: T[][] = [];
  for (let i = 0; i < items.length; i += perSlide) {
    slides.push(items.slice(i, i + perSlide));
  }
  return slides;
}
