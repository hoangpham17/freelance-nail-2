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
  visa_surcharge?: string;
  category?: string | string[];
  add_on_services?: string;
  index?: number;
  order?: number;
  is_expand?: boolean;
};

export type ServiceCategory = {
  id: string;
  order: number;
  title: string;
  slug: string;
  description: string;
  section_image: string;
  icon: string;
  additional_charge: string;
  services: ServiceItem[];
};

export type ServiceCategoryRecord = {
  id?: string;
  name?: string;
  section_image?: string | AirtableAttachment[];
  slug?: string;
  description?: string;
  index?: number;
  icon?: string | AirtableAttachment[];
  order?: number;
  additional_charge?: string;
};
