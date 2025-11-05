# How to Set Up Airtable API

## Problem Solved

The CSV export approach had **CORS errors**. Now using official **Airtable API** ✅

## Step-by-Step Setup

### 1. Create API Token

1. Visit: https://airtable.com/create/tokens
2. Click **"Create new token"**
3. Name it: `Nail Salon App`
4. Add these scopes:
   - ✅ `data.records:read`
5. Add access to your base:
   - ✅ Select `appj9Es9rfmtwnDZn`
6. Click **"Create token"**
7. Copy the token (starts with `pat...`)

### 2. Create `.env` File

In project root, create `.env`:

```env
VITE_AIRTABLE_API_KEY=patXXXXXXXXXXXXXXXX
```

Replace `patXXXXXXXXXXXXXXXX` with your actual token.

### 3. Find Your Table IDs

1. Open Airtable in browser
2. Click on the table (e.g., "AboutUs")
3. Look at the URL:
   ```
   https://airtable.com/appj9Es9rfmtwnDZn/tblWIqcxLfO7p3Vgs/...
                        ^^^^^^^^^^^^^^^^^^  ^^^^^^^^^^^^^^^^^^
                        Base ID             Table ID
   ```
4. Copy the **Table ID** (starts with `tbl...`)

### 4. Add Table IDs to Config

Edit `src/services/airtable.service.ts`:

```typescript
export const AIRTABLE_ENDPOINTS = {
  aboutUs: "tblWIqcxLfO7p3Vgs", // ✅ Already configured
  services: "tblYOUR_TABLE_ID", // 👈 Add your Services table ID
  gallery: "tblYOUR_TABLE_ID", // 👈 Add your Gallery table ID
};
```

### 5. Test It!

```bash
npm run dev
```

Visit http://localhost:5173 and check the About Us page.

## What Changed?

### Before (CSV - Had CORS errors ❌)

```typescript
aboutUs: "https://airtable.com/appXXX/shrXXX?format=csv";
```

### After (API - Works! ✅)

```typescript
aboutUs: "tblWIqcxLfO7p3Vgs";
```

## Security Notes

- ✅ `.env` is in `.gitignore` (won't be committed)
- ✅ API key is only in your local environment
- ✅ For production, use environment variables in your host

## Troubleshooting

### Error: "Airtable API error: Unauthorized"

- Check your API token is correct in `.env`
- Verify the token has `data.records:read` scope
- Make sure the token has access to your base

### Error: "Airtable API error: Not Found"

- Check your Table ID is correct
- Verify the table exists in your base

### Still seeing CORS errors?

- Make sure you restarted the dev server after creating `.env`
- Clear browser cache
- Check console for the actual error message

## Need Help?

Check `AIRTABLE_INTEGRATION.md` for full documentation.
