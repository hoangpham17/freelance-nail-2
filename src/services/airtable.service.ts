/**
 * Airtable Configuration
 * Get your API token from: https://airtable.com/create/tokens
 */
const AIRTABLE_CONFIG = {
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY || "",
  baseId: "appj9Es9rfmtwnDZn",
};

/**
 * Configuration for Airtable tables
 */
export const AIRTABLE_ENDPOINTS = {
  aboutUs: "tblWIqcxLfO7p3Vgs", // Replace with your table ID
  // Add more table IDs here as needed
  // services: "tblXXXXXXXXXXXXX",
  // gallery: "tblXXXXXXXXXXXXX",
} as const;

/**
 * Generic function to fetch data from Airtable API
 * @param tableId - The Airtable table ID
 * @returns Promise with parsed data
 */
export const fetchAirtableData = async <T = Record<string, unknown>>(
  tableId: string
): Promise<T[]> => {
  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.baseId}/${tableId}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_CONFIG.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Transform Airtable records to simpler format
    return data.records.map(
      (record: { id: string; fields: Record<string, unknown> }) => ({
        id: record.id,
        ...record.fields,
      })
    ) as T[];
  } catch (error) {
    console.error("Error fetching Airtable data:", error);
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
