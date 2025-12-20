import Airtable from "airtable";
import { AnyObject } from "antd/es/_util/type";

/**
 * Airtable Write Configuration
 * For write operations (create, update, delete)
 * Get your API token from: https://airtable.com/create/tokens
 */
const AIRTABLE_WRITE_CONFIG = {
  apiKey: import.meta.env.VITE_AIRTABLE_API_WRITE_KEY || "",
  baseId: "appJtSKIhhVpKJgu5",
};

const baseWrite = new Airtable({ apiKey: AIRTABLE_WRITE_CONFIG.apiKey }).base(
  AIRTABLE_WRITE_CONFIG.baseId
);

export const AIRTABLE_WRITE_ENDPOINTS = {
  host_a_party: "tbliW4narn1i67BdW",
  guest_contact: "tbldJLGY3OaSVOYKk",
} as const;

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
    const records = await baseWrite(tableId).create([
      {
        fields: fields as AnyObject,
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
