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
  title?: string;
  subtitle?: string;
  description?: string;
  cost?: string;
  price?: string;
  icon?: string | AirtableAttachment[];
  image?: string | AirtableAttachment[];
  category?: string;
  addons?: string;
};

export type ServiceCategory = {
  id: string;
  title: string;
  description: string;
  backgroundImage: string;
  services: ServiceItem[];
};
