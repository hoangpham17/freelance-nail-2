import Airtable from "airtable";

/**
 * Airtable Configuration
 * Get your API token from: https://airtable.com/create/tokens
 */
const AIRTABLE_CONFIG = {
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY || "",
  baseId: "appj9Es9rfmtwnDZn",
};

const base = new Airtable({ apiKey: AIRTABLE_CONFIG.apiKey }).base(
  AIRTABLE_CONFIG.baseId
);

export const AIRTABLE_ENDPOINTS = {
  aboutUs: "about-us",
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
