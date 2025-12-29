export type AirtableAttachment = {
  id?: string;
  url?: string;
  filename?: string;
  size?: number;
  type?: string;
  width?: number;
  height?: number;
  thumbnails?: {
    small?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
    full?: { url: string; width: number; height: number };
  };
};

export type PromotionData = {
  id?: string;
  enabled?: boolean;
  start_date?: string; // Date string in format "YYYY-MM-DD"
  end_date?: string; // Date string in format "YYYY-MM-DD"
  title?: string;
  image?: AirtableAttachment[];
  priority?: number;
  index?: number;
};
