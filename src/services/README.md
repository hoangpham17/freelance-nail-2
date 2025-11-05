# Airtable Service

This directory contains utilities for fetching data from Airtable CSV endpoints.

## Setup

1. **Configure Endpoints**: Add your Airtable share URLs in `airtable.service.ts`

```typescript
export const AIRTABLE_ENDPOINTS = {
  aboutUs: "https://airtable.com/YOUR_APP_ID/YOUR_SHARE_ID",
  services: "https://airtable.com/YOUR_APP_ID/YOUR_SHARE_ID",
  // Add more endpoints as needed
};
```

> **Note**: The service automatically appends `?format=csv` to convert the share URL to CSV format

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

## How to Get Airtable Share URL

1. Open your Airtable base
2. Click "Share" on the view you want to export
3. Enable "Create a shareable link to this view"
4. Copy the share URL

Example:

```
https://airtable.com/appj9Es9rfmtwnDZn/shrfMsjWs3H6i5pFo
```

> The service will automatically append `?format=csv` when fetching data

## Features

- ✅ TypeScript support with generic types
- ✅ Automatic CSV parsing with PapaParse
- ✅ Loading and error states
- ✅ React hook for easy component integration
- ✅ Reusable service for any Airtable CSV endpoint
- ✅ Refetch capability for data updates

## Best Practices

1. **Define TypeScript interfaces** for your data structure
2. **Always handle loading and error states** in your components
3. **Use fallback data** for better user experience if Airtable is unavailable
4. **Cache data** if possible to reduce API calls
5. **Test with offline scenarios** to ensure graceful degradation
