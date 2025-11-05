// Generic Airtable response types
export interface AirtableField {
  [key: string]: string | number | boolean | string[] | undefined;
}

export interface AirtableRecord<T = AirtableField> {
  id: string;
  createdTime: string;
  fields: T;
}

export interface AirtableResponse<T = AirtableField> {
  records: AirtableRecord<T>[];
  offset?: string;
}

// About Us specific types
export interface AboutUsFields {
  description: string;
  title?: string;
  icon?: string;
  titleImage?: string;
  backgroundColor?: string;
}

export interface AboutUsRecord extends AirtableRecord<AboutUsFields> {}

export interface AboutUsResponse extends AirtableResponse<AboutUsFields> {}
