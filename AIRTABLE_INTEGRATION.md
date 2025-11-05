# Airtable Integration Guide

This project uses **Airtable API** to fetch data.

## 🚀 Quick Setup

### 1. Get Your Airtable API Key

1. Go to https://airtable.com/create/tokens
2. Create a new token with `data.records:read` scope
3. Select your base
4. Copy the token

### 2. Add API Key to `.env`

Create a `.env` file in the project root:

```env
VITE_AIRTABLE_API_KEY=your_api_key_here
```

### 3. Get Your Table ID

1. Open your Airtable base
2. Click on a table
3. The URL will look like: `https://airtable.com/appXXXXXXXXXXXX/tblYYYYYYYYYYYY/...`
   - `appXXXXXXXXXXXX` = Base ID (already configured)
   - `tblYYYYYYYYYYYY` = Table ID (you need this)

### 4. Add Table ID

Edit `src/services/airtable.service.ts`:

```typescript
export const AIRTABLE_ENDPOINTS = {
  aboutUs: "tblWIqcxLfO7p3Vgs",
  services: "tblYOUR_TABLE_ID",
};
```

### 5. Use in Component

```tsx
import { useAirtable } from "../../hooks/useAirtable";
import { AIRTABLE_ENDPOINTS } from "../../services/airtable.service";

interface MyData {
  id: string;
  title: string;
  description: string;
}

const MyComponent: React.FC = () => {
  const { data, loading, error } = useAirtable<MyData>(
    AIRTABLE_ENDPOINTS.aboutUs
  );

  const fallbackData = [
    { id: "1", title: "Title", description: "Description" },
  ];
  const items = data && data.length > 0 ? data : fallbackData;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};
```

## 🔒 Security Note

- **Never commit** your `.env` file
- The `.env` file is already in `.gitignore`
- Use environment variables for production deployments

## 📚 Files

- `src/hooks/useAirtable.ts` - React hook
- `src/services/airtable.service.ts` - Service functions
- `src/pages/AboutUs/AboutUs.tsx` - Working example
