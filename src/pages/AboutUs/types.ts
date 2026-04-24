/** Section hiển thị trên trang About Us (sau khi map từ Airtable) */
export interface AboutUsSection {
  id: string;
  title: string;
  description: string;
  image: string;
  position: "left" | "right";
}

/** Record trả về từ Airtable — table aboutUs */
export interface AboutUsSectionRecord {
  id: string;
  title?: string;
  description?: string;
  image?: Array<{ url: string }>;
  position?: "left" | "right";
  order?: number;
}
