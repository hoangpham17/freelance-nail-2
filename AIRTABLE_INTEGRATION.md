# Airtable Integration Guide

This project uses **Airtable.js official library** to fetch data from Airtable.

## 🚀 Quick Setup

### 1. Get Your Airtable API Key

1. Go to https://airtable.com/create/tokens
2. Click "Create new token"
3. Give it a name (e.g., "Madison Nail Lounge")
4. Add these scopes:
   - `data.records:read`
5. Add access to your base: `appj9Es9rfmtwnDZn`
6. Click "Create token"
7. **Copy the token** (you won't see it again!)

### 2. Create `.env` File

Create a `.env` file in the project root:

```env
VITE_AIRTABLE_API_KEY=your_api_key_here
```

> **Important**: Never commit your `.env` file. It's already in `.gitignore`.

### 3. Get Your Table ID

1. Open your Airtable base: https://airtable.com/appj9Es9rfmtwnDZn
2. Click on a table
3. The URL will look like: `https://airtable.com/appXXXXXXXXXXXX/tblYYYYYYYYYYYY/...`
   - `appXXXXXXXXXXXX` = Base ID (already configured)
   - `tblYYYYYYYYYYYY` = Table ID (you need this)

### 4. Add Table ID to Configuration

Edit `src/services/airtable.service.ts`:

```typescript
export const AIRTABLE_ENDPOINTS = {
  aboutUs: "tblWIqcxLfO7p3Vgs", // Your About Us table ID
  services: "tblXXXXXXXXXXXXX", // Your Services table ID
  gallery: "tblXXXXXXXXXXXXX", // Your Gallery table ID
};
```

### 5. Use in Component

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

## ✨ Advantages of Official Airtable.js

- **Official Library**: Maintained by Airtable
- **Type Safe**: Full TypeScript support
- **Reliable**: Direct API access, no CORS proxy needed
- **Feature Rich**: Access to all Airtable API features
- **Filtering & Sorting**: Advanced query capabilities
- **Automatic Pagination**: Handles large datasets automatically

## 📊 Data Format

The Airtable API returns records in this format:

```javascript
{
  id: "recXXXXXXXXXXXXXX",
  fields: {
    title: "Our Team",
    description: "Experienced technicians",
    icon: "icon-1.svg"
  }
}
```

Our service transforms it to:

```javascript
{
  id: "recXXXXXXXXXXXXXX",
  title: "Our Team",
  description: "Experienced technicians",
  icon: "icon-1.svg"
}
```

## 🔒 Security

- **Never commit** your `.env` file
- The `.env` file is already in `.gitignore`
- Use environment variables for production deployments
- API keys should have minimal required scopes

## 🔧 Advanced Usage

### Filter Records

```typescript
export const fetchAirtableData = async <T = Record<string, unknown>>(
  tableId: string,
  filterFormula?: string
): Promise<T[]> => {
  const query = filterFormula
    ? base(tableId).select({ filterByFormula: filterFormula })
    : base(tableId).select();

  const records = await query.all();

  return records.map((record) => ({
    id: record.id,
    ...record.fields,
  })) as T[];
};

// Usage
const activeServices = await fetchAirtableData(
  AIRTABLE_ENDPOINTS.services,
  "{Status} = 'Active'"
);
```

### Sort Records

```typescript
const records = await base(tableId)
  .select({
    sort: [{ field: "Name", direction: "asc" }],
  })
  .all();
```

### Limit Results

```typescript
const records = await base(tableId)
  .select({
    maxRecords: 10,
  })
  .all();
```

## 📚 Files

- `src/hooks/useAirtable.ts` - React hook for data fetching
- `src/services/airtable.service.ts` - Service functions with Airtable.js
- `src/pages/AboutUs/AboutUs.tsx` - Working example

## 🐛 Troubleshooting

### "Invalid API Key" Error

1. Check that your API key is correct in `.env`
2. Make sure the key has `data.records:read` scope
3. Verify the key has access to base `appj9Es9rfmtwnDZn`
4. Restart the dev server after changing `.env`

### "Table not found" Error

1. Check the table ID is correct
2. Open Airtable and verify the table exists
3. Make sure the API key has access to the table

### Empty Data

1. Check that the table has records
2. Verify column names match your TypeScript interface
3. Check browser console for errors

### CORS Errors

The official Airtable.js library handles CORS automatically. If you still see CORS errors:

1. Make sure you're using the official `airtable` npm package
2. Check that the API key is valid
3. Try clearing browser cache

## 💡 Pro Tips

1. **Use TypeScript Interfaces**: Define interfaces for your data structure for better type safety

2. **Add Fallback Data**: Always provide fallback data for better UX

3. **Handle Loading States**: Show loading indicators while fetching

4. **Cache Data**: Consider caching data in React state or using a library like React Query

5. **Environment-Specific Keys**: Use different API keys for development and production

## 🌐 Production Deployment

When deploying to production:

1. **Vercel/Netlify**: Add environment variable in dashboard

   - Key: `VITE_AIRTABLE_API_KEY`
   - Value: Your production API key

2. **GitHub Actions**: Add as repository secret

3. **Docker**: Use `.env` file or environment variables

Remember: Environment variables starting with `VITE_` are exposed to the client-side code.
