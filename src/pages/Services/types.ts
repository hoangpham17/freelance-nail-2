export type AirtableAttachment = {
  id?: string;
  url?: string;
  filename?: string;
  size?: number;
  type?: string;
};

export type ServiceItem = {
  id?: string;
  name?: string;
  description?: string;
  price?: string;
  image?: string | AirtableAttachment[];
  category?: string | string[];
  add_on_services?: string;
  index?: number;
  order?: number;
};

export type ServiceCategory = {
  id: string;
  title: string;
  slug: string;
  description: string;
  titleBackgroundImage: string;
  sectionBackgroundImage: string;
  services: ServiceItem[];
};

export type ServiceCategoryRecord = {
  id?: string;
  name?: string;
  title_background_image?: string | AirtableAttachment[];
  section_background_image?: string | AirtableAttachment[];
  slug?: string;
  description?: string;
  index?: number;
};
