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
  AIRTABLE_CONFIG.baseId,
);

export const AIRTABLE_ENDPOINTS = {
  home_title_block: "tblWoMVwhlg3WXK9v",
  home_aboutUs: "tblJ6EuS50OkbU91o",
  home_testimonial: "tblZbWKvBilnZB6ge",
  home_season_gallery: "tbloVi68PbIiBjGO8",
  services: "tblpfWm5eaqWkRNlf",
  list_services: "tblEjsDqCMgqQzDEN",
  banner: "tblBJE5SoZNzFEk4h",
  home_gallery: "tblh3ZJpTjB5NbFmJ",
  gallery: "tblSTkMoAhVrOXYS7",
  gallery_categories: "tbl7exhFV3gAEKFlr",
  promotion: "tblFjrUsoWmeWV82J",
  policies: "tblhhzm1SgbRiBJcc",
  aboutUs: "tblCEzLPT5nMFLRi1",
} as const;

export interface AirtableQueryOptions {
  filterByFormula?: string;
  sort?: Array<{ field: string; direction: "asc" | "desc" }>;
  pageSize?: number;
  offset?: string;
}

export const fetchAirtableData = async <T = Record<string, unknown>>(
  tableId: string,
  options?: AirtableQueryOptions,
): Promise<{ records: T[]; offset?: string }> => {
  const queryOptions: Record<string, unknown> = {};

  if (options?.filterByFormula) {
    queryOptions.filterByFormula = options.filterByFormula;
  }

  if (options?.sort && options.sort.length > 0) {
    queryOptions.sort = options.sort;
  }

  if (options?.pageSize) {
    queryOptions.pageSize = options.pageSize;
  }

  if (options?.offset) {
    queryOptions.offset = options.offset;
  }

  try {
    // Use REST API directly to get proper offset for cursor-based pagination
    const baseId = AIRTABLE_CONFIG.baseId;
    const apiKey = AIRTABLE_CONFIG.apiKey;

    // Build query parameters
    const params = new URLSearchParams();

    if (options?.filterByFormula) {
      params.append("filterByFormula", options.filterByFormula);
    }

    if (options?.sort && options.sort.length > 0) {
      options.sort.forEach((sort, index) => {
        params.append(`sort[${index}][field]`, sort.field);
        params.append(`sort[${index}][direction]`, sort.direction);
      });
    }

    if (options?.pageSize) {
      params.append("pageSize", options.pageSize.toString());
    }

    if (options?.offset) {
      params.append("offset", options.offset);
    }

    const url = `https://api.airtable.com/v0/${baseId}/${tableId}?${params.toString()}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Airtable API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    const records = (data.records || []).map(
      (record: { id: string; fields: Record<string, unknown> }) => ({
        id: record.id,
        ...record.fields,
      }),
    ) as T[];

    return {
      records,
      offset: data.offset || undefined,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    // If error is related to sort field, retry without sort
    if (
      options?.sort &&
      (errorMessage.includes("order") ||
        errorMessage.includes("field") ||
        errorMessage.includes("Invalid field") ||
        errorMessage.includes("UNKNOWN_FIELD_NAME"))
    ) {
      const optionsWithoutSort = { ...options };
      delete optionsWithoutSort.sort;

      // Retry with REST API without sort
      const baseId = AIRTABLE_CONFIG.baseId;
      const apiKey = AIRTABLE_CONFIG.apiKey;
      const params = new URLSearchParams();

      if (optionsWithoutSort.filterByFormula) {
        params.append("filterByFormula", optionsWithoutSort.filterByFormula);
      }

      if (optionsWithoutSort.pageSize) {
        params.append("pageSize", optionsWithoutSort.pageSize.toString());
      }

      if (optionsWithoutSort.offset) {
        params.append("offset", optionsWithoutSort.offset);
      }

      const url = `https://api.airtable.com/v0/${baseId}/${tableId}?${params.toString()}`;

      const retryResponse = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (!retryResponse.ok) {
        throw new Error(
          `Airtable API error: ${retryResponse.status} ${retryResponse.statusText}`,
        );
      }

      const retryData = await retryResponse.json();

      const retryRecords = (retryData.records || []).map(
        (record: { id: string; fields: Record<string, unknown> }) => ({
          id: record.id,
          ...record.fields,
        }),
      ) as T[];

      return {
        records: retryRecords,
        offset: retryData.offset || undefined,
      };
    }

    console.error("Error fetching data from Airtable:", error);
    console.error("Table ID:", tableId);
    console.error("Options:", options);
    throw error;
  }
};

// Legacy function for backward compatibility - fetches all records
export const fetchAllAirtableData = async <T = Record<string, unknown>>(
  tableId: string,
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
