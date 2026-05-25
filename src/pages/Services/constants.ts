/** Sticky category tabs bar height (single-row swiper). */
export const SERVICE_CATEGORY_TABS_HEIGHT = {
  desktop: 56,
  mobile: 32,
} as const;

export function getServiceCategoryTabsHeight(isDesktop: boolean): number {
  return isDesktop
    ? SERVICE_CATEGORY_TABS_HEIGHT.desktop
    : SERVICE_CATEGORY_TABS_HEIGHT.mobile;
}
