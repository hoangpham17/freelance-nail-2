export type BannerRecord = {
  id?: string;
  desktop?: { url: string }[];
  mobile?: { url: string }[];
  order?: number;
  banner_title?: string;
  is_signup?: boolean;
  button_title?: string;
};

export type GalleryRecord = {
  id?: string;
  image?:
    | string
    | Array<{
        id?: string;
        url?: string;
        filename?: string;
        type?: string;
        thumbnails?: {
          full?: {
            url: string;
          };
        };
      }>;
  index?: number;
  order?: number;
};

export type BannerItem = {
  id?: string;
  desktop?: string;
  mobile?: string;
  banner_title?: string;
  button_title?: string;
  is_signup?: boolean;
};

export type HomeGalleryItem = {
  id?: string;
  url?: string;
  isVideo?: boolean;
};

export type WhyChooseItem = {
  value: number;
  label: string;
};

export type HomeCommentRecord = {
  id?: string;
  guest_name?: string;
  comment?: string;
  order?: number;
  image?:
    | string
    | Array<{
        id?: string;
        url?: string;
        thumbnails?: {
          full?: {
            url: string;
          };
        };
      }>;
};

export type HomeTitleBlockRecord = {
  block?: string;
  title?: string;
  sub_title?: string;
  description?: string;
  is_season_gallery?: boolean;
};

export type AboutUsItemRecord = {
  id: string;
  image?: any[];
  note?: string;
  order?: number;
};

export type AboutUsItem = {
  id: string;
  imageUrl?: string;
  note?: string;
  order: number;
};
