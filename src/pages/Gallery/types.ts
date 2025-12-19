export type AirtableImage = {
  id: string;
  url: string;
  width: number;
  height: number;
  filename: string;
  size: number;
  type: string;
  thumbnails: {
    small: { url: string; width: number; height: number };
    large: { url: string; width: number; height: number };
    full: { url: string; width: number; height: number };
  };
};

export type GalleryRecord = {
  id?: string;
  image?: AirtableImage[];
  description?: string;
  category?: string;
  index?: number;
  order?: number;
  // Legacy support
  url?: string | { url: string }[];
};

export type GalleryItem = {
  id: string;
  url: string;
  description?: string;
  category?: string;
  keyword?: string;
};
