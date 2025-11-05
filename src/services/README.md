# Airtable Service

This directory contains utilities for fetching data from Airtable using the **official Airtable.js library**.

## Setup

### 1. Install Dependencies

```bash
npm install airtable
```

### 2. Get API Key

1. Go to https://airtable.com/create/tokens
2. Create a new token with `data.records:read` scope
3. Add access to your base
4. Copy the token

### 3. Create `.env` File

Create a `.env` file in the project root:

```env
VITE_AIRTABLE_API_KEY=your_api_key_here
```

### 4. Configure Table IDs

Add your table IDs in `airtable.service.ts`:

```typescript
export const AIRTABLE_ENDPOINTS = {
  aboutUs: "tblWIqcxLfO7p3Vgs",
  services: "tblXXXXXXXXXXXXX", // Replace with your table ID
  // Add more table IDs as needed
};
```

> **Tip**: Get table ID from Airtable URL: `https://airtable.com/appXXX/tblYYY/...`

## Usage

### Method 1: Using the React Hook (Recommended)

```tsx
import { useAirtable } from "../hooks/useAirtable";
import { AIRTABLE_ENDPOINTS } from "../services/airtable.service";

interface MyData {
  title: string;
  description: string;
}

function MyComponent() {
  const { data, loading, error, refetch } = useAirtable<MyData>(
    AIRTABLE_ENDPOINTS.aboutUs
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map((item, index) => (
        <div key={index}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Method 2: Using the Service Directly

```typescript
import {
  fetchAirtableData,
  AIRTABLE_ENDPOINTS,
} from "./services/airtable.service";

async function getData() {
  try {
    const data = await fetchAirtableData(AIRTABLE_ENDPOINTS.aboutUs);
    console.log(data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}
```

## How It Works

### Data Transformation

Airtable returns records in this format:

```javascript
{
  id: "recXXXXXXXXXXXXXX",
  fields: {
    title: "Our Team",
    description: "Experienced technicians"
  }
}
```

The service automatically transforms it to:

```javascript
{
  id: "recXXXXXXXXXXXXXX",
  title: "Our Team",
  description: "Experienced technicians"
}
```

### API Call Flow

```
React Component → useAirtable Hook → fetchAirtableData → Airtable API
                                                              ↓
                                                        Transform Data
                                                              ↓
React Component ← useState ← Promise resolves ← Return Data
```

## Features

- ✅ **Official Library**: Maintained by Airtable
- ✅ TypeScript support with generic types
- ✅ Automatic data transformation
- ✅ Loading and error states
- ✅ React hook for easy component integration
- ✅ Refetch capability for data updates
- ✅ **No CORS issues** - Official API handles everything
- ✅ Advanced filtering and sorting support

## Advanced Usage

### Filtering Records

Modify `fetchAirtableData` to accept filter formula:

```typescript
export const fetchAirtableData = async <T = Record<string, unknown>>(
  tableId: string,
  options?: {
    filterByFormula?: string;
    sort?: Array<{ field: string; direction: "asc" | "desc" }>;
    maxRecords?: number;
  }
): Promise<T[]> => {
  const query = base(tableId).select(options || {});
  const records = await query.all();

  return records.map((record) => ({
    id: record.id,
    ...record.fields,
  })) as T[];
};
```

Usage:

```typescript
// Get only active services
const services = await fetchAirtableData(AIRTABLE_ENDPOINTS.services, {
  filterByFormula: "{Status} = 'Active'",
});

// Sort by name
const sorted = await fetchAirtableData(AIRTABLE_ENDPOINTS.services, {
  sort: [{ field: "Name", direction: "asc" }],
});

// Limit results
const limited = await fetchAirtableData(AIRTABLE_ENDPOINTS.services, {
  maxRecords: 10,
});
```

## Best Practices

1. **Define TypeScript interfaces** for your data structure
2. **Always handle loading and error states** in your components
3. **Use fallback data** for better user experience if Airtable is unavailable
4. **Don't commit `.env` file** - it's already in `.gitignore`
5. **Use minimal API scopes** - only request what you need
6. **Cache data** when appropriate to reduce API calls
7. **Test with offline scenarios** to ensure graceful degradation

## Troubleshooting

### API Key Not Working

- Restart dev server after changing `.env`
- Check API key has correct scopes
- Verify base access is granted

### "Table not found" Error

- Check table ID is correct
- Verify API key has access to the table
- Table might be renamed or deleted

### Slow Response Times

- Consider caching data
- Use filtering to reduce payload size
- Check Airtable API rate limits

## Security Notes

- ⚠️ **Never commit** your `.env` file
- ⚠️ API keys starting with `VITE_` are exposed to client-side
- ⚠️ Only use `data.records:read` scope if you only need to read
- ⚠️ For sensitive data, consider using a backend proxy

## Rate Limits

Airtable API has rate limits:

- **5 requests per second** per base
- If exceeded, requests will be queued

The official library handles rate limiting automatically.

## Learn More

- [Airtable API Documentation](https://airtable.com/developers/web/api/introduction)
- [Airtable.js GitHub](https://github.com/Airtable/airtable.js)
- [Create API Token](https://airtable.com/create/tokens)
