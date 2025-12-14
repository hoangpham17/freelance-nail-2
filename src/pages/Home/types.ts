export type BannerRecord = {
  id?: string;
  desktop?: { url: string }[];
  mobile?: { url: string }[];
  index?: number;
  order?: number;
};

export type GalleryRecord = {
  id?: string;
  url?:
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
  description?: string;
  index?: number;
  text_color?: string;
  text_position?: "left" | "right";
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

export type HomeCommentRecord = {
  id?: string;
  guest_name?: string;
  comment?: string;
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
