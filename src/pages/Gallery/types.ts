export type GalleryRecord = {
  id?: string;
  url?: string | { url: string }[];
  description?: string;
  category?: string;
};

export type GalleryItem = {
  id: string;
  url: string;
  description?: string;
  category?: string;
};
