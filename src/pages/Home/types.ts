export type BannerRecord = {
  id?: string;
  desktop?: string | { url: string }[];
  mobile?: string | { url: string }[];
  order?: number;
};

export type GalleryRecord = {
  id?: string;
  url?: string | { url: string }[];
  description?: string;
};

export type BannerItem = {
  id?: string;
  desktop?: string;
  mobile?: string;
};

export type HomeGalleryItem = {
  id?: string;
  url?: string;
  description?: string;
};

export type WhyChooseItem = {
  value: number;
  label: string;
};
