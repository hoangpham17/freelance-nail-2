# Airtable Integration Guide

This project uses **Airtable Share URLs** to fetch data directly from shared views (no API key required!).

## 🚀 Quick Setup

### 1. Get Your Airtable Share URL

1. Open your Airtable base
2. Open the view you want to share
3. Click the **"Share view"** button (top right)
4. Enable **"Create a shareable link to this view"**
5. Copy the share URL (e.g., `https://airtable.com/appXXXXXXX/shrYYYYYYY`)

### 2. Add Share URL to Configuration

Edit `src/services/airtable.service.ts`:

```typescript
export const AIRTABLE_ENDPOINTS = {
  aboutUs: "https://airtable.com/appj9Es9rfmtwnDZn/shrfMsjWs3H6i5pFo",
  services: "https://airtable.com/appXXXXXXX/shrYYYYYYY", // Add your URL here
  gallery: "https://airtable.com/appXXXXXXX/shrZZZZZZZ", // Add your URL here
};
```

> **Note**: The service automatically converts share URLs to CSV format by appending `?format=csv`

### 3. Use in Component

```tsx
import { useAirtable } from "../../hooks/useAirtable";
import { AIRTABLE_ENDPOINTS } from "../../services/airtable.service";

interface MyData {
  title: string;
  description: string;
}

const MyComponent: React.FC = () => {
  const { data, loading, error } = useAirtable<MyData>(
    AIRTABLE_ENDPOINTS.aboutUs
  );

  const fallbackData = [{ title: "Title", description: "Description" }];
  const items = data && data.length > 0 ? data : fallbackData;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};
```

## ✨ Advantages

- **No API Key Required**: Use public share URLs directly
- **Simple Setup**: Just copy and paste the share URL
- **No Authentication**: No need to manage API tokens
- **Fast**: Direct CSV download is lightweight

## 📊 Data Format

The share URL is automatically converted to CSV format. PapaParse parses the CSV and returns an array of objects where:

- Column headers become object keys
- Each row becomes an object in the array

Example Airtable view:

| title       | description             | icon       |
| ----------- | ----------------------- | ---------- |
| Our Team    | Experienced technicians | icon-1.svg |
| Our Mission | Quality service         | icon-2.svg |

Becomes:

```typescript
[
  {
    title: "Our Team",
    description: "Experienced technicians",
    icon: "icon-1.svg",
  },
  { title: "Our Mission", description: "Quality service", icon: "icon-2.svg" },
];
```

## 🔒 Security Note

- Share URLs are **public** - anyone with the URL can access the data
- Only share views with data you want to be public
- For sensitive data, consider using the Airtable API with authentication

## 📚 Files

- `src/hooks/useAirtable.ts` - React hook for data fetching
- `src/services/airtable.service.ts` - Service functions with PapaParse
- `src/pages/AboutUs/AboutUs.tsx` - Working example

## 🐛 Troubleshooting

### CORS Errors

If you encounter CORS errors, make sure:

1. The view is properly shared (not private)
2. You're using the share URL, not the base URL
3. The URL format is: `https://airtable.com/appXXXXXXX/shrYYYYYYY`

### Empty Data

If data is empty:

1. Check that the view has records
2. Verify the share URL is correct
3. Make sure columns have headers (first row)
