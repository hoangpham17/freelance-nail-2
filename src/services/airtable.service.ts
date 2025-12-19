import Airtable from "airtable";

/**
 * Airtable Configuration
 * Get your API token from: https://airtable.com/create/tokens
 */
const AIRTABLE_CONFIG = {
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY || "",
  baseId: "appUYBhhvXCbvE5GN",
};

const base = new Airtable({ apiKey: AIRTABLE_CONFIG.apiKey }).base(
  AIRTABLE_CONFIG.baseId
);

export const AIRTABLE_ENDPOINTS = {
  aboutUs: "about-us",
  services: "tblpfWm5eaqWkRNlf",
  list_services: "tblEjsDqCMgqQzDEN",
  banner: "tblBJE5SoZNzFEk4h",
  home_gallery: "tblh3ZJpTjB5NbFmJ",
  gallery: "tblSTkMoAhVrOXYS7",
  promotion: "tblFjrUsoWmeWV82J",
  home_comments: "tblZbWKvBilnZB6ge",
  host_a_party: "tblRWjOo4Her93N0l",
  policies: "tblhhzm1SgbRiBJcc",
} as const;

export const fetchAirtableData = async <T = Record<string, unknown>>(
  tableId: string
): Promise<T[]> => {
  try {
    const records = await base(tableId).select().all();

    return records.map((record) => ({
      id: record.id,
      ...record.fields,
    })) as T[];
  } catch (error) {
    console.error("Error fetching data from Airtable:", error);
    throw error;
  }
};

export const fetchAboutUsData = async () => {
  try {
    const data = await fetchAirtableData(AIRTABLE_ENDPOINTS.aboutUs);
    return data;
  } catch (error) {
    console.error("Error fetching About Us data:", error);
    throw error;
  }
};

/**
 * Create a new record in Airtable
 * @param tableId - The table ID to create the record in
 * @param fields - The fields to set for the new record (can be string, number, or boolean)
 * @returns The created record
 */
export const createAirtableRecord = async (
  tableId: string,
  fields: Record<string, string | number | boolean>
): Promise<{ id: string; fields: Record<string, unknown> }> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const records = await base(tableId).create([
      {
        fields: fields as any,
      },
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const record = (records as any)[0];
    return {
      id: record.id,
      fields: record.fields,
    };
  } catch (error) {
    console.error("Error creating record in Airtable:", error);
    throw error;
  }
};
