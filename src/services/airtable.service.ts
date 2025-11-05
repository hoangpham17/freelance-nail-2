import Papa from "papaparse";

/**
 * Configuration for Airtable share URLs
 * These are the exact URLs from Airtable shared views
 */
export const AIRTABLE_ENDPOINTS = {
  aboutUs: "https://airtable.com/appj9Es9rfmtwnDZn/shrfMsjWs3H6i5pFo",
  // Add more share URLs here as needed
  // services: "https://airtable.com/appj9Es9rfmtwnDZn/shrXXXXXXXXXXXX",
  // gallery: "https://airtable.com/appj9Es9rfmtwnDZn/shrXXXXXXXXXXXX",
} as const;

/**
 * Generic function to fetch data from Airtable share URL
 * @param shareUrl - The Airtable share URL
 * @returns Promise with parsed data
 */
export const fetchAirtableData = async <T = Record<string, unknown>>(
  shareUrl: string
): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    try {
      // Convert share URL to CSV format
      const csvUrl = `${shareUrl}?format=csv`;

      Papa.parse(csvUrl, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors && results.errors.length > 0) {
            console.warn("CSV parsing warnings:", results.errors);
          }
          resolve(results.data as T[]);
        },
        error: (error: Error) => {
          console.error("CSV Download Error:", error);
          reject(error);
        },
      });
    } catch (error) {
      console.error("Error fetching Airtable data:", error);
      reject(error);
    }
  });
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
