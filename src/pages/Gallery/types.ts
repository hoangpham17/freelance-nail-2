export type AirtableImage = {
  id: string;
  url: string;
  width?: number;
  height?: number;
  filename?: string;
  size?: number;
  type?: string;
  thumbnails?: {
    small: { url: string; width: number; height: number };
    large: { url: string; width: number; height: number };
    full: { url: string; width: number; height: number };
  };
};

/** Dùng cho Home / gallery đơn giản: category 1 giá trị string */
export type HomeGalleryRecord = {
  id?: string;
  image?: AirtableImage[];
  description?: string;
  keyword?: string;
  category?: string;
  index?: number;
  order?: number;
  url?: string | { url: string }[];
};

export type HomeGalleryItem = {
  id: string;
  url: string;
  category?: string;
  keyword?: string;
};

/** Dùng cho Gallery page: Airtable trả về category là array, thực tế chỉ 1 item */
export type GalleryRecord = {
  id?: string;
  image?: AirtableImage[];
  description?: string;
  keyword?: string;
  category?: string[];
  index?: number;
  order?: number;
  url?: string | { url: string }[];
};

export type GalleryItem = {
  id: string;
  url: string;
  isVideo?: boolean;
  category?: string[];
  keyword?: string;
};
