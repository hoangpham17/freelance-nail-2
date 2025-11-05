import Airtable from "airtable";

/**
 * Airtable Configuration
 * Get your API token from: https://airtable.com/create/tokens
 */
const AIRTABLE_CONFIG = {
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY || "",
  baseId: "appj9Es9rfmtwnDZn",
};

// Initialize Airtable
const base = new Airtable({ apiKey: AIRTABLE_CONFIG.apiKey }).base(
  AIRTABLE_CONFIG.baseId
);

/**
 * Configuration for Airtable tables
 * Using table names (Airtable.js supports both table names and IDs)
 */
export const AIRTABLE_ENDPOINTS = {
  aboutUs: "about-us", // Table name from Airtable
  // Add more table names/IDs here as needed
  // services: "services",
  // gallery: "gallery",
} as const;

/**
 * Generic function to fetch data from Airtable using official API
 * @param tableId - The Airtable table ID or name
 * @returns Promise with parsed data
 */
export const fetchAirtableData = async <T = Record<string, unknown>>(
  tableId: string
): Promise<T[]> => {
  try {
    const records = await base(tableId).select().all();

    // Transform Airtable records to simpler format
    return records.map((record) => ({
      id: record.id,
      ...record.fields,
    })) as T[];
  } catch (error) {
    console.error("Error fetching data from Airtable:", error);
    throw error;
  }
};

/**
 * Fetch About Us data from Airtable
 */
export const fetchAboutUsData = async () => {
  try {
    const data = await fetchAirtableData(AIRTABLE_ENDPOINTS.aboutUs);
    return data;
  } catch (error) {
    console.error("Error fetching About Us data:", error);
    throw error;
  }
};
